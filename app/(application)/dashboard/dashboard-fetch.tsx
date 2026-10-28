import DashboardPage from "@/app/features/dashboard/dashboard-page";
import { fetchMoviesPerGenre, fetchTopRatedMovies, fetchTrendingMovies } from "@/app/features/dashboard/queries";
import { auth0 } from "@/app/lib/auth/auth0";
import { connection } from "next/server";

export default async function DashboardFetch() {
    await connection();
    const [trending, topRated, perGenre, session] = await Promise.all([
        fetchTrendingMovies(),
        fetchTopRatedMovies(),
        fetchMoviesPerGenre(),
        auth0.getSession(),
      ]);
    
      return <DashboardPage user={session?.user} trending={trending} topRated={topRated} perGenre={perGenre}/>
}