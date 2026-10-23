"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { generateStars } from "@/app/utils/generateStars";
import { User } from "@auth0/nextjs-auth0/types";
import ContentRow from "./components/content-rows";
import MovieCard from "@/app/components/layout/movie-modal";
import { MovieItem } from "@/types";

interface DashboardProps {
  user: User | undefined,
  trending: MovieItem[],
  topRated: MovieItem[],
}

export default function DashboardPage({user, trending, topRated}: DashboardProps) {

  useEffect(() => {
    document.title = "Film.io - Home";
  }, []);

  const [pickedItem, setPickedItem] = useState<MovieItem | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);

  // Defaults to the first trending movie until the user clicks one
  const selectedItem = pickedItem ?? trending[0] ?? null;

  return (
    <main className="flex flex-col z-0 w-full h-full gap-5 overflow-y-auto overflow-x-hidden">
      {selectedMovie && (
        <MovieCard
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          action={user ? "logged-in" : "logged-out"}
        />
      )}

      {/* Trending Now! */}
      <section className="flex flex-col w-full h-fit">
        {/* Thumbnail */}
        <div className="relative flex w-full h-80 md:h-120 rounded-md">
          <div className="flex w-full h-full z-50 bg-linear-180 from-black/30 to-black">
            <article className="self-end px-5 py-3">

              {/* Title */}
              <p className="text-4xl font-semibold capitalize">
                {selectedItem?.title}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-2 w-fit h-full py-2">
                <p>{Math.floor(selectedItem?.vote_average ?? 0)}/10</p>
                <div className="flex">
                  {generateStars(Math.floor(selectedItem?.vote_average ?? 0))}
                </div>
              </div>

              {/* Description */}
              <p className="text-md font-sans font-light w-full md:w-[75%]">
                {selectedItem?.overview}
              </p>
            </article>
          </div>
          {selectedItem.poster_path && (
            <Image
              src={selectedItem?.poster_path}
              alt={String(selectedItem?.id)}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Carousel */}
        <Carousel
          orientation="horizontal"
          opts={{
            align: "start",
          }}
          className="mx-3"
        >
          <CarouselContent>
            {trending.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/3 md:basis-1/5 lg:basis-1/6 cursor-pointer"
                onClick={() => setPickedItem(item)}
              >
                <div className="relative aspect-2/3 overflow-hidden rounded-lg">
                  <Image
                    src={item.poster_path!}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="flex flex-col w-full h-fit my-5 mx-3">
        <ContentRow
          title="Top rated"
          movie={topRated}
          onChosenMovie={setSelectedMovie}
        />
      </section>

      {/*}
      <section className="flex flex-col w-full h-fit my-5 mx-3">
        {user && (
          <ContentRow
            title="Recommended for you"
            movies={placeholderMovies("recommended")}
            onChosenMovie={setSelectedMovie}
          />
        )}
      </section>

      <section className="flex flex-col w-full h-fit my-5 mx-3 gap-5">
        {GENRES.map((g, id) => (
          <ContentRow
            key={id}
            title={g}
            movies={placeholderMovies(g)}
            onChosenMovie={setSelectedMovie}
          />
        ))}
      </section>
      */}
    </main>
  );
}
