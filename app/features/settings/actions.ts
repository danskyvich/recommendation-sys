"use server"

import { getUser } from "@/app/lib/auth/get-user";
import { sql } from "@/app/lib/db";
import { ManagementClient } from "auth0";
import { cacheLife, cacheTag } from "next/cache";
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