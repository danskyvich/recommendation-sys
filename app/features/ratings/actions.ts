"use server"

import { getUser } from "@/app/lib/auth/get-user"
import { sql } from "@/app/lib/db";
import { isValidRating } from "@/app/utils/validateRatingInput";
import { MovieItem, Rating } from "@/types";
import { revalidatePath } from "next/cache";
import { addPosterUrlToBatch } from "../dashboard/queries";

// INSERT rating
export const addRating = async (rating: Rating, movie_id: string): Promise<{success: true, error: null } | {success: false, error: string}> => {
    // validate rating input
    if (!isValidRating(rating)) return { success: false, error: "Invalid rating input."};

    const cleanedId = Number(movie_id);
    if (!Number.isSafeInteger(cleanedId) || cleanedId <= 0) return { success: false, error: "Invalid movie."};

    // check if user exist
    const user = (await getUser())?.user;
    if (!user) return { success: false, error: "Unauthenticated user."}

    const user_id = user.sub;

    // insert into RATINGS
    try {
        await sql `
            INSERT INTO ratings (user_id, movie_id, rating)
            VALUES (${user_id}, ${cleanedId}, ${rating})
            ON CONFLICT (user_id, movie_id)
            DO UPDATE SET
                rating = EXCLUDED.rating,
                updated_at = now()
        `;
        revalidatePath(`/dashboard/${cleanedId}`);
        return {
        success: true,
        error: null,
    }
    } catch (err) {
        console.error(`addRating failed`, err);
        return { success: false, error: "Error: failed inserting rated movie."};
    }
}

// DELETE rating
export const deleteRating = async (movie_id: string): Promise<{ success: false, error: string } | {success: true, error: null }> => {
    const cleanedId = Number(movie_id);
    if (!Number.isSafeInteger(cleanedId) || cleanedId <= 0) return { success: false, error: "Invalid movie."}
    
    const user = (await getUser())?.user;
    if (!user) return { success: false, error: "Unauthenticated user."}

    const user_id = user.sub;

    try {
        await sql `
            DELETE FROM ratings
            WHERE user_id = ${user_id} AND movie_id = ${cleanedId}
        `;
        revalidatePath(`/dashboard/${cleanedId}`);
        return { success: true, error: null }
    } catch (err) {
        console.error(`deleteRating failed`, err);
        return { success: false, error: "Deleting rated movie failed."}
    }
} 

// FETCH total ratings
export const countTotalRatedMovies = async () => {
    const user = (await getUser())?.user;

    const user_id = user?.sub;
    if (!user_id) return { success: false, error: "Unauthenticated user."}

    try {
        const [response] = await sql `
            SELECT COUNT(*)::int AS count
            FROM ratings
            WHERE user_id = ${user_id}  
        `;
        return { success: true, count: response.count, error: null};
    
    } catch (err) {
        console.error(err);
        return { success: false, error: "fetchTotalRatedMovies failed."}
    }
}

// FETCH all movies from ratings
export const fetchAllTotalRatedMovies = async (page: number) => {
    const user = (await getUser())?.user;

    const user_id = user?.sub;
    if (!user_id) return { success: false, response: [], error: "Unauthenticated user."}

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
                ratings.rating AS user_rating,
                COALESCE(
                    JSON_AGG(genres.title) FILTER (WHERE genres.id IS NOT NULL),
                    '[]'::json
                ) AS genres
                 FROM ratings
                 JOIN movies ON movies.id = ratings.movie_id
                 LEFT JOIN movie_genre_join ON movie_genre_join.movie_id = movies.id
                 LEFT JOIN genres ON genres.id = movie_genre_join.genre_id
                 WHERE ratings.user_id = ${user_id}
                 GROUP BY movies.id, ratings.created_at, ratings.rating
                 ORDER BY ratings.created_at DESC, movies.id
                 LIMIT 6 OFFSET ${(safePage - 1) * 6}
        `) as MovieItem[];

        return { success: true, response: addPosterUrlToBatch({ movies: response, size: "w500"}), error: null };
    } catch (err) {
        console.error("fetchAllTotalRatedMovies failed: ", err);
        return { success: false, error: "Failed fetching rated movies.", response: []}
    }
}