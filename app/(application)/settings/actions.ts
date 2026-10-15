"use server"

export async function retrieveGenres() {
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
    });

    if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`);
    const data = await res.json();
    return data.genres;
}