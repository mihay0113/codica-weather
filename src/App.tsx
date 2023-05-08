import { Box, Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useState } from 'react';
import CityCard from './components/CityCard';
import CityDetail from './components/CityDetail';
import ErrorModal from './components/ErrorModal';
import { City } from './types';
import { useAppDispatch } from './app/hooks';
import * as citiesActions from './features/cities';
import AddCityForm from './components/AddCityForm';

function App() {
  const dispatch = useAppDispatch();
  const { cities, isError } = useSelector((state: RootState) => state.cities);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

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

  const handleCityCardClick = (city: City) => {
    setSelectedCity(city);
  };

  const handleCloseModal = () => {
    setSelectedCity(null);
    dispatch(citiesActions.setIsError(false));
  };

  return (
    <Box sx={{ margin: '0 24px' }}>
      <AddCityForm />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {Object.values(cities).map((city) => (
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
