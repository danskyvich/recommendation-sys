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
import { GENRES, placeholderMovies } from "./data";
import { Movie } from "@/types";
import MovieCard from "@/app/components/layout/movie-modal";
import { Button } from "@/components/ui/button";
import { Tv } from "lucide-react";
import { redirect } from "next/navigation";

faker.seed(1);

const slides = Array.from({ length: 14 }, (_, index) => ({
  id: index + 1,
  name: `item ${index + 1}`,
  rating: faker.number.int({ max: 5 }),
  movie_names: faker.lorem.words(),
  movie_description: faker.lorem.paragraph(),
  image: faker.image.url(),
  person: faker.person.fullName(),
  date: faker.date.recent({ refDate: "2026-01-01"}),
}));

export default function DashboardPage({user}: {user: User | undefined}) {

  useEffect(() => {
    document.title = "Film.io - Home";
  }, []);

  const [selectedItem, setSelectedItem] = useState(slides[0]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
              <p className="text-4xl font-semibold capitalize">
                {selectedItem.movie_names}
              </p>
              <div className="flex items-center gap-2 w-fit h-full py-2">
                <p>{selectedItem.rating}/5</p>
                <div className="flex">{generateStars(selectedItem.rating)}</div>
              </div>
              <p className="text-md font-sans font-light w-full md:w-1/2">
                {selectedItem.movie_description}
              </p>
            </article>
          </div>
          <Image
            src={selectedItem.image}
            alt={String(selectedItem.id)}
            fill
            className="object-cover"
          />
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
            {slides.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/3 md:basis-1/5 lg:basis-1/6 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-2/3 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.name}
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
        {user && (
          <ContentRow
            title="Recommended for you"
            movies={placeholderMovies("recommended")}
            onChosenMovie={setSelectedMovie}
          />
        )}
      </section>

      <section className="flex flex-col w-full h-fit my-5 mx-3">
        <ContentRow
          title="Top rated"
          movies={placeholderMovies("top")}
          onChosenMovie={setSelectedMovie}
        />
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
    </main>
  );
}
