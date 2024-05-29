import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getCountryByName, getCountryByCode } from "../api";
import {
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Stack,
    Skeleton,
} from "@mui/material";

const Country = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();

    const { data: countryData, status: countryStatus } = useQuery({
        queryKey: ["country", name],
        queryFn: () => getCountryByName(name!),
    });

    const neighborQueries = useQueries({
        queries: (countryData?.borders ?? []).map((border) => ({
            queryKey: ["country", border],
            queryFn: () => getCountryByCode(border),
            enabled: !!countryData,
        })),
    });

    if (countryStatus === "pending") {
        return (
            <Container maxWidth="lg">
                <Skeleton variant="rectangular" width={"100%"} height={200} />
            </Container>
        );
    }

    if (countryStatus === "error") {
        return <p>Error :(</p>;
    }

    const handleNavigateBack = () => {
        navigate(-1);
    };

    const handleNavigateToNeighbor = async (neighbor: string) => {
        navigate(`/country/${neighbor}`);
    };

    return (
        <Container maxWidth="lg">
            <Button
                onClick={handleNavigateBack}
                variant="contained"
                sx={{ mt: 2, mb: 4 }}
            >
                Back
            </Button>

            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={countryData.flags.png}
                    alt={`${countryData.name.official} flag`}
                />
                <CardContent>
                    <Typography variant="h4" component="div">
                        {countryData.name.official}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Capital: {countryData.capital}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Population: {countryData.population.toLocaleString()}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={2}>
                        {neighborQueries.map((neighborQuery, index) => {
                            if (neighborQuery.isLoading) {
                                return (
                                    <Skeleton
                                        key={index}
                                        variant="rectangular"
                                        width={100}
                                        height={40}
                                    />
                                );
                            }
                            if (neighborQuery.isError || !neighborQuery.data) {
                                return (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        disabled
                                    >
                                        Error
                                    </Button>
                                );
                            }
                            return (
                                <Button
                                    key={neighborQuery.data.cca3}
                                    variant="outlined"
                                    onClick={() =>
                                        handleNavigateToNeighbor(
                                            neighborQuery.data.name.official,
                                        )
                                    }
                                >
                                    {neighborQuery.data.name.common}
                                </Button>
                            );
                        })}
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Country;
