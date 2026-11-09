"use client"

import { saveFilms, skipOnboarding } from "@/app/(onboarding)/actions";
import Error from "@/app/components/layout/error";
import { shuffleFilms } from "@/app/lib/helpers/shufflePool";
import { Button } from "@/components/ui/button";
import { OnboardingMovie } from "@/types";
import { ChevronRight, Shuffle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-aria-components";
import { Selection } from "react-aria-components";

export default function OnboardingPageTwo({ films }: { films: OnboardingMovie[] }) {

    const router = useRouter();
    const [error, setError ] = useState<string | null>(null);
    const [isPending, startTransition ] = useTransition();
    const [selectedFilms, setSelectedFilms] = useState<Set<string | number>>(new Set());

    const [displayedFilms, setDisplayedFilms] = useState<OnboardingMovie[]>(() => films.slice(0,6));
    const atMax = selectedFilms.size === 4;

    // skip this step
    const handleSkip = () => {
        startTransition( async () => {
          try {
            const response = await skipOnboarding();
            if (!response.success) {
              setError(response.error);
              return;
            }
            router.push("/dashboard");
          } catch (err) {
            console.error("Something went wrong: ", err);
            return;
          }
        });
    };

    // next button
    const handleNextStep = () => {
      setError(null);
      startTransition( async() => {
        if (selectedFilms.size < 4) {
          setError("Not enough picked films");
          return;
        }

        try {
          const response = await saveFilms(selectedFilms);
          if (!response.success) {
            setError(response.error);
            return;
          }
          router.push("/dashboard");
        } catch (err) {
          console.error(err);
          return;
        }
      })
    }

    // toggling a film from chosen to unchosen
    const handleToggle = (selections: Selection) => {
      if (selections === "all") return;
      if (selections.size > 4) {
        setError("You have already picked four films.");
      }
      setSelectedFilms(selections);
    };
    
    // shuffle films
    const handleShuffle = () => {
      setError(null);
      setSelectedFilms(new Set());
      setDisplayedFilms(shuffleFilms(films).slice(0,6));
    };

    return (
      <main className="flex w-full h-full flex-col px-5 justify-between">
        {error && <Error message={error} setMessage={setError} />}
        <section className="flex w-full flex-col gap-4 pb-4">
          <div className="mt-4">
            <h1 id="genres-label" className="font-sans text-xl font-semibold">
              Pick up to 4 films you love
            </h1>
          </div>
        </section>

        {/* Movies */}
        <section className="w-full h-fit px-20 md:px-10">
          <ToggleButtonGroup
            selectionMode="multiple"
            aria-labelledby="film-items"
            selectedKeys={selectedFilms}
            onSelectionChange={handleToggle}
            className="grid grid-cols-2 md:grid-cols-3 gap-2 justify-start"
          >
            {displayedFilms.map((film) => (
              <ToggleButton
                aria-label="film-option"
                className={`aspect-2/3 h-50 md:h-75 w-full relative flex cursor-pointer items-center hover:ring-2 hover:ring-yellow-400/40 hover:rounded-xl data-selected:ring-2 data-selected:ring-yellow-400 data-disabled:opacity-40 data-disabled:cursor-not-allowed data-selected:rounded-xl`}
                key={film.id}
                id={film.id}
                isDisabled={!selectedFilms.has(film.id) && atMax}
              >
                <Image
                  src={film.poster_path}
                  alt={`${film.title}-poster-movie`}
                  fill
                  className="absolute object-cover rounded-xl"
                />
                <div className="absolute inset-0 rounded-xl bg-linear-180 from-transparent to-black/75" />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </section>

        {/* Footer */}
        <section className="sticky bottom-0 flex w-full items-center justify-between py-4">
          <Button
            aria-label="Skip onboarding"
            isDisabled={isPending}
            onPress={handleSkip}
            className="cursor-pointer px-3 py-2 text-sm text-white/60 hover:text-white"
          >
            Skip
          </Button>

          <div className="flex w-fit gap-3">
            <Button
              aria-label="get-new-films"
              isDisabled={isPending}
              onPress={handleShuffle}
              className="flex cursor-pointer border border-white px-5 py-2 rounded-md hover:bg-white/25 active:bg-white active:text-black"
            >
              <Shuffle size={18}/>
              <span className="text-sm font-sans">Shuffle</span>
            </Button>
            <Button
              aria-label="Next step"
              isDisabled={isPending}
              onPress={handleNextStep}
              className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-yellow-400 px-5 py-2 text-yellow-400 transition-all duration-100 hover:bg-yellow-400/15 active:bg-yellow-400 active:text-black data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40"
            >
              <span className="text-sm font-sans">
                {isPending ? "Saving..." : "Next"}
              </span>
              <ChevronRight size={18} />
            </Button>
          </div>
        </section>
      </main>
    );
}