"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { MovieItem } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ContentRow({
  title,
  movies,
}: {
  title: string;
  movies: MovieItem[];
}) {

  return (
    <section>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <h3 className="mb-3 text-sm text-white/75 font-sans font-light">Movies that users rated the most</h3>
      <Carousel opts={{ align: "start", dragFree: true }}>
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="basis-1/3 md:basis-1/5 lg:basis-1/6"
            >
              <Link
                className="group relative block aspect-2/3 cursor-pointer overflow-hidden rounded-lg"
                href={`/dashboard/${movie.id}`}
                scroll={false}
                draggable={false}
              >
                <Image
                  src={movie.poster_path!}
                  alt={movie.title}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 20vw, 33vw"
                  className="object-cover"
                />

                <div className="pointer-events-none absolute inset-0 flex bg-linear-to-b from-transparent to-black transition-opacity duration-200 opacity-100">
                  <p className="self-end m-3 z-50 truncate text-sm">
                    {movie.title}
                  </p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}