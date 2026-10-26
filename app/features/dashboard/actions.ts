"use server"

import { queryGenres } from "./queries";

export const getGenre = async (movieId: number): Promise<string[]> => {
    return queryGenres(movieId);
}
