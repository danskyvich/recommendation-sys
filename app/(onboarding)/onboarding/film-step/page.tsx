import { Suspense } from "react";
import FilmsPageFetch from "./page-fetch";

export default function FilmPage() {

    return <Suspense fallback={null}><FilmsPageFetch/></Suspense>
}