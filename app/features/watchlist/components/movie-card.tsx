import { generateStars } from "@/app/utils/generateStars";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MovieMinimum } from "@/types";
import { Check, Eye, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface MovieCardProps {
  movie: MovieMinimum;
  action: "watchlist" | "ratings";
}

export default function MovieCard({ movie, action }: MovieCardProps) {
  const [watched, setWatched] = useState<boolean>(false);
  return (
    <div className="flex border border-white/25 rounded-md h-full bg-(--color-brand-black)/45">
      <div className="relative flex flex-col w-full h-full">
        <Link
          href={`/movie/${movie.id}`}
          className="relative flex flex-1 aspect-2/3 w-full h-full"
        >
          <Image
            src={movie.image}
            alt="alt"
            fill
            className="object-cover rounded-lg"
          />

          <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-b from-black/35 to-black transition-opacity duration-200 opacity-100 rounded-b-lg">
            <X
              size={18}
              className="min-w-3 h-auto m-2 self-end"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            />

            <div className="flex flex-col justify-end">
              <p className="truncate text-md px-2 font-semibold">
                {movie.title}
              </p>

              <div className="flex w-full px-2 text-sm  text-white/75 tracking-tighter">
                <p>{movie.genre}</p>
                <p className="px-2">•</p>
                <p>{movie.year}</p>
              </div>

              <div className="pointer-events-auto flex w-full p-2 justify-between">
                {action === "watchlist" ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setWatched((prev) => !prev);
                    }}
                    className={`${watched ? "bg-blue-400" : "bg-transparent"} cursor-pointer hover:bg-blue-400/25 border border-blue-400 flex px-1 py-1 gap-0.5 rounded-lg`}
                  >
                    {watched ? (
                      <Check size={18} className="text-white min-w-3 h-auto" />
                    ) : (
                      <Eye size={18} className="min-w-3 h-auto text-blue-400" />
                    )}
                    <p
                      className={`text-[0.75rem] line-clamp1 truncate ${watched ? "text-white" : "text-blue-400"}`}
                    >
                      Mark as watched
                    </p>
                  </button>
                ) : (
                  <>
                    {
                      <div className="flex w-full mr-3 items-center">
                        {generateStars(3)} <p className="ml-1 text-sm">3/5</p>
                      </div>
                    }
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
