import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from '../app/hooks';
import * as citiesActions from '../features/cities';
import { fetchCities } from '../services/api';


export default function addCityForm() {
  const dispatch = useAppDispatch();
  const [newCityName, setNewCityName] = useState('');

  async function fetchCity(newCityName: string) {
    const response = await fetchCities(newCityName, false);

    if (response.ok) {
      const data = await response.json();
      dispatch(citiesActions.add(data));
      return data;
    } else {
      dispatch(citiesActions.setIsError(true));
    }
  }

  const handleAddCity = async (event: React.FormEvent) => {
    event.preventDefault();
    fetchCity(newCityName);
    setNewCityName('');
  };

  return (
    <form onSubmit={handleAddCity}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '24px',
        }}
      >
        <TextField
          label="City Name"
          required
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </Stack>
    </form>
  )
}
