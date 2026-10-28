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
import { AggregatedGenres, MovieItem } from "@/types";
import Thumbnail from "./components/thumbnail";
import ThumbnailSkeleton from "./components/skeleton/thumbnail-skeleton";
import { FEATURED } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  // for the trending carousel (the first carousel)
  const [pickedItem, setPickedItem] = useState<MovieItem | null>(null);

  // Defaults to the first trending movie until the user clicks one
  const selectedItem = pickedItem ?? trending[0] ?? null;

  return (
    <main className="flex flex-col z-0 w-full h-full gap-5 overflow-y-auto overflow-x-hidden">
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
        <ContentRow title="Top rated" movies={topRated} />
      </section>

      <section className="flex flex-col w-full h-fit my-5 mx-3">
        {FEATURED.filter((genre) => genre)
          .slice(0, 5)
          .map((genre, id) => (
            <div className="space-y-3" key={id}>
              <h2 className="text-2xl font-semibold">{genre}</h2>
              <Carousel
                orientation="horizontal"
                opts={{
                  align: "start",
                }}
                className="mx1"
              >
                <CarouselContent>
                  {perGenre[genre].map((movies) => (
                    <CarouselItem className="basis-1/3 md:basis-1/5 lg:basis-1/6" key={movies.id} >
                      <Link href={`/dashboard/${movies.id}`} draggable={false} className="block relative aspect-2/3 overflow-hidden rounded-lg w-full h-full">
                        <Image
                          src={movies.poster_path!}
                          alt={movies.title}
                          fill
                          sizes="w-full"
                          className="object-cover"
                        />
                        <div className="flex w-full h-full bg-linear-180 from-transparent to-black/90 absolute z-50 inset-0 pointer-events-none">
                          <p className="text-sm font-sans self-end p-2">{movies.title}</p>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          ))}
      </section>
    </main>
  );
}
