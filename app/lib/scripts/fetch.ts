import { MovieFull, TMDBSeedScript } from "@/types";
import { neon } from "@neondatabase/serverless"

const tmdb_access_token = process.env.TMDB_ACCESS_TOKEN;
const sql = neon(process.env.DATABASE_URL!);

//! This file must only be run IF data was somehow lost or deleted.
//! Run "npx tsx --env-file=[env_path here] [fetch_file_path]" (use absolute path)

//! DO NOT EDIT THIS
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

// fetch movie data from diff endpoints
async function fetchTMDBData() {
    const genreData = await fetchApi("genre/movie/list");
    await insertGenres(genreData.genres);

    const ids = new Set<number>();

    // fetch trending page
    for (let page = 1; page <= 5; page++) {
        const popular = await fetchApi(`movie/popular?page=${page}`);
        popular.results.forEach((m : {id: number}) => {ids.add(m.id)});
    }

    // fetch toprated
    const topRated = await fetchApi("movie/top_rated");
    topRated.results.forEach((m: {id: number}) => ids.add(m.id));

    for (const id of ids) {
        try {
            const details = await fetchApi(`movie/${id}`);
            await upsertMovie(details);
        } catch (err) {
            console.error(`Failed on movies ${id}`, err);
        }
        
    }
}

// if you altered the neon database, modify this function to adjust the sql
// queries.
async function upsertMovie(movie: TMDBSeedScript) {

    // INSERT into movies
    await sql `
        INSERT INTO movies (
            id, title, overview, release_date, poster_path, popularity,
            language, vote_average, vote_count,
            adult, origin_country, runtime, homepage, tagline, budget, revenue
        ) VALUES (
            ${movie.id}, ${movie.title}, ${movie.overview}, ${movie.release_date || null},
            ${movie.poster_path}, ${movie.popularity}, ${movie.original_language},
            ${movie.vote_average}, ${movie.vote_count},
            ${movie.adult}, ${movie.origin_country ?? []}, ${movie.runtime || null},
            ${movie.homepage || null}, ${movie.tagline || null},
            ${movie.budget ?? 0}, ${movie.revenue ?? 0}
        )
        ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            overview = EXCLUDED.overview,
            release_date = EXCLUDED.release_date,
            poster_path = EXCLUDED.poster_path,
            popularity = EXCLUDED.popularity,
            language = EXCLUDED.language,
            vote_average = EXCLUDED.vote_average,
            vote_count = EXCLUDED.vote_count,
            adult = EXCLUDED.adult,
            origin_country = EXCLUDED.origin_country,
            runtime = EXCLUDED.runtime,
            homepage = EXCLUDED.homepage,
            tagline = EXCLUDED.tagline,
            budget = EXCLUDED.budget,
            revenue = EXCLUDED.revenue
    `;

    // INSERT into movie_genre_join
    for (const genre of movie.genres ?? []) {
        await sql `
            INSERT INTO movie_genre_join (movie_id, genre_id)
            VALUES (${movie.id}, ${genre.id}) ON CONFLICT DO NOTHING
        `;
    }

    // INSERT into production_companies
    for (const production_company of movie.production_companies ?? []) {
        await sql `
            INSERT INTO production_companies (id, name, logo_path, origin_country)
            VALUES (${production_company.id}, ${production_company.name}, ${production_company.logo_path}, ${production_company.origin_country || null}) ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                logo_path = EXCLUDED.logo_path,
                origin_country = EXCLUDED.origin_country
        `;

        await sql `
            INSERT INTO movie_production_companies (movie_id, company_id)
            VALUES (${movie.id}, ${production_company.id}) 
            ON CONFLICT DO NOTHING
        `;
    }

    // INSERT into movie_production_countries
    for (const production_country of movie.production_countries ?? []) {
        await sql `
            INSERT INTO movie_production_countries (country_code, movie_id) 
            VALUES (${production_country.iso_3166_1}, ${movie.id})
            ON CONFLICT DO NOTHING
        `
    }
} 

async function insertGenres(data: Array<{ id: number, name: string}>) {
    for (const genre of data) {
        await sql `INSERT INTO genres (id, title) VALUES (${genre.id}, ${genre.name}) ON CONFLICT DO NOTHING`;
    }
}

fetchTMDBData().catch((error) => {
    console.error("Seeding failed", error);
    process.exit(1);
});
