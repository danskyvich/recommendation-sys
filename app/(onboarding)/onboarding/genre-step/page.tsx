"use server"

import { Suspense } from "react"
import GenrePageFetch from "./page-fetch"

export default async function GenrePage() {
    return (
        <Suspense fallback={null}>
            <GenrePageFetch/>
        </Suspense>
    )
}