import MovieModal from "@/app/components/layout/movie-modal";
import { getMovie } from "@/app/features/dashboard/queries";
import { getMovieWithRatingsState } from "@/app/lib/helpers/getMovieWithRatingsState";
import { getMovieWithWatchlistState } from "@/app/lib/helpers/getMovieWithWatchlistState";

export default async function ModalFetch({params}: {params: Promise<{id: string}>}) {
        const { id } = await params;

        const match = id.match(/\d+$/);
        const cleanedId = match ? Number(match[0]) : NaN;

        // watchlistHelper validates the id (calls notFound() on NaN), fetches the movie and user
        const { movie, user_id, inWatchlist } =
          await getMovieWithWatchlistState(cleanedId, getMovie);
        const { inRatings } = await getMovieWithRatingsState(
          cleanedId,
          user_id,
        );

        return (
          <MovieModal
            movie={movie}
            inWatchlist={inWatchlist}
            inRatings={inRatings}
            action={user_id ? "logged-in" : "logged-out"}
          />
        );
}