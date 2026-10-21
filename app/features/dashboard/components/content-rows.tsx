"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious } from "@/components/ui/carousel";
import { Movie } from "@/types";
import Image from "next/image";
import { useState } from "react";

export default function ContentRow({
  title,
  movies,
  onChosenMovie,
}: {
  title: string;
  movies: Movie[];
  onChosenMovie: (chosen: Movie) => void;
}) {

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <Carousel opts={{ align: "start", dragFree: true }}>
        <CarouselContent>
          {movies.map((m) => (
            <CarouselItem
              key={m.id}
              className="basis-1/3 md:basis-1/5 lg:basis-1/6"
            >
              <div
                className="group relative aspect-2/3 cursor-pointer overflow-hidden rounded-lg"
                onClick={() => onChosenMovie(m)}
              >
                <Image
                  src={m.image}
                  alt={m.title}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 20vw, 33vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 flex bg-linear-to-b from-transparent to-black transition-opacity duration-200 opacity-100">
                  <p className="self-end m-3 z-50 truncate text-sm">{m.title}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}