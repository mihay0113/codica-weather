import { City } from '../types';
import { Typography } from '@mui/material';

interface CityDetailProps {
  city: City;
}

const CityDetail = ({ city }: CityDetailProps) => {
  return (
    <>
      <Typography variant="h1">{city.name}</Typography>
      <Typography>{city.weather[0].main}</Typography>
      <Typography>{city.weather[0].description}</Typography>
      <Typography>Temperature: {city.main.temp} &#8451;</Typography>
      <Typography>Humidity: {city.main.humidity}%</Typography>
      <Typography>Pressure: {city.main.pressure} hPa</Typography>
    </>
  );
};

export default CityDetail;
