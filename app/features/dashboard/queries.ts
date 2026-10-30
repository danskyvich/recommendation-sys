import { sql } from "@/app/lib/db"
import { AggregatedGenres, MovieFull, MovieItem, TMDBImageSizes } from "@/types";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import "server-only";

// not exposed to public

//IMAGE helper functions
const tmdbImageUrl = ({path, size}: {path: string | null, size: TMDBImageSizes }): string | null => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

export const addPosterUrlForASingleMovie = <T extends {poster_path: string | null; release_date: string | null}>({movie, size = "w500"}: {movie: T, size?: TMDBImageSizes}): T => {
    return {
        ...movie,
        release_date: movie.release_date ? new Date(movie.release_date).toISOString().slice(0, 10) : "",
        poster_path: tmdbImageUrl({ path: movie.poster_path, size }),
    }
}

export const addPosterUrlToBatch = <T extends {poster_path: string | null, release_date: string | null}>({movies, size = "w500"}: {movies: T[], size: TMDBImageSizes}): T[] => 
    movies.map((movie) => addPosterUrlForASingleMovie({movie, size}))

// FETCH movies (trending, toprated, genres)
export const fetchTopRatedMovies = async (): Promise<MovieItem[]> => {
    'use cache'
    cacheLife('hours');
    cacheTag('topRated');
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
            ) AS genres
        FROM movies
        LEFT JOIN movie_genre_join ON movie_genre_join.movie_id = movies.id
        LEFT JOIN genres ON genres.id = movie_genre_join.genre_id
        WHERE movies.vote_count >= 15000 
        GROUP BY movies.id
        ORDER BY movies.vote_average DESC 
        LIMIT 20
    `) as MovieItem[];

    if (response.length === 0) throw new Error("Empty records");
    return addPosterUrlToBatch({movies: response, size: "w500"});
}

export const fetchTrendingMovies = async (): Promise<MovieItem[]> => {
    'use cache'
    cacheLife('hours');
    cacheTag('trending');
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
        ) AS genres
        FROM movies 
        LEFT JOIN movie_genre_join ON movie_genre_join.movie_id = movies.id
        LEFT JOIN genres ON genres.id = movie_genre_join.genre_id
        WHERE movies.popularity  >= 225 
        GROUP BY movies.id
        ORDER BY movies.popularity 
        DESC 
        LIMIT 10
        `) as MovieItem[];

    if (response.length === 0) throw new Error("Empty records");
    return addPosterUrlToBatch({ movies: response, size: "w500"});
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
                movies.id,
                movies.title,
                movies.poster_path,
                movies.release_date,
                movies.vote_average,
                movies.vote_count,
                movies.popularity,
                movies.overview,
                movies.language AS original_language,
                ROW_NUMBER() OVER (PARTITION by genres.id ORDER BY movies.vote_average DESC NULLS LAST) AS rn
            FROM movies
            JOIN movie_genre_join ON movie_genre_join.movie_id = movies.id
            JOIN genres ON genres.id = movie_genre_join.genre_id
        ) t
        WHERE rn <= 20
        ORDER BY genres_title, rn
        `) as AggregatedGenres[];

    const rows = addPosterUrlToBatch({movies: response, size: "w500"})

    const aggregateByGenre = rows.reduce<Record<string, typeof rows>>((acc, row) => {
        (acc[row.genres_title] ??= []).push(row);
        return acc;
    }, {});

    return aggregateByGenre;
}

export const getMovie = cache(async(movie_id: number): Promise<MovieFull | null>  => {
    try {
        const [movie] = (await sql `
            SELECT 
            movies.*,
            movies.language AS original_language,
            COALESCE (
                JSON_AGG(genres.title) FILTER (WHERE genres.id IS NOT NULL),
                '[]'
            ) AS genres,
            COALESCE (
                (SELECT JSON_AGG(JSON_BUILD_OBJECT('id', production_companies.id, 'name', production_companies.name, 'logo_path', production_companies.logo_path, 'origin_country', production_companies.origin_country)) 
                FROM movie_production_companies
                JOIN production_companies ON production_companies.id = movie_production_companies.company_id
                WHERE movie_production_companies.movie_id = movies.id),
                '[]'
            ) AS production_companies,
            COALESCE (
                (SELECT (JSON_AGG(country_code)) 
                FROM movie_production_countries
                WHERE movie_production_countries.movie_id = movies.id),
                '[]'
            ) as production_countries
            FROM movies
            LEFT JOIN movie_genre_join ON movie_genre_join.movie_id = movies.id
            LEFT JOIN genres ON genres.id = movie_genre_join.genre_id
            WHERE movies.id = ${movie_id}
            GROUP BY movies.id
        `) as MovieFull[];

        if (!movie) return null;
        return {
            ...addPosterUrlForASingleMovie({movie, size: "w500"}),
            budget: Number(movie.budget),
            revenue: Number(movie.revenue),
            production_companies: (movie.production_companies ?? []).map((company) => ({
                ...company,
                logo_path: tmdbImageUrl({ path: company.logo_path, size: "w185"})
            })),
        }
    } catch (err) {
        console.error("getMovie failed: ", err);
        return null;
    }
});