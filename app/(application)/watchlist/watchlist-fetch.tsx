import { fetchAllWatchlistMovies, getTotalNumberOfWatchlistMovies } from "@/app/features/watchlist/actions";
import WatchListPage from "@/app/features/watchlist/watchlist-page";
import { getUser } from "@/app/lib/auth/get-user";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export default async function WatchlistFetch({ searchParams}: {searchParams: Promise<{page?: string}>}) {
     await connection();

     const { user } = await getUser();
     if (!user) redirect("/auth/login");
    
    const { page: pageParam} = await searchParams;
    const page = Math.max(1, Math.floor(Number(pageParam)) || 1);

    const [totalMovieCount, result] = await Promise.all([
      getTotalNumberOfWatchlistMovies(user.sub),
      fetchAllWatchlistMovies(user.sub, page),
    ]);

    if (!result.success) return <p role="alert">{result.error}</p>;

    return (
      <WatchListPage
        count={totalMovieCount}
        page={page}
        watchlistMovies={result.response}
      />
    );
}