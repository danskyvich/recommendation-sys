"use server"

import { getUser } from "@/app/lib/auth/get-user";
import { sql } from "@/app/lib/db";

export async function retrieveGenres() {
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
    });

    if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`);
    const data = await res.json();
    return data.genres;
}

// READ the user's hide movies preferences
export const filterMovies = async () => {
    const user = (await getUser())?.user;
    const user_id = user?.sub;

    if (!user_id) return false;

    try {
        const response = await sql `
            SELECT hide_movies
            FROM user_preferences
            WHERE user_id = ${user_id}
        `
        return response[0]?.hide_movies ?? [];
    } catch (err) {
        console.error(err);
        return false;
    }
}