import { Movie } from "@/types";
import { faker } from "@faker-js/faker";

// general placeholder array for movie carousels
export const placeholderMovies = (seed: string, count = 12): Movie[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: faker.lorem.words(3),
    image: `https://picsum.photos/seed/${seed}-${i + 1}/300/450`,
    rating: faker.number.int({ min: 1, max: 5}),
    producer: faker.person.firstName() + " " + faker.person.lastName(),
    stars: Array.from({ length: 3}, (_, index) => faker.person.firstName() + " " + faker.person.lastName() + ", "),
    year: "2026",
    time: "1H 07m",
    genre: faker.lorem.word(1),
    description: faker.lorem.paragraphs(1),
  }));

// for genres
export const GENRES = ["Action", "Comedy", "Drama", "Sci-Fi"];
export const PAGE_SIZE = 20;
