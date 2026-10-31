"use server"

import { auth0 } from '@/app/lib/auth/auth0'
import { sql } from '@/app/lib/db'
import { MovieItem } from '@/types';
import { revalidatePath } from 'next/cache';
import { addPosterUrlToBatch } from '../dashboard/queries';

const retrieveUserId = async (): Promise<string | null> => {
    const session = await auth0.getSession();
    return session?.user?.sub ?? null;
}

// INSERT movie to watchlist
export const addMovieToWatchlist = async (movie_id: string) => {
    const user_id = await retrieveUserId();
    if (!user_id) {
        return { error: "User not authenticated", success: false };
    }

    const safeId = Number(movie_id);
    if (!Number.isSafeInteger(safeId) || safeId <= 0) return { success: false, error: "Invalid movie"}

    try {
        await sql `
            INSERT INTO watchlist (user_id, movie_id)
            VALUES (${user_id}, ${safeId})
            ON CONFLICT (user_id, movie_id) DO NOTHING
        `
        revalidatePath(`/dashboard/${safeId}`);
        return { success: true };
    } catch (err) {
        console.error("addMovieToWatchlist failed: ", err);
        return { error: "Failed adding movie to watchlist.", success: false };
    }
}

// DELETE movie to watchlist
export const deleteMovieFromWatchlist = async (movie_id: string) => {
    const user_id = await retrieveUserId();
    if (!user_id) {
        return { error: "User not authenticated", success: false }
    }
    
    const safeId = Number(movie_id);
    if (!Number.isSafeInteger(safeId) || safeId <= 0) return { success: false, error: "Invalid movie"}

    try {
        await sql `
            DELETE FROM watchlist 
            WHERE user_id = ${user_id} AND movie_id = ${safeId}
        `;
        revalidatePath(`/dashboard/${safeId}`);
        return { success: true}
    } catch (err) {
        console.error("Movie removal failed: ", err);
        return { error: "Failed removing your movie from the watchlist", success: false}
    }
}

// FETCH count
export const getTotalNumberOfWatchlistMovies = async () => {
    const user_id = await retrieveUserId();
    if (!user_id) return 0;
    const [{count}] = await sql `
        SELECT COUNT(*)::int AS count FROM watchlist
        WHERE user_id = ${user_id}
    `;
    return count;
}
// FETCH all watchlist movies + count
export const fetchAllWatchlistMovies = async (page: number): Promise<{success: false, response: [], error: string} | {success: true, response: MovieItem[], error: null}> => {
    const user_id = await retrieveUserId();
    if (!user_id) return { success: false, response: [], error: "Unauthenticated user"};

    const safePage = Number.isInteger(page) && page > 0 ? page : 1;
    try {
        const response = (await sql `
            SELECT 
                movies.id,
                movies.title,
                movies.poster_path,
                movies.release_date,
                movies.vote_average,
                movies.vote_count,
                movies.popularity,
                movies.overview,
                movies.language AS original_language,
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
            ORDER BY watchlist.created_at DESC, movies.id
            LIMIT 6 OFFSET ${(safePage - 1) * 6}
        `) as MovieItem[];

        return { success: true, response: addPosterUrlToBatch({ movies: response, size: "w500"}), error: null };
    } catch (err) {
        console.error("fetchAllWatchlistMovies failed: ", err);
        return { success: false, error: "Failed fetching watchlist movies.", response: []}
    }
}