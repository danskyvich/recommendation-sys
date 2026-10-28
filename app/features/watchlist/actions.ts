"use server"

import { auth0 } from '@/app/lib/auth/auth0'
import { sql } from '@/app/lib/db'

const retrieveUserId = async (): Promise<string | null> => {
    const session = await auth0.getSession();
    return session?.user?.sub ?? null;
}

export const addMovieToWatchlist = async (movie_id: string) => {
    const user_id = await retrieveUserId();
    if (!user_id) {
        return { error: "You must be logged in to add movies", success: false };
    }

    try {
        await sql `
            INSERT INTO watchlist (user_id, movie_id)
            VALUES (${user_id}, ${movie_id})
            ON CONFLICT (user_id, movie_id) DO NOTHING
        `
        return { success: true };
    } catch (err) {
        console.error("addMovieToWatchlist failed: ", err);
        return { error: "Failed adding movie to watchlist.", success: false };
    }
}

export const deleteMovieFromWatchlist = async (movie_id: string) => {
    const user_id = await retrieveUserId();
    if (!user_id) {
        return { error: "User not authenticate", success: false }
    }

    try {
        await sql `
            DELETE FROM watchlist 
            WHERE user_id = ${user_id} AND movie_id = ${movie_id}
        `
        return { success: true}
    } catch (err) {
        console.error("Movie removal failed: ", err);
        return { error: "Failed removing your movie from the watchlist", success: false}
    }
}