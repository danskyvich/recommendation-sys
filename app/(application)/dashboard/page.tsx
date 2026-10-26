"use server"

import DashboardPage from "@/app/features/dashboard/dashboard-page";
import { fetchMoviesPerGenre, fetchTopRatedMovies, fetchTrendingMovies } from "@/app/features/dashboard/queries";
import { auth0 } from "@/app/lib/auth/auth0";
import { Suspense } from "react";

export default async function Dashboard() {

  const [trending, topRated, perGenre] = await Promise.all([
    fetchTrendingMovies(),
    fetchTopRatedMovies(),
    fetchMoviesPerGenre(),
  ]);

    const session = await auth0.getSession();
    return (
      <Suspense>
        <DashboardPage user={session?.user} trending={trending} topRated={topRated} perGenre={perGenre}/>
      </Suspense>
    );
}