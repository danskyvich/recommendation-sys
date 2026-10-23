"use server"
import { fetchTopRatedMovies, fetchTrendingMovies } from "@/app/features/dashboard/actions";
import DashboardPage from "@/app/features/dashboard/dashboard-page";
import { auth0 } from "@/app/lib/auth/auth0";
import { Suspense } from "react";

export default async function Dashboard() {

  const [trending, topRated] = await Promise.all([
    fetchTrendingMovies(),
    fetchTopRatedMovies(),
  ]);

    const session = await auth0.getSession();
    return (
      <Suspense>
        <DashboardPage user={session?.user} trending={trending} topRated={topRated}/>
      </Suspense>
    );
}