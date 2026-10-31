"use server"

import { getUser } from "@/app/lib/auth/get-user"
import { sql } from "@/app/lib/db";
import { Rating } from "@/types";
import { revalidatePath } from "next/cache";

// CHECK if the rating input is valid
export const isValidRating = async (rating: number) =>
    typeof rating === "number" && Number.isInteger(rating) && rating >= 1 && rating <= 10;

// INSERT rating
export const addRating = async (rating: Rating, movie_id: string): Promise<{success: true, error: null } | {success: false, error: string}> => {
    // validate rating input
    if (!Number.isSafeInteger(rating) || rating < 1 || rating > 10) return { success: false, error: "Invalid rating input."};

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
                updated_at = now(),
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