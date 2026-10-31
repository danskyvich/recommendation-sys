import { notFound } from "next/navigation";
import { sql } from "../db";

export const getMovieWithRatingsState = async (
  movie_id: number,
  user_id: string | undefined
): Promise<{ inRatings: boolean }> => {
  if (!Number.isInteger(movie_id) || movie_id < 1) notFound();

  // logged-out users can't have rated anything
  if (!user_id) return { inRatings: false };

  const [row] = await sql`
    SELECT 1 FROM ratings
    WHERE user_id = ${user_id} AND movie_id = ${movie_id}
  `;

  return { inRatings: !!row };
};