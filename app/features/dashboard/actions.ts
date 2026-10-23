"use server"

import { MovieItem } from "@/types";
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL!);

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
    const response = await sql `SELECT * FROM movies WHERE vote_count >= 15000 ORDER BY vote_average DESC LIMIT 20`;
    if (!response) throw new Error("Empty records");
    return withPosterUrl(response as MovieItem[]);
}

export const fetchTrendingMovies = async () => {
    const response = await sql `SELECT * FROM movies WHERE popularity >= 225 ORDER BY popularity DESC LIMIT 10`;
    if (!response) throw new Error("Empty records");
    return withPosterUrl(response as MovieItem[]);
}