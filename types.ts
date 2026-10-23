export type Genre = {
    id: number,
    name: string
}

export type Movie = { id: number; title: string; image: string, rating: number, producer: string, time: string, year: string, stars: string[], genre: string, description: string };
export type MovieMinimum = { id: number, image: string, title: string, year: string, genre: string };

export type MovieItem = 
{
    poster_path: string | null,
    genre_ids: Array<number>,
    id: number,
    original_language: string,
    title: string,
    overview: string,
    release_date: string,
    popularity: number,
    vote_count: number,
    vote_average: number,
}
