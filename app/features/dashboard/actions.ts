"use server"

import { redirect } from "next/navigation";
import { queryGenres } from "./queries";

export const getGenre = async (movieId: number): Promise<string[]> => {
    return queryGenres(movieId);
}

export const logout = async () => {
    redirect("/auth/logout");
}
