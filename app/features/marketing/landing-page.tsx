"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    document.title = "Film.io";
  }, []);

  const movie_slides = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    image: `https://picsum.photos/seed/${index + 1}/300/450`,
    alt: `Movie poster ${index + 1}`,
  }));
  return (
    <main className="flex w-full h-full flex-col overflow-y-auto bg-linear-180 from-slate-900 to-black/60">
      {/* Hero elements */}
      <article className="flex flex-col h-fit w-full items-center py-[55]">
        {/* One-liner */}
        <div className="flex flex-1 flex-col mt-25">
          <h1 className="text-5xl font-bold md:text-6xl text-center max-w-full tracking-tight">
            Find your next favorite movie.
          </h1>
          <h2 className="pt-5 text-md md:px-0 px-3 md:text-xl font-light text-center">
            Rate what you have watched and get recommendations suitable for your
            taste.
          </h2>
        </div>

        <div className="flex w-fit gap-3 my-10">
          <Button
            type="button"
            onClick={() => redirect("/auth/login")}
            className="bg-white text-black hover:bg-gray-400 cursor-pointer active:bg-black active:text-white"
          >
            <ArrowUpRight size={18} className="min-w-3 h-auto"/>
            <p>Get started</p>
          </Button>
          <Button
            type="button"
            onClick={() => redirect("/dashboard")}
            className="border border-white hover:bg-white/15 active:text-black active:bg-white cursor-pointer"
          >
            <p>
              Browse movies
            </p>
          </Button>
        </div>
      </article>

      {/* Moving movie pictures */}
      <section className="w-full overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...movie_slides, ...movie_slides].map((item) => (
            <div className="relative mr-5 h-85 w-56 shrink-0" key={item.id}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="224px"
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
