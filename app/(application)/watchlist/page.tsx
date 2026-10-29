import { Suspense } from "react";
import WatchlistFetch from "./watchlist-fetch";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <WatchlistFetch searchParams={searchParams} />
    </Suspense>
  );
}