// movie-card.tsx
import { generateStars } from "@/app/utils/generateStars";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";

export default function MovieModal({
  movie,
  action,
  onClose,
}: {
  movie: Movie;
  action?: React.ReactNode;
  onClose: () => void;
}) {
  return createPortal(
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
      <div
        className="flex w-120 md:w-175 flex-col gap-3 rounded-lg border border-white/35 bg-black p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full h-fit rounded-l gap-5">
          <div className="relative aspect-2/3 flex w-85">
            <div className="bg-linear-180 from-transparent to-black/55 z-50 w-full h-full" />
            <Image
              src={movie.image}
              alt={movie.title}
              fill
              className="object-cover w-full"
            />
          </div>

          <div className="flex flex-col w-full h-full">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-sans font-semibold text-white">
              {movie.title}
            </h1>
            <div className="flex gap-5 mt-1 items-center">
              <div className="flex items-center">
                {generateStars(movie.rating)}
                <h2 className="ml-2 text-sm md:text-lg text-white/75">
                  {movie.rating}/5
                </h2>
              </div>

              <h2 className="text-sm md:text-lg text-white/75">{movie.time}</h2>
              <h2 className="text-sm md:text-lg text-white/75">{movie.year}</h2>
            </div>

            <p className="text-sm md:text-lg text-white/95 mt-3">
              {movie.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full h-fit">
          <div className="flex flex-col w-full border-y border-slate-600/75 my-2 py-1 gap-1">
            <p className="font-semibold text-sm md:text-lg">
              Producer: <span className="font-light">{movie.producer}</span>
            </p>
            <p className="font-semibold text-sm md:text-lg">
              Stars: <span className="font-light">{movie.stars}</span>
            </p>
          </div>
          <div className="flex w-full h-fit gap-4 items-center">
            {action}
            <Button type="submit" onClick={onClose} className="border-white border gap-1 text-white cursor-pointer hover:bg-white/25">
              <X size={18} className="min-w-3 h-auto text-white"/>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
