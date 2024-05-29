import { useNavigate } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Country } from "../api/dto/Country";

interface Props {
    country: Country;
}

const CountryCard = ({ country }: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/country/${country.name.common}`);
    };

    return (
        <Card sx={{ maxWidth: 345, height: '100%' }}>
            <CardActionArea sx={{ height: '100%' }} onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={country.flags.png}
                    alt={`${country.name.common} flag`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {country.name.official}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Capital: {country.capital}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Population: {country.population}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CountryCard;
