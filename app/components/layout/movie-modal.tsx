// movie-card.tsx
import { generateStars } from "@/app/utils/generateStars";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types";
import { Check, Tv, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function MovieModal({
  movie,
  action = "logged-out",
  onClose,
}: {
  movie: Movie;
  action?: "logged-out" | "logged-in";
  onClose: () => void;
}) {

  const [addedToWatchlist, setAddedToWatchlist] = useState<boolean>(false);
  const [isRated, setIsRated] = useState<boolean>(false);

  return createPortal(
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
      <div
        className="flex w-120 md:w-150 flex-col gap-3 rounded-lg border border-white/35 bg-black p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full h-fit rounded-l gap-5">
          <div className="relative aspect-2/3 flex w-55">
            <div className="bg-linear-180 from-transparent to-black/55 z-50 w-full h-full" />
            <Image
              src={movie.image}
              alt={movie.title}
              fill
              className="object-cover w-full"
            />
          </div>

          <div className="flex flex-col w-full h-full">
            <div className="flex w-full justify-between">
              <h1 className="text-2xl font-sans font-semibold text-white">
                {movie.title}
              </h1>
              <X
                size={18}
                className="min-w-3 h-auto cursor-pointer"
                onClick={onClose}
              />
            </div>

            {/* Ratings, duration, year */}
            <div className="flex gap-5 mt-1 items-center">
              <div className="flex items-center">
                {generateStars(movie.rating)}
                <h2 className="ml-2 text-sm md:text-md text-white/75">
                  {movie.rating}/5
                </h2>
              </div>

              <h2 className="text-sm md:text-md text-white/75">{movie.time}</h2>
              <h2 className="text-sm md:text-md text-white/75">{movie.year}</h2>
            </div>

            <p className="text-md text-white/95 mt-3">{movie.description}</p>
          </div>
        </div>
        <div className="flex flex-col w-full h-fit">
          <div className="flex flex-col w-full border-y border-slate-600/75 my-2 py-1 tracking-tight">
            <p className="font-semibold text-md lg:text-lg">
              Producer: <span className="font-light">{movie.producer}</span>
            </p>
            <p className="font-semibold text-md lg:text-lg">
              Stars: <span className="font-light">{movie.stars}</span>
            </p>
          </div>
          <div className="flex w-full h-fit gap-4 items-center">
            {action === "logged-in" && (
              <>
                {/* Add to watchlist */}
                <Button
                  className={`${addedToWatchlist && "bg-yellow-400"} border border-yellow-400 items-center justify-center hover:bg-yellow-400/25 cursor-pointer`}
                  type="submit"
                  onClick={() => setAddedToWatchlist((prev) => !prev)}
                >
                  {addedToWatchlist ? (
                    <Check size={18} className="min-w-3 h-auto text-black" />
                  ) : (
                    <Tv size={18} className="min-w-3 h-auto text-yellow-400" />
                  )}
                  <p
                    className={`${addedToWatchlist ? "text-black" : "text-yellow-400"}`}
                  >
                    Add to watchlist
                  </p>
                </Button>

                {/* Rating button */}
                <Button
                  className={`flex w-fit border border-yellow-400 cursor-pointer hover:bg-yellow-400/25`}
                  type="button"
                  onClick={() => setIsRated((prev) => !prev)}
                >
                  {isRated ? (
                    <Check
                      size={18}
                      className={`${isRated ? "text-yellow-400" : "text-yellow-400"} min-w-3 h-auto`}
                    />
                  ) : (
                    <p className="text-sm text-yellow-400">Rate:</p>
                  )}
                  <div className={`w-full h-full flex items-center`}>{generateStars(3)}</div>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
