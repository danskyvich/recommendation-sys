"use server"

import WatchListPage from "@/app/features/watchlist/watchlist-page";
import { auth0 } from "@/app/lib/auth/auth0";
import { redirect } from "next/navigation";

export default async function Watchlist() {

    const session = await auth0.getSession();
    if (!session) redirect("/login");

    return(
        <WatchListPage/>
    )
}