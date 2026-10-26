import { FEATURED, sql } from "@/app/lib/db"
import { AggregatedGenres, MovieItem } from "@/types";
import { cacheLife, cacheTag } from "next/cache";
import "server-only";

// not exposed to public

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const withPosterUrl = (rows: MovieItem[]): MovieItem[] => 
    rows.map((m) => ({
        ...m,
        poster_path: m.poster_path ? `${IMG_BASE}${m.poster_path}` : null,
        release_date: m.release_date ? new Date(m.release_date).toISOString().slice(0,10) : "",
        vote_average: Number(m.vote_average),
        vote_count: Number(m.vote_count),
    }));

export const fetchTopRatedMovies = async () => {
    'use cache'
    cacheLife('hours');
    cacheTag('topRated');
    const response = await sql `SELECT * FROM movies WHERE vote_count >= 15000 ORDER BY vote_average DESC LIMIT 20`;
    if (!response) throw new Error("Empty records");
    return withPosterUrl(response as MovieItem[]);
}

export const fetchTrendingMovies = async () => {
    'use cache'
    cacheLife('hours');
    cacheTag('trending');
    const response = await sql `SELECT * FROM movies WHERE popularity >= 225 ORDER BY popularity DESC LIMIT 10`;
    if (!response) throw new Error("Empty records");
    return withPosterUrl(response as MovieItem[]);
}

export const queryGenres = async (movie_id: number): Promise<string[]> => {
    'use cache'
    cacheLife('weeks');
    cacheTag('genres');
    const response = await sql `SELECT genres.title FROM genres JOIN movie_genre_join ON movie_genre_join.genre_id = genres.id WHERE movie_genre_join.movie_id = ${movie_id} `;

    const data: string[] = response.map((row) => row.title as string);
    return data;
}

/* GENRES: 
'Action',          'Adventure',
  'Animation',       'Comedy',
  'Crime',           'Documentary',
  'Drama',           'Family',
  'Fantasy',         'History',
  'Horror',          'Music',
  'Mystery',         'Romance',
  'Science Fiction', 'Thriller',
  'War'
*/
export const fetchMoviesPerGenre = async () => {
    'use cache'
    cacheLife('days');
    cacheTag('genreMovies');
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
        poster_path: row.poster_path ? `${IMG_BASE}${row.poster_path}` : null,
        release_date: row.release_date ? new Date(row.release_date).toISOString().slice(0,10) : null,
    }));

    const aggregateByGenre = rows.reduce<Record<string, typeof rows>>((acc, row) => {
        (acc[row.genres_title] ??= []).push(row);
        return acc;
    }, {});

    return aggregateByGenre;
}