"use server"

import { getUser } from "@/app/lib/auth/get-user";
import { sql } from "@/app/lib/db";
import { ManagementClient } from "auth0";
import { redirect } from "next/navigation";

const management = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN!.replace(/^https?:\/\//, ""),
    clientId: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
});

export async function deleteAccount() {
    const { user } = await getUser();
    if (!user) return { success: false, error: "Not authenticated" };

    const userId = user.sub;

    await management.users.delete(userId);

    try {
        await sql `DELETE FROM ratings WHERE user_id = ${userId} `
        await sql `DELETE FROM watchlist WHERE user_id = ${userId}`;
        await sql `DELETE FROM users WHERE user_id = ${userId}`;
    } catch (err) {
        console.error("deleteAccount failed: ", err);
        return { success: false, error: "Could not delete account."}
    }

    redirect("/auth/logout");
} 

export async function clearRatingsAndWatchlist() {
    const user = (await getUser())?.user;
    const user_id = user?.sub;

    if (!user_id) return { success: false, error: "Unauthenticated user."};

    try {
        await sql.transaction([
            sql `DELETE FROM ratings
            WHERE user_id = ${user_id}`,
            sql `DELETE FROM watchlist
            WHERE user_id = ${user_id}         `
        ]);
        return { success: true, error: null }
    } catch (err) {
        console.error(err);
        return { success: false, error: "clearRatingsAndWatchlist failed"}
    }
}
export async function redoOnboarding() {
    return {}
}

// Hide and show rated and watchlist movies
export async function hideAndShowMovies(show: boolean): Promise<{ success: true, error: null} | {success: false, error: string}> {
    const user = (await getUser())?.user;
    const user_id = user?.sub;

    if (!user_id) return { success: false, error: "Unauthenticated user." };

    try {
        await sql `
            INSERT INTO user_preferences (user_id, hide_movies)
            VALUES (${user_id}, ${show})
            ON CONFLICT (user_id)
            DO UPDATE SET hide_movies = NOT user_preferences.hide_movies
        `;
        return { success: true, error: null }
    } catch (err) {
        console.error(err);
        return { success: false, error: "hideAndShowMovies failed"}
    }
}