import { Country } from "../api/dto/Country";
import { useMemo } from "react";
import CountryCard from "./CountryCard";
import { Grid, Box } from "@mui/material";

interface Props {
    countries: Country[];
}

const CountryList = ({ countries }: Props) => {
    const memoCountries = useMemo(() => countries, [countries]);

    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Grid container spacing={3}>
                {memoCountries.map((country) => (
                    <Grid item xs={12} sm={6} md={4} key={country.name.common}>
                        <CountryCard country={country} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CountryList;
