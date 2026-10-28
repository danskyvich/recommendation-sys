import MovieModal from "@/app/components/layout/movie-modal";
import { getMovie } from "@/app/features/dashboard/queries";
import { getUser } from "@/app/lib/auth/get-user";
import { sql } from "@/app/lib/db";
import { notFound } from "next/navigation";

export default async function ModalFetch({params}: {params: Promise<{id: string}>}) {
        const { id } = await params; 
        console.log("modal page", id);
    
        // extract the id 
        const match = id.match(/\d+$/);
        const cleanedId = match ? Number(match[0]) : NaN;

        // check if the id is a number
        const isAnInteger = Number.isInteger(cleanedId);
        if (!isAnInteger || cleanedId < 1) notFound();
    
        // fetch the movie and user info
        const [movie, sub] = await Promise.all([getMovie(cleanedId), getUser()]);
        if (!movie) notFound();
        const user_id = sub?.user?.id;
    
        // check if the movie is in the watchlist
        let inWatchlist = false;
        if (user_id) {
          const [row] = await sql `
                SELECT 1 FROM watchlist
                WHERE user_id = ${user_id} AND movie_id = ${cleanedId}
            `;
          inWatchlist = !!row;
        }
        
        return (
          <MovieModal
            movie={movie}
            inWatchlist={inWatchlist}
            action={user_id ? "logged-in" : "logged-out"}
          />
        );
}