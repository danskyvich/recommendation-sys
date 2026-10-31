"use client"

import { MovieFull, Rating } from "@/types";
import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import WatchlistButton from "../../watchlist/components/watchlist-button";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { addMovieToWatchlist, deleteMovieFromWatchlist } from "../../watchlist/actions";
import { User } from "@auth0/nextjs-auth0/types";
import RatingsButton from "../../ratings/components/ratings-button";
import { Button } from "@/components/ui/button";
import { transformCodesToCountry } from "@/app/utils/transformCodesToCountry";
import { redirect } from "next/navigation";
import { addRating, deleteRating } from "../../ratings/actions";
import { isValidRating } from "@/app/utils/validateRatingInput";

interface MoviePageProps {
  movie: MovieFull;
  inWatchlist: boolean;
  inRatings: boolean;
  user: User | null;
}

export default function MoviePage({movie, inWatchlist, user, inRatings}: MoviePageProps) {

    useEffect(() => {
        document.title = `${movie.title} | Film.io`
    })

    const [optimistic, setOptimistic] = useOptimistic(
        inWatchlist,
        (_current, next: boolean) => next,
    )
    const [optimisticRatings, setOptimisticRatings] = useOptimistic(
        inRatings,
        (_current, next: boolean) => next,
      )
    const [rating, setRating] = useState<number | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleWatchlistToggle = () => {
        startTransition(async() => {
            const next = !optimistic;
            setOptimistic(next);

            try {
                const result = next ? await addMovieToWatchlist(String(movie.id)) : await deleteMovieFromWatchlist(String(movie.id));
                if (!result.success) {
                    console.error(result.error);
                }
            } catch (err) {
                console.error(err);
            }
        })
    }

    // handle ratings
      const handleRatingsAction = (rating: number) => {
        const next = !inRatings;
    
        if (next && (rating === null || !isValidRating(rating))) {
          console.error("Invalid rating input.");
          return;
        }
    
        startTransition(async () => {
          setOptimisticRatings(next);
          try {
            const response = next
              ? await addRating(rating as Rating, String(movie.id))
              : await deleteRating(String(movie.id));
            if (!response.success) {
              console.error(response.error);
              //TODO: Add a component that show an error to the client
            }
          } catch (err) {
            console.error(err);
          }
        });
      };
    
    return (
      <main className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden pt-5">
        <div className="relative gap-5 w-full h-135">
          <Image
            src={movie.poster_path!}
            alt={`${movie.title}-poster-image`}
            fill
            className="rounded-xl shadow-xl object-cover"
          />
          <div className="inset-0 absolute bg-linear-180 from-transparent to-black/75 z-50" />
        </div>

        <section className="flex flex-col w-full px-[5dvw] sm:px-[10dvw] xl:px-[20dvw] mt-10">
          {/* header */}
          <article className="flex flex-col w-full gap-5">
            <div className="w-full h-fit">
              {/* Header */}
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="font-semibold text-2xl lg:text-4xl font-sans">
                    {movie.title}
                  </h1>
                  <div className="flex w-fit text-sm text-white/50 font-semibold font-sans gap-3">
                    <p>{movie.release_date}</p>•<p>{movie.origin_country}</p>•
                    <p>{movie.runtime} mins</p>
                  </div>
                </div>

                {/* Subbar details */}
                <div className="flex gap-2">
                  <Star size={18} className="text-yellow-400 min-w-4 h-auto" />
                  <p className="text-sm text-white/75 font-light">
                    {Math.floor(movie.vote_average)}/10
                  </p>
                </div>
              </div>

              {/* Description */}
              <h2 className="font-normal tracking-tight text-md font-sans mt-3 text-white/75">
                {movie.overview}
              </h2>
            </div>
          </article>

          {/* Genre bar */}
          <article className="flex border-white/25 gap-3 mt-3">
            {movie.genres.map((genre, id) => (
              <p
                key={id}
                className="rounded-lg text-sm font-semibold bg-purple-400 text-black px-2 py-1"
              >
                {genre}
              </p>
            ))}
          </article>

          {/* Movie information */}
          <section className="flex flex-col w-full mt-5">
            <h2 className="text-white/75 font-semibold font-sans text-xl">
              Movie information
            </h2>

            <div className="flex flex-col w-full border border-white/25 rounded-lg p-2 mt-2">
              <p className="font-sans text-sm md:text-lg font-semibold">
                Production companies
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-3 w-full h-fit gap-3 mt-3">
                {
                  movie.production_companies.map((company) => {
                    console.log(company.logo_path);
                    return (
                      <div
                        className="relative flex w-fit items-center gap-3"
                        key={company.id}
                      >
                        {company.logo_path && (
                          <div className="relative shrink-0 w-16 h-10 rounded-md bg-white/90">
                            <Image
                              src={company.logo_path}
                              alt={`${company.name} logo`}
                              fill
                              sizes="64px"
                              className="object-contain p-1"
                            />
                          </div>
                        )}

                        <p className="flex w-fit h-fit text-sm lg:text-lg line-clamp-1">
                          {company.name}
                        </p>
                        {company.origin_country && (
                          <p className="text-sm lg:text-lg text-white/50 line-clamp-1">
                            ({transformCodesToCountry(company.origin_country)})
                          </p>
                        )}
                      </div>
                    );}
                )}
              </div>
            </div>
          </section>

          {user ? (
            <div className="flex flex-col border border-yellow-400/25 rounded-xl sm:flex-row p-2 gap-3 w-full h-fit mt-5">
              <WatchlistButton
                state={optimistic}
                disabled={isPending}
                onClick={handleWatchlistToggle}
              />
              <RatingsButton
                state={optimisticRatings}
                onConfirm={handleRatingsAction}
                disabled={isPending}
              />
            </div>
          ) : (
            <div className="flex border border-yellow-400/25 rounded-xl sm:flex-row p-2 gap-3 w-full h-fit mt-2 items-center justify-center">
              <Button className="flex border border-yellow-400 px-5 hover:bg-yellow-400/25 cursor-pointer" onClick={() => redirect("/auth/login")}>
                <ArrowUpRight
                  size={18}
                  className="text-yellow-400 min-w-4 h-auto"
                />
                <p className="text-sm text-yellow-400">Sign in</p>
              </Button>
              <p className="text-sm text-yellow-400 font-light">
                to rate and add them to your watchlist.
              </p>
            </div>
          )}
        </section>
      </main>
    );
}