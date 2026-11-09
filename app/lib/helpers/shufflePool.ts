export function shuffleFilms<T>(items: readonly T[]): T[] {

    // fisher-hayes shuffling algorithm
    const copiedArray = [...items];
    for (let x = copiedArray.length - 1; x > 0; x--) {
        const randomIndex = Math.floor(Math.random() * (x + 1));
        [copiedArray[x], copiedArray[randomIndex]] = [copiedArray[randomIndex], copiedArray[x]];
    };
    return copiedArray;
}