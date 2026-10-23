import { MovieItem } from "@/types";
import { neon } from "@neondatabase/serverless"

const tmdb_access_token = process.env.TMDB_ACCESS_TOKEN;
const sql = neon(process.env.DATABASE_URL!);

async function fetchTMDBData() {
    const genreData = await fetchApi("genre/movie/list");
    await insertGenres(genreData.genres);

    // loop from pages 1 to 5
    for (let x = 1; x <= 5; x++) {
        const popularMoviesData = await fetchApi(`movie/popular?page=${x}`);
        await insertMovies(popularMoviesData.results);
    } 

    const topRatedData = await fetchApi(`movie/top_rated`);
    await insertMovies(topRatedData.results);
}

async function fetchApi(url: string) {
    if (!tmdb_access_token) {
        throw new Error("The tmdb token is null or undefined");
    }
    const response = await fetch("https://api.themoviedb.org/3/" + url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${tmdb_access_token}`,
            "Accept": 'application/json' 
        }
    });

    if (!response.ok) throw new Error(`Error ${response.status}: Failed fetching data from ${url} TMDB`);
    return response.json();
}

async function insertGenres(data: Array<{ id: number, name: string}>) {
    for (const genre of data) {
        await sql `INSERT INTO genres (id, title) VALUES (${genre.id}, ${genre.name}) ON CONFLICT DO NOTHING`;
    }
}

async function insertMovies(data: MovieItem[]) {
    for (const movie of data) {
        let formattedReleaseDate;
        if (!movie.release_date) {
            formattedReleaseDate = null;
        } else {
            formattedReleaseDate = movie.release_date;
        }
        await sql `INSERT INTO movies (id, title, overview, release_date, poster_path, popularity, language, vote_average, vote_count) VALUES (${movie.id}, ${movie.title}, ${movie.overview}, ${formattedReleaseDate}, ${movie.poster_path}, ${movie.popularity}, ${movie.original_language}, ${movie.vote_average}, ${movie.vote_count}) ON CONFLICT DO NOTHING`;
        for (const genre of movie.genre_ids) {
            await sql `INSERT INTO movie_genre_join (movie_id, genre_id) VALUES (${movie.id}, ${genre}) ON CONFLICT DO NOTHING`
        }
    }
} 

fetchTMDBData().catch((error) => {
    console.error("Seeding failed", error);
    process.exit(1);
});
