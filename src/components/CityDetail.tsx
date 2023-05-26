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
  const [details, setDetails] = useState({
    list: [{ dt_txt: '' }]
  });

  async function fetchCityDetails(newCityName: string) {
    const response = await fetchCities(newCityName, true);

    const data = await response.json();
    // dispatch(citiesActions.add(data));
    // console.log(data)
    setDetails(data);
  }

  useEffect(() => {
    fetchCityDetails(city.name);
  }, [])

  console.log(details);

  return (
    <>
      <Typography variant="h1">{city.name}</Typography>
      <Typography>{city.weather[0].main}</Typography>
      <Typography>{city.weather[0].description}</Typography>
      <Typography>Temperature: {city.main.temp.toFixed(1)} &#8451;</Typography>
      <Typography>Humidity: {city.main.humidity}%</Typography>
      <Typography>Pressure: {city.main.pressure} hPa</Typography>
      {Object.keys(details).length === 5 && details.list.map((hourly) => {
        <>
          <Typography>{hourly.dt_txt}1</Typography>
          <div style={{ border: '1px solid black', height: '50px', width: '200px' }}>
            <div style={{ height: '100%', width: `${20 / 50 * 100}%`, backgroundColor: '#fbff00' }}></div>
          </div >
        </>
      })}
    </>
  );
};

export default CityDetail;
