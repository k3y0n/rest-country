export interface Country<T = Record<string, string>> {
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    cca3: string;
    cioc: string;
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: T;
    borders: string[];
    area: number;
    flag: string;
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
    population: number;
    continents: string[];
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    coatOfArms: {
        png: string;
        svg: string;
    };
}
