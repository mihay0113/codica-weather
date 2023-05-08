import { fetchCities } from '../services/api';
import { City } from '../types';
import { Typography } from '@mui/material';
// import { useAppDispatch } from '../app/hooks';
// import * as citiesActions from '../features/cities';
import { useEffect, useState } from 'react';

interface CityDetailProps {
  city: City;
}

const CityDetail = ({ city }: CityDetailProps) => {
  // const dispatch = useAppDispatch();
  const [details, setDetails] = useState([]);

  async function fetchCityDetails(newCityName: string) {
    const response = await fetchCities(newCityName, true);

    const data = await response.json();
    // dispatch(citiesActions.add(data));
    console.log(data)
    return data;

  }

  useEffect(() => {
    fetchCityDetails(city.name);
  }, [])

  return (
    <>
      <Typography variant="h1">{city.name}</Typography>
      <Typography>{city.weather[0].main}</Typography>
      <Typography>{city.weather[0].description}</Typography>
      <Typography>Temperature: {city.main.temp.toFixed(1)} &#8451;</Typography>
      <Typography>Humidity: {city.main.humidity}%</Typography>
      <Typography>Pressure: {city.main.pressure} hPa</Typography>
    </>
  );
};

export default CityDetail;
