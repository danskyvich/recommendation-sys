"use client";

import { useState, useTransition } from "react";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  type Selection,
} from "react-aria-components";
import { ChevronRight } from "lucide-react";
import { Genre } from "@/types";
import { useRouter } from "next/navigation";
import { saveGenres, skipOnboarding } from "@/app/(onboarding)/actions";
import Error from "@/app/components/layout/error";

const MAX = 5; // max chips

export default function OnboardingPageOne({ genres }: { genres: Genre[] }) {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [selected, setSelected] = useState<Set<string | number>>(new Set());
    const [error, setError] = useState<string | null>(null);
    
    // if # of clicked chips reaches MAX
    const atMax = selected.size >= MAX;

    // if selected chips are less than 5, add those to set
    const handleToggle = (selections: Selection) => {
        if (selections === "all") return;
        if (selections.size <= 5) setSelected(new Set(selections));
    };

    // redirect user to next page
    const handleNextPage = () => {
        setError(null);
        startTransition( async() => {
          if (selected.size === 0) {
            setError("Pick five genres or skip this step.");
            return;
          }
            try {
                const result = await saveGenres(selected);
                if (!result.success) {
                    setError(result.error);
                    return;
                }
                router.push("/onboarding/film-step");
            } catch (err) {
                console.error(err);
                setError("Something went wrong.")
            } 
        });
    }

    // if skipped, go to next page
    const handleSkip = () => {
        setError(null);
        startTransition(async () => {
          try {
            const result = await skipOnboarding();
            if (!result.success) {
              setError(result.error);
              return;
            }
            router.push("/onboarding/film-step");
          } catch (err) {
            console.error(err);
            setError("Something went wrong.");
          }
        });
    }
 
  return (
    <main className="flex w-full h-full flex-col px-5 justify-between">
      {
        error && <Error message={error} setMessage={setError}/>
      }

      {/* Content */}
      <section className="flex w-full flex-col gap-4 pb-4">
        <div className="mt-4">
          <h1 id="genres-label" className="font-sans text-xl font-semibold">
            Pick up to 5 genres you love
          </h1>
          <p className="text-sm text-white/60">
            {selected.size} of {MAX} selected
          </p>
        </div>

        <ToggleButtonGroup
          aria-labelledby="genres-label"
          selectionMode="multiple"
          selectedKeys={selected}          
          className="flex w-full flex-row flex-wrap justify-start gap-3"
          onSelectionChange={handleToggle}
        >
          {genres.map((genre) => (
            <ToggleButton
              key={genre.id}
              id={genre.id}
              isDisabled={!selected.has(genre.id) && atMax}
              className="cursor-pointer rounded-lg border px-4 py-2 text-sm font-light outline-none transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-yellow-400 data-selected:border-yellow-400 data-selected:bg-yellow-400/15 data-selected:text-yellow-400 data-disabled:cursor-not-allowed data-disabled:opacity-40"
            >
              {genre.title}
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

        <Button
          aria-label="Next step"
          onPress={handleNextPage}
          isDisabled={isPending}
          className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-yellow-400 px-5 py-2 text-yellow-400 transition-all duration-100 hover:bg-yellow-400/15 active:bg-yellow-400 active:text-black data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40"
        >
          <span className="text-sm font-sans">
            {isPending ? "Saving..." : "Next"}
          </span>
          <ChevronRight size={18} />
        </Button>
      </section>
    </main>
  );
}
