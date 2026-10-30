import MoviePage from "@/app/features/dashboard/movie/movie-page";
import { getMovie } from "@/app/features/dashboard/queries";
import { getUser } from "@/app/lib/auth/get-user";
import { sql } from "@/app/lib/db";
import { SearchParams } from "next/dist/server/request/search-params";
import { notFound } from "next/navigation";


export default async function MovieMain({params}: {params: SearchParams}) {

     const { id } = await params; // retrieve params from URL

     //validate
     const movie_id = Number(id);
     if (!Number.isInteger(movie_id) || movie_id <= 0) notFound();

     // parallel fetch for movie and user
     const [movie, auth] = await Promise.all([
        getMovie(movie_id),
        getUser(),
     ])
     if (!movie) notFound();

     const user_id = auth.user?.sub;

     let inWatchlist = false;
     if (!inWatchlist) {
        const result = await sql `
            SELECT 1 FROM watchlist
            WHERE user_id = ${user_id} AND movie_id = ${movie_id}
        `
        inWatchlist = !!result;
     }

    return <MoviePage movie={movie} inWatchlist={inWatchlist} user={auth.user}/>
}