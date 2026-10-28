export type Genre = {
    id: number,
    title: string
}

export type Movie = { id: number; title: string; image: string, rating: number, producer: string, time: string, year: string, stars: string[], genre: string, description: string };
export type MovieMinimum = { id: number, image: string, title: string, year: string, genre: string };

export type MovieItem = 
{
    poster_path: string | null,
    id: number,
    language: string,
    title: string,
    overview: string,
    release_date: string,
    popularity: number,
    vote_count: number,
    vote_average: number,
    genres: string[],
}

export type AggregatedGenres = Omit<MovieItem, 'genre_ids'> & {
    rn: string,
    genres_id: number,
    genres_title: string,
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

