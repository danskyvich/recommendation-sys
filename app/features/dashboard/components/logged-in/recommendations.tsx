import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { faker } from "@faker-js/faker";
import Image from "next/image";

export default function Recommendations() {
  const films = Array.from({ length: 20 }, (_, index) => ({
    image: faker.image.urlPicsumPhotos(),
    name: faker.lorem.words(3),
    id: index + 1,
    alt: faker.lorem.words(3),
  }));
  return (
    <div className="flex flex-col w-full h-fit px-5">
      <Carousel
        orientation="horizontal"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="flex -ml-5 w-full">
          {films.map((item) => (
            <CarouselItem key={item.id} className="pl-5 basis-1/4 md:basis-1/5 lg:basis-1/7">
              <div className="relative h-65 cursor-pointer overflow-hidden border border-white/35">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
