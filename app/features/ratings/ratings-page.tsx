"use client"

import { useEffect } from "react";
import { placeholderMovies } from "../dashboard/data";
import MovieCard from "../watchlist/components/movie-card";

export default function RatingsPage() {

  useEffect(() => {
    document.title = "Ratings | Film.io"
  })
  return (
    <main className="flex flex-col w-full h-full px-[10dvw]">
      <header className="flex mt-[10dvh] w-full h-fit justify-between items-center">
        <div className="flex flex-col">
          <p className="text-3xl font-sans font-semibold">Ratings</p>
          <p className="text-sm text-white/75">
            Browse movies and add them to your watchlist.
          </p>
        </div>
        <p className="text-sm text-white/75">6 movies</p>
      </header>
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
            action="ratings"
          />
        ))}
      </section>
    </main>
  );
}
