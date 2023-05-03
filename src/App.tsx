import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useState } from 'react';
import CityCard from './components/CityCard';
import CityDetail from './components/CityDetail';
import ErrorModal from './components/ErrorModal';
import { City } from './types';
import { useAppDispatch } from './app/hooks';
import * as citiesActions from './features/cities';
import { fetchCities } from './services/api';

function App() {
  const dispatch = useAppDispatch();

  const cities = useSelector((state: RootState) => state.cities);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [newCityName, setNewCityName] = useState('');

  const [isError, setIsError] = useState(false);

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '30%',
    width: 'min-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  async function fetchCity(newCityName: string) {
    const response = await fetchCities(newCityName);

    if (response.ok) {
      const data = await response.json();
      dispatch(citiesActions.add(data));
      return data;
    } else {
      setIsError(true);
    }
  }

  const handleAddCity = async (event: React.FormEvent) => {
    event.preventDefault();
    fetchCity(newCityName);
    setNewCityName('');
  };

  const handleCityCardClick = (city: City) => {
    setSelectedCity(city);
  };

  const handleCloseModal = () => {
    setSelectedCity(null);
    setIsError(false);
  };

  return (
    <Box sx={{ margin: '0 24px' }}>
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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {Object.values(cities.cities).map((city) => (
          <Box key={city.id} onClick={() => handleCityCardClick(city)}>
            <CityCard city={city} />
          </Box>
        ))}
      </Box>
      <Modal open={selectedCity !== null || isError} onClose={handleCloseModal}>
        <Box sx={style}>
          {selectedCity !== null && <CityDetail city={selectedCity} />}
          {isError && <ErrorModal />}
        </Box>
      </Modal>
    </Box>
  );
}

export default App;
