"use client"

import { MovieItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface WatchlistProps {
  count: number,
  watchlistMovies: MovieItem[],
  page: number
}

export default function WatchListPage({count, watchlistMovies, page}: WatchlistProps) {

    useEffect(() => {
        document.title = "Watchlist | Film.io"
    })

    return (
      <main className="flex flex-col w-full h-full px-[5dvw] sm:px-[10dvw] xl:px-[20dvw] overflow-y-auto overflow-x-hidden">

        {/* headaer */}
        <section className="flex mt-[10dvh] w-full h-fit justify-between items-center">
          <div className="flex flex-col">
            <p className="text-3xl font-sans font-semibold">Watchlist</p>
            <p className="text-sm text-white/75">Browse movies and add them to your watchlist.</p>
          </div>

          {/* count */}
          <p className="text-sm text-white/75">{count} movies</p>
        </section>
        <hr className="border-white/35 mt-1" />

        <section className="grid grid-cols-2 lg:grid-cols-3 w-full gap-x-3 gap-y-3 my-5">
          {
            watchlistMovies.map((movie) => (
              <article key={movie.id} className="flex flex-col w-full h-full">
                <Link href={`/dashboard/${movie.id}`} className="relative block aspect-2/3">
                  <Image src={movie.poster_path!} alt={`${movie.poster_path} movie`} fill className="rounded-lg shadow-md"/>
                  <div className="flex w-full h-full bg-linear-180 from-transparent to-black/70 z-50 absolute inset-0 ">
                    <p className="text-sm self-end p-2">{movie.title}</p>
                  </div>
                </Link>
              </article>
            ))
          }
        </section>
      </main>
    );
};