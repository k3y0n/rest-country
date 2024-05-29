import axios from "axios";
import { Country } from "./dto/Country";

const api = axios.create({
    baseURL: "https://restcountries.com/v3.1/",
});

const getAllCountry = async (): Promise<Country[]> => {
    const response = await api.get("all");

    return await response.data;
};

const getCountryByName = async (name: string): Promise<Country> => {
    const response = await api.get(`name/${name}`);

    const countries = await response.data;

    if (countries.length > 0) {
        return countries[0];
    } else {
        throw new Error("Country not found");
    }
};

const getCountryByCode = async (code: string): Promise<Country> => {
    const response = await api.get(`alpha/${code}`);
    const countries = await response.data;

    if (countries.length > 0) {
        return countries[0];
    } else {
        throw new Error("Country not found");
    }
};

export { getAllCountry, getCountryByName, getCountryByCode };
