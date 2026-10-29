"use server"

import { auth0 } from '@/app/lib/auth/auth0'
import { sql } from '@/app/lib/db'
import { MovieItem } from '@/types';
import { cacheLife, cacheTag, revalidatePath } from 'next/cache';
import { addPosterUrlToBatch } from '../dashboard/queries';

const retrieveUserId = async (): Promise<string | null> => {
    const session = await auth0.getSession();
    return session?.user?.sub ?? null;
}

export const addMovieToWatchlist = async (movie_id: string) => {
    // remove stored cache and fetch new data next time
    revalidatePath(`/dashboard/${movie_id}`);
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
    // remove stored cache and fetch new data next time
    revalidatePath(`/dashboard/${movie_id}`);
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

export const getTotalNumberOfWatchlistMovies = async (user_id: string) => {
    const [{count}] = await sql `
        SELECT COUNT(*) FROM watchlist
        WHERE user_id = ${user_id}
    `;

    return count;
}

export const fetchAllWatchlistMovies = async (user_id: string, page: number): Promise<{success: false, response: [], error: string} | {success: true, response: MovieItem[], error: null}> => {
    try {
        const response = (await sql `
            SELECT 
                movies.*,
                COALESCE(
                    JSON_AGG(genres.title) FILTER (WHERE genres.id IS NOT NULL),
                    '[]'
                ) as genres
            FROM watchlist
            JOIN movies ON movies.id = watchlist.movie_id
            LEFT JOIN movie_genre_join ON movie_genre_join.movie_id = movies.id
            LEFT JOIN genres ON genres.id = movie_genre_join.genre_id
            WHERE watchlist.user_id = ${user_id}
            GROUP BY movies.id, watchlist.created_at
            ORDER BY watchlist.created_at DESC
            LIMIT 6 OFFSET ${(page - 1) * 6}
        `) as MovieItem[];

        return { success: true, response: addPosterUrlToBatch(response), error: null };
    } catch (err) {
        console.error("fetchAllWatchlistMovies failed: ", err);
        return { success: false, error: "Failed fetching watchlist movies.", response: []}
    }
}