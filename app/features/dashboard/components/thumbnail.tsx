"use client"

import { MovieItem } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getGenre } from "../actions";
import WatchlistButton from "../../watchlist/components/watchlist-button";
import RatingsButton from "../../ratings/components/ratings-button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ThumbnailProps {
  selectedItem: MovieItem;
}

export default function Thumbnail({ selectedItem }: ThumbnailProps) {

  const [result, setResult] = useState<{id: number, titles: string[]} | null>(null);

  useEffect(() => {
    console.log("Thumbnail mounted");
    return () => console.log("Thumbnail unmounted");
  }, []);

  useEffect(() => {
    let ignore = false;

    getGenre(selectedItem?.id).then((titles) => {
      if (!ignore) setResult({ id: selectedItem.id, titles });
    });

    return () => {
      ignore = true;
    }
  }, [selectedItem?.id]);

  // if same movie was picked, retain genres. Else, clear result.
  const genres = result?.id === selectedItem?.id ? result.titles : [];

  return (
    <div className="relative flex w-full h-150 rounded-md">
      <div className="flex w-full h-full z-50 bg-linear-180 from-black/30 to-black">
        <article className="self-end px-5 py-3">
          {/* Title */}
          <p className="text-4xl font-semibold capitalize">
            {selectedItem?.title}
          </p>

          {/* Other info */}
          <div className="flex items-center gap-2 w-fit h-full py-2 text-sm text-white/65 font-light">
            {/* Ratings */}
            <p className="bg-yellow-400 text-black px-2 rounded-md py-1 font-semibold">
              {Math.floor(selectedItem?.vote_average ?? 0)}/10
            </p>
            {/* Date */}•<p>{selectedItem?.release_date}</p>•{/* Genres */}
            <div className="flex w-fit gap-3">
              {genres.map((genre, id) => (
                <p
                  key={id}
                  className="border border-purple-400 px-2 py-1 text-black font-semibold bg-purple-400 rounded-md"
                >
                  {genre}
                </p>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-md font-sans font-light w-full md:w-[75%]">
            {selectedItem?.overview}
          </p>

          <div className="flex w-full h-fit my-3">
            <Link
              href={`/dashboard/${selectedItem.id}`}
              className="flex text-sm text-yellow-400 border border-yellow-400 rounded-2xl px-3 py-2 hover:bg-yellow-400/25 active:bg-yellow-400 hover:text-yellow-400 active:text-black cursor-pointer transition-all duration-100"
            >
              <ArrowUpRight size={18} className="text-yellow-400 cursor-pointer"/>
              Visit movie page
            </Link>
          </div>
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
  );
}
