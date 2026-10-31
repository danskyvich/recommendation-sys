import MoviePage from "@/app/features/dashboard/movie/movie-page";
import { getMovie } from "@/app/features/dashboard/queries";
import { getMovieWithRatingsState } from "@/app/lib/helpers/getMovieWithRatingsState";
import { getMovieWithWatchlistState } from "@/app/lib/helpers/getMovieWithWatchlistState";
import { notFound } from "next/navigation";


export default async function MovieMain({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // retrieve params from URL

  const match = id.match(/\d+$/);
  const cleanedId = match ? Number(match[0]) : NaN;

  //validate
  const movie_id = Number(id);
  if (!Number.isInteger(movie_id) || movie_id <= 0) notFound();

  // watchlistHelper validates the id (calls notFound() on NaN), fetches the movie and user
  const { movie, user_id, inWatchlist } =
    await getMovieWithWatchlistState(cleanedId, getMovie);
  const { inRatings } = await getMovieWithRatingsState(cleanedId, user_id);

  return (
    <MoviePage
      movie={movie}
      inWatchlist={inWatchlist}
      user={user_id}
      inRatings={inRatings}
    />
  );
}