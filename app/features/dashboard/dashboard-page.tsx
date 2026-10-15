"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Film, StarIcon } from "lucide-react";
import { generateStars } from "@/app/utils/generateStars";

export default function DashboardPage() {
  const movie_names = 
  [
    "The Shawshank Redemption",
    "The Godfather",
    "Inception",
    "Verity",
    "Backrooms",
    "Parasite",
    "Casablanca",
    "Pulp Fiction",
    "Mean Girls",
    "Legally Blonde",
    "Psycho",
    "Breaking bad",
    "Paddington",
    "Bridgerton"
  ]
  const slides = Array.from({ length: 14 }, (_, index) => ({
    id: index + 1,
    name: `item ${index + 1}`,
    rating: faker.number.int({ max: 5 }),
    movie_names: faker.helpers.arrayElement(movie_names),
    movie_description: faker.lorem.paragraph(),
    image: faker.image.url(),
    person: faker.person.fullName(),
    date: faker.date.recent(),
  }));

  const [selectedItem, setSelectedItem] = useState(slides[0]);

  return (
    <main className="flex flex-col w-full h-full gap-5 overflow-y-auto overflow-x-hidden">

      {/* Trending Now! */}
      <section className="flex flex-col w-full h-fit">
        {/* Thumbnail */}
        <div className="relative flex w-full h-120 rounded-md">
          <div className="flex w-full h-full z-50 bg-linear-180 from-black/30 to-black">
            <article className="self-end px-5 py-3">
              <p className="text-4xl font-semibold">
                {selectedItem.movie_names}
              </p>
              <div className="flex items-center gap-2 w-fit h-full py-2">
                <p>{selectedItem.rating}/5</p>
                <div className="flex">{generateStars(selectedItem.rating)}</div>
              </div>
              <p className="text-md font-sans font-light w-[50%]">
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
        >
          <CarouselContent className="-ml-3">
            {slides.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-3 basis-1/5 md:basis-1/7 lg:basis-1/9 xl:basis-1/11"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-25 cursor-pointer overflow-hidden border border-white/35">
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

      <section className="flex flex-col w-full h-fit gap-2">
            <h1 className="px-5 text-2xl font-bold">For you</h1>
            <div className="">

            </div>
      </section>
    </main>
  );
}
