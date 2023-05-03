import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { City } from '../types';
import { useAppDispatch } from '../app/hooks';
import * as citiesActions from '../features/cities';
import { fetchCities } from '../services/api';

interface CityCardProps {
  city: City;
}

const CityCard = ({ city }: CityCardProps) => {
  const dispatch = useAppDispatch();

  async function updateCity(newCityName: string) {
    const response = await fetchCities(newCityName);
    const data = await response.json();
    console.log(data);
    dispatch(citiesActions.add(data));
    return data;
  }

  const handleUpdateWeather = (event: React.FormEvent, name: string) => {
    // dispatch(citiesActions.update(name));
    updateCity(name);
    event.stopPropagation();
  };

  const handleDeleteCity = (event: React.FormEvent, name: string) => {
    dispatch(citiesActions.remove(name));
    event.stopPropagation();
  };

  return (
    <Card sx={{ width: '200px' }}>
      <CardContent>
        <Typography variant="h5">{city.name}</Typography>
        <Typography variant="subtitle1">
          {city.weather[0].description}
        </Typography>
        <Typography variant="h4">{city.main.temp} ℃</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={(e) => handleUpdateWeather(e, city.name)}>
          <SyncIcon />
        </Button>
        <Button onClick={(e) => handleDeleteCity(e, city.name)}>
          <BackspaceIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default CityCard;
