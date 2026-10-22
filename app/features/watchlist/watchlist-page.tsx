"use client"

import { useEffect } from "react";
import MovieCard from "./components/movie-card";
import { placeholderMovies } from "../dashboard/data";

export default function WatchListPage() {

    useEffect(() => {
        document.title = "Watchlist | Film.io"
    })

    return (
      <main className="flex flex-col w-full h-full px-[5dvw] sm:px-[10dvw] xl:px-[20dvw] overflow-y-auto overflow-x-hidden">
        <section className="flex mt-[10dvh] w-full h-fit justify-between items-center">
          <div className="flex flex-col">
            <p className="text-3xl font-sans font-semibold">Watchlist</p>
            <p className="text-sm text-white/75">Browse movies and add them to your watchlist.</p>
          </div>
          <p className="text-sm text-white/75">6 movies</p>
        </section>
        <hr className="border-white/35 mt-1" />

        <section className="grid grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5 w-full h-fit mt-4 justify-evenly">
          {placeholderMovies("top", 6).map((item) => (
            <MovieCard
              movie={{
                id: item.id,
                image: item.image,
                title: item.title,
                year: item.year,
                genre: item.genre,
              }}
              key={item.id}
              action="watchlist"
            />
          ))}
        </section>
      </main>
    );
};