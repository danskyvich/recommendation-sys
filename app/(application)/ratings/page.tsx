import RatingsPage from "@/app/features/ratings/ratings-page";
import RatingsFetch from "./ratings-fetch";
import { Suspense } from "react";

export default function Ratings({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return <Suspense fallback={null}><RatingsFetch searchParams={searchParams}/></Suspense>;
};