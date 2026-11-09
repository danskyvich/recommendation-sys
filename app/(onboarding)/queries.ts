"use cache"

import { cacheLife, cacheTag } from "next/cache";
import { sql } from "../lib/db";
import { Genre } from "@/types";

export const getGenresFromDatabase = async () => {
    cacheLife("weeks");
    cacheTag("genres");

    try {
        const response = await sql `
            SELECT genres.id, genres.title FROM genres
            JOIN movie_genre_join ON movie_genre_join.genre_id = genres.id
            JOIN movies ON movies.id = movie_genre_join.movie_id
            GROUP BY genres.id, genres.title
            ORDER BY SUM(movies.popularity) DESC
        `;
        return response as Genre[];
    } catch (err) {
        console.error(err);
        return;
    }
}