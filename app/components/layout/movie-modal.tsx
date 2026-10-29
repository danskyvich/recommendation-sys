"use client";

// movie-card.tsx
import {
  addMovieToWatchlist,
  deleteMovieFromWatchlist,
} from "@/app/features/watchlist/actions";
import WatchlistButton from "@/app/features/watchlist/components/watchlist-button";
import { Button } from "@/components/ui/button";
import { MovieItem } from "@/types";
import { Check, ThumbsUp, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useOptimistic, useState, useTransition } from "react";

export default function MovieModal({
  action,
  inWatchlist = false,
  movie,
}: {
  inWatchlist?: boolean;
  action: "logged-out" | "logged-in";
  movie: MovieItem;
}) {

  // states
  const router = useRouter();
  const [optimisticWatchlist, setOptimisticWatchlist] = useOptimistic(
    inWatchlist,
    (_current, next: boolean) => next,
  );
  const [isRated, setIsRated] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  // closes modal using either x or ESC keys
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  // handle watchlist
  const handleWatchlistToggle = () => {
    startTransition(async () => {
      const next = !optimisticWatchlist;
      setOptimisticWatchlist(next);

      try {
        const result = next
          ? await addMovieToWatchlist(String(movie.id))
          : await deleteMovieFromWatchlist(String(movie.id));
        if (!result.success) {
          console.error(result.error);
          // TODO: add a component here that displays error messages
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-labelledby={`${movie.title}`}
      aria-modal={true}
    >
      <div
        className="flex w-120 md:w-150 flex-col gap-3 rounded-lg border border-white/35 bg-black p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full h-fit rounded-l gap-5">
          <div className="relative aspect-2/3 flex w-55">
            <div className="bg-linear-180 from-transparent to-black/55 z-50 w-full h-full" />
            <Image
              src={movie.poster_path!}
              alt={movie.title}
              fill
              className="object-cover w-full"
            />
          </div>

          <div className="flex flex-col w-full h-full">
            <div className="flex w-full justify-between items-center">
              <h1 className="text-2xl font-sans font-semibold text-white">
                {movie.title}
              </h1>
              <button type="button" aria-label="Close">
                <X
                  size={18}
                  className="min-w-5 h-auto cursor-pointer"
                  aria-label="Close"
                  onClick={() => router.back()}
                />
              </button>
            </div>

            {/* Ratings, duration, year */}
            <div className="flex gap-3 mt-1 items-center overflow-x-auto overflow-y-hidden">
              {movie.genres?.length !== 0 &&
                movie.genres?.map((genre) => (
                  <p
                    className="border font-semibold px-2 shadow-md py-1 text-sm rounded-sm bg-yellow-400 text-black"
                    key={genre}
                  >
                    {genre}
                  </p>
                ))}
            </div>

            <p className="text-md text-white/95 mt-3">{movie.overview}</p>
          </div>
        </div>
        <div className="flex flex-col w-full h-fit">
          <div className="flex gap-2 w-full border-y border-slate-600/75 my-2 py-1 tracking-tight">
            <p className="font-semibold text-sm lg:text-lg">
              Votes: <span className="font-light">{movie.vote_count}</span>
            </p>
            •
            <p className="text-sm lg:text-lg font-semibold font-sans">
              Rating:{" "}
              <span className="font-light">
                {Math.floor(movie.vote_average)}/10
              </span>
            </p>
            •
            <p className="text-sm lg:text-lg font-semibold font-sans">
              Language: <span className="font-light">{movie.language}</span>
            </p>
            <p className="text-sm lg:text-lg font-semibold font-sans">
              Release: <span className="font-light">{movie.release_date}</span>
            </p>
          </div>
          <div className="flex w-full h-fit gap-4 items-center">
            {action === "logged-in" && (
              <>
                {/* Add to watchlist */}
                <WatchlistButton
                  state={optimisticWatchlist}
                  onClick={handleWatchlistToggle}
                  disabled={isPending}
                />

                {/* Rating button */}
                <Button
                  type="button"
                  aria-pressed={isRated}
                  onClick={() => setIsRated((prev) => !prev)}
                  className={`${isRated ? "bg-yellow-400" : "bg-transparent"} border border-yellow-400 cursor-pointer hover:bg-yellow-400/25 hover:text-white active:bg-yellow-400 active:text-black`}
                >
                  {isRated ? <Check size={18} className="text-black"/> : <ThumbsUp size={18} className="text-yellow-400"/>}
                  <span className={isRated ? "text-black" : "text-yellow-400"}>{isRated ? "Rated" : "Rate this movie"}</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
