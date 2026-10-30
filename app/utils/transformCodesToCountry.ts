export const transformCodesToCountry = (code: string): string | undefined => {
    const regionNames = new Intl.DisplayNames(['en'], { type: "region" });
    return regionNames.of(code.toUpperCase());
}