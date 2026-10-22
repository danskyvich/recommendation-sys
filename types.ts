export type Genre = {
    id: number,
    name: string
}

export type Movie = { id: number; title: string; image: string, rating: number, producer: string, time: string, year: string, stars: string[], genre: string, description: string };
export type MovieMinimum = { id: number, image: string, title: string, year: string, genre: string };
