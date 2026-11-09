"use server"

import { connection } from "next/server";
import { getGenresFromDatabase } from "../../queries";
import OnboardingPageOne from "@/app/features/onboarding/onboarding-page-1";

export default async function GenrePageFetch() {
    await connection();
    const response = await getGenresFromDatabase();

    return <OnboardingPageOne genres={response} />;
}