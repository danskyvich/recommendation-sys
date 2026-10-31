import { getMovie } from "@/app/features/dashboard/queries";
import { notFound } from "next/navigation";
import { getUser } from "../auth/get-user";
import { sql } from "../db";
import { MovieItem } from "@/types";

export const getMovieWithWatchlistState = async<T> (movie_id: number, fetcher: (id: number) => Promise<T | null | undefined>): Promise<{ inWatchlist: boolean, user_id: string | undefined, movie: T }> => {

    // check if the id is a number
    const isAnInteger = Number.isInteger(movie_id);
    if (!isAnInteger || movie_id < 1) notFound();

    // fetch the movie and user info
    const [movie, auth] = await Promise.all([fetcher(movie_id), getUser()]);
    if (!movie) notFound();
    
    const user_id = auth.user?.sub;
    // check if the movie is in the watchlist

    let inWatchlist = false;
    if (user_id) {
        const [row] = await sql `
            SELECT 1 FROM watchlist
            WHERE user_id = ${user_id} AND movie_id = ${movie_id}
        `;
        inWatchlist = !!row;
    }
    
    return {
        user_id,
        inWatchlist,
        movie,
    }
}