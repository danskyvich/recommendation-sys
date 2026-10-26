"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { User } from "@auth0/nextjs-auth0/types";
import ContentRow from "./components/content-rows";
import MovieCard from "@/app/components/layout/movie-modal";
import { AggregatedGenres, MovieItem } from "@/types";
import Thumbnail from "./components/thumbnail";
import ThumbnailSkeleton from "./components/skeleton/thumbnail-skeleton";
import { FEATURED } from "@/app/lib/db";

interface DashboardProps {
  user: User | undefined,
  trending: MovieItem[],
  topRated: MovieItem[],
  perGenre: Record<string, AggregatedGenres[]>,
}

export default function DashboardPage({user, trending, topRated, perGenre}: DashboardProps) {

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
        <Suspense fallback={<ThumbnailSkeleton />}>
          {/* Thumbnail */}
          <Thumbnail selectedItem={selectedItem} />
        </Suspense>

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
          movies={topRated}
          onChosenMovie={setSelectedMovie}
        />
      </section>

      {
        FEATURED.filter((genre) => genre).slice(0, 5).map((genre, id) => (
          <ContentRow
            title={genre}
            movies={perGenre[genre]}
            key={id}
            onChosenMovie={setSelectedMovie}
          />
        ))
      }
    </main>
  );
}
