import { StarIcon } from "lucide-react";

export const generateStars = (length: number, total = 5) =>
  Array.from({ length: total }, (_, index) => (
    <StarIcon
      key={index}
      size={15}
      className={`${index < length ? "fill-yellow-400 text-yellow-400" : "min-w-3 h-auto text-yellow-400"}`}
    />
  ));
