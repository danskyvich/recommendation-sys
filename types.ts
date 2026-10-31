export type Genre = {
    id: number,
    title: string
}

type ProductionCompanies = {
    id: number,
    logo_path: string | null,
    name: string,
    origin_country: string
}

export type Rating = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type TMDBImageSizes = "w185" | "w500" | "original";

// MOVIE TYPES
// carousels
export type MovieItem = {
    id: number,
    title: string,
    poster_path: string | null,
    release_date: string | null,
    vote_average: number,
    vote_count: number,
    popularity: number,
    overview: string,
    original_language: string,
    genres: string[],
    production_companies: ProductionCompanies[],
}

// movie_modal
export type MovieSummary = MovieItem & {
    runtime: number | null,
    tagline: string | null,
}

// movie_page
export type MovieFull = MovieSummary & {
    adult: boolean,
    origin_country: string[],
    homepage: string | null,
    budget: number,
    revenue: number,
    production_companies: ProductionCompanies[],
    production_countries: string[],
    
}

export type AggregatedGenres = Omit<MovieItem, 'genres'> & {
    rn: string,
    genres_id: number,
    genres_title: string,
}

//! the structure of the movie the TMDB sends 
export type TMDBSeedScript = Omit<MovieFull, 'genres' | 'production_countries'> & {
    genres: { id: number, name: string }[],
    production_countries: { iso_3166_1: string, name: string}[],
}

export const FEATURED = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
    "War",
  ];

