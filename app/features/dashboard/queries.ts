import { sql } from "@/app/lib/db"
import { AggregatedGenres, Movie, MovieItem } from "@/types";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import "server-only";

// not exposed to public

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export const addPosterUrlForASingleMovie = (movie: MovieItem): MovieItem => {
    return {
        ...movie,
        release_date: movie.release_date ? new Date(movie.release_date).toISOString().slice(0, 10) : "",
        poster_path: `${IMG_BASE}${movie.poster_path}`,
    }
}

export const addPosterUrlToBatch = (movies: MovieItem[]): MovieItem[] => 
    movies.map((movie) => addPosterUrlForASingleMovie(movie))

export const fetchTopRatedMovies = async () => {
    'use cache'
    cacheLife('hours');
    cacheTag('topRated');
    const response = await sql `
        SELECT 
            movies.*,
            COALESCE(
            JSON_AGG(genres.title) FILTER (WHERE genres.id IS NOT NULL),
            '[]'
            ) AS genres
        FROM movies
        LEFT JOIN movie_genre_join ON movie_genre_join.movie_id = movies.id
        LEFT JOIN genres ON genres.id = movie_genre_join.genre_id
        WHERE movies.vote_count >= 15000 
        GROUP BY movies.id
        ORDER BY movies.vote_average DESC 
        LIMIT 20
    `;
    if (response.length === 0) throw new Error("Empty records");
    return addPosterUrlToBatch(response as MovieItem[]);
}

export const fetchTrendingMovies = async () => {
    'use cache'
    cacheLife('hours');
    cacheTag('trending');
    const response = await sql `SELECT * FROM movies WHERE popularity >= 225 ORDER BY popularity DESC LIMIT 10`;
    if (!response) throw new Error("Empty records");
    return addPosterUrlToBatch(response as MovieItem[]);
}

export const queryGenres = async (movie_id: number): Promise<string[]> => {
    'use cache'
    cacheLife('weeks');
    cacheTag('genres');
    const response = await sql `SELECT genres.id, genres.title FROM genres JOIN movie_genre_join ON movie_genre_join.genre_id = genres.id WHERE movie_genre_join.movie_id = ${movie_id} `;

    const data: string[] = response.map((row) => row.title as string);
    return data;
}

export const fetchMoviesPerGenre = async () => {
    'use cache'
    cacheLife("days");
    cacheTag("genreMovies");
    const response = (await sql `
        SELECT * FROM (
            SELECT
                genres.id AS genres_id,
                genres.title AS genres_title,
                movies.*,
                ROW_NUMBER() OVER (PARTITION by genres.id ORDER BY movies.vote_average DESC NULLS LAST) AS rn
            FROM movies
            JOIN movie_genre_join ON movie_genre_join.movie_id = movies.id
            JOIN genres ON genres.id = movie_genre_join.genre_id
        ) t
        WHERE rn <= 20
        ORDER BY genres_title, rn
        `) as AggregatedGenres[];

    const rows = response.map((row) => ({
        ...row,
        poster_path: row.poster_path ? `${IMG_BASE}${row.poster_path}` : "",
        release_date: row.release_date ? new Date(row.release_date).toISOString().slice(0,10) : "",
    }));

    const aggregateByGenre = rows.reduce<Record<string, typeof rows>>((acc, row) => {
        (acc[row.genres_title] ??= []).push(row);
        return acc;
    }, {});

    return aggregateByGenre;
}

export const getMovie = cache(async(movie_id: number): Promise<MovieItem | null>  => {
    try {
        const [movie] = (await sql `
            SELECT 
            movies.*, 
            COALESCE (
                JSON_AGG(genres.title) FILTER (WHERE genres.id IS NOT NULL),
                '[]'
            ) AS genres
            FROM movies
            LEFT JOIN movie_genre_join ON movie_genre_join.movie_id = movies.id
            LEFT JOIN genres ON genres.id = movie_genre_join.genre_id
            WHERE movies.id = ${movie_id}
            GROUP BY movies.id
        `) as MovieItem[];

        if (!movie) return null;
        return addPosterUrlForASingleMovie(movie);
    } catch (err) {
        console.error("getMovie failed: ", err);
        return null;
    }
});