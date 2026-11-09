"use server"

import { connection } from "next/server";
import OnboardingPageTwo from "@/app/features/onboarding/onboarding-page-2";
import { generateDiversifiedMoviesFromGenre } from "../../actions";
import { redirect } from "next/navigation";

export default async function FilmsPageFetch() {
  await connection();

  const response = await generateDiversifiedMoviesFromGenre();
  if (!response.success) { 
    redirect("/onboarding/genre-step");
  }
  return <OnboardingPageTwo films={response.response.displayBatch} />;
}
