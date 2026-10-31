// CHECK if the rating input is valid
export const isValidRating = (rating: number) =>
    typeof rating === "number" && Number.isInteger(rating) && rating >= 1 && rating <= 10;
