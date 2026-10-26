// movie-card.tsx
import { getGenre } from "@/app/features/dashboard/actions";
import { generateStars } from "@/app/utils/generateStars";
import { Button } from "@/components/ui/button";
import { MovieItem } from "@/types";
import { Check, ThumbsUp, Tv, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function MovieModal({
  movie,
  action = "logged-out",
  onClose,
}: {
  movie: MovieItem;
  action?: "logged-out" | "logged-in";
  onClose: () => void;
}) {
  const [genres, setGenres] = useState<{
    id: number;
    titles: string[];
  } | null>(null);

  const [addedToWatchlist, setAddedToWatchlist] = useState<boolean>(false);
  const [isRated, setIsRated] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;

    getGenre(movie.id).then((titles) => {
      if (!ignore) setGenres({ id: movie.id, titles });
    });

    return(() => {
      ignore = true;
    })
  }, [movie.id]);

  const isGenres = genres?.id === movie.id ? genres.titles : [];

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
              src={movie.poster_path!}
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
            <div className="flex gap-3 mt-1 items-center overflow-x-auto overflow-y-hidden">
              {
                movie.genre_ids?.length !== 0 && isGenres.map((genre) => (
                  <p className="border font-semibold px-2 shadow-md py-1 text-sm rounded-sm bg-yellow-400 text-black" key={genre}>{genre}</p>
                ))
              }
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
              <span className="font-light">{Math.floor(movie.vote_average)}/10</span>
            </p>
            •
            <p className="text-sm lg:text-lg font-semibold font-sans">
              Language: <span className="font-light">{movie.language}</span>
            </p>
            <p className="text-sm lg:text-lg font-semibold font-sans">
              Release: <span className="font-light">{movie.release_date}</span>
            </p>
          </div>
          <div className="w-full">{}</div>
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
                  className={`${isRated ? "bg-yellow-400" : ""} flex w-fit border border-yellow-400 cursor-pointer hover:bg-yellow-400/25`}
                  type="button"
                  onClick={() => setIsRated((prev) => !prev)}
                >
                  {isRated ? (
                    <>
                      <Check
                        size={18}
                        className={`${isRated ? "text-black" : "text-yellow-400"} min-w-3 h-auto`}
                      />
                      <p
                        className={`${isRated ? "text-black" : "text-yellow-400"}`}
                      >
                        Rated
                      </p>
                    </>
                  ) : (
                    <>
                      <ThumbsUp
                        className={`${isRated ? "text-black" : "text-yellow-400"}`}
                      />
                      <p className="text-sm text-yellow-400">Rate this movie</p>
                    </>
                  )}
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
