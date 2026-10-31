"use client"

import BrowseMoviesButton from "@/app/components/layout/browse-button";
import { MovieItem } from "@/types";
import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface RatingsPageProps {
  count: number;
  movies: MovieItem[];
}

export default function RatingsPage({count, movies}: RatingsPageProps) {

  useEffect(() => {
    document.title = "Ratings | Film.io"
  });

  return (
    <main className="flex flex-col w-full h-full px-[10dvw]">
      <header className="flex mt-[10dvh] w-full h-fit justify-between items-center">
        <div className="flex flex-col">
          <p className="text-3xl font-sans font-semibold">Ratings</p>
          <p className="text-sm text-white/75">
            Browse movies and add them to your watchlist.
          </p>
        </div>
        <p className="text-sm text-white/75">{count} movies</p>
      </header>
      <hr className="border-white/35 mt-1" />

      <section className="relative grid grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5 w-full h-full mt-4 justify-evenly">
        {movies.length === 0 ? (
          <div className="absolute flex flex-col gap-3 inset-0 w-full h-full items-center justify-center">
            <CircleQuestionMark size={30} className="h-auto text-white/50"/>
            <p className="text-sm font-sans text-white/50">You do not have any rated movies.</p>
            <BrowseMoviesButton/>
          </div>
        ) : (
          <>
            {movies.map((movie) => (
              <article key={movie.id} className="flex flex-col w-full h-full">
                <Link
                  href={`/dashboard/${movie.id}`}
                  className="relative block aspect-2/3"
                >
                  <Image
                    src={movie.poster_path!}
                    alt={`${movie.poster_path} movie`}
                    fill
                    className="rounded-lg shadow-md"
                  />
                  <div className="flex w-full h-full bg-linear-180 from-transparent to-black/70 z-50 absolute inset-0 ">
                    <p className="text-sm self-end p-2">{movie.title}</p>
                  </div>
                </Link>
              </article>
            ))}
          </>
        )}
      </section>
    </main>
  );
}
