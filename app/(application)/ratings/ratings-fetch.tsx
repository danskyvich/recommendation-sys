import { countTotalRatedMovies, fetchAllTotalRatedMovies } from "@/app/features/ratings/actions";
import RatingsPage from "@/app/features/ratings/ratings-page";
import { getUser } from "@/app/lib/auth/get-user";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export default async function RatingsFetch({ searchParams}: {searchParams: Promise<{page?: string}>}) {
    await connection();

    const { user } = await getUser();
    if (!user) redirect("/auth/login");

    const { page: pageParam } = await searchParams;
    const page = Math.max(1, Math.floor(Number(pageParam)) || 1);

    // fetch data
    const [ratingsMovies, totalRatedMovieCount] = await Promise.all([
        fetchAllTotalRatedMovies(page),
        countTotalRatedMovies(),
    ]);

    return (
      <RatingsPage count={totalRatedMovieCount.count} movies={ratingsMovies.response ?? []}/>
    );
}