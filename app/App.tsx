import { useState } from "react";
import { Container, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAllCountry } from "./api";
import { ITEMS_PER_PAGE, options } from "./constants";
import {
    CountryList,
    CountryPagination,
    SelectCountry,
    SkeletonCountry,
} from "./shared";

function App() {
    const [page, setPage] = useState(1);
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    const { data: countries, status } = useQuery({
        queryKey: ["countries"],
        queryFn: getAllCountry,
    });

    const handleSelect = (value: string | null) => {
        setSelectedCountry(value ?? "");
        setPage(1);
    };

    const handleChange = (value: number) => {
        setPage(value);
    };

    if (status === "pending") {
        return <SkeletonCountry />;
    }

    if (status === "error") {
        return <p>Error :(</p>;
    }

    const filteredCountries = selectedCountry
        ? countries?.filter((country) =>
              country.region
                  .toLowerCase()
                  .includes(selectedCountry.toLowerCase()),
          )
        : countries;

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(
        startIndex + ITEMS_PER_PAGE,
        filteredCountries?.length ?? 0,
    );

    return (
        <Container maxWidth="lg">
            <SelectCountry
                selectedCountry={selectedCountry}
                options={options}
                onSelect={handleSelect}
            />
            <Stack direction="column" spacing={3}>
                {filteredCountries && (
                    <CountryList
                        countries={filteredCountries.slice(
                            startIndex,
                            endIndex,
                        )}
                    />
                )}
                <CountryPagination
                    count={Math.ceil(
                        (filteredCountries?.length ?? 0) / ITEMS_PER_PAGE,
                    )}
                    page={page}
                    onPageChange={handleChange}
                />
            </Stack>
        </Container>
    );
}

export default App;
