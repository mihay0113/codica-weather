import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../types';

type CitiesState = {
  cities: {
    [key: string]: City;
  };
  loading: boolean;
  isError: boolean;
};

const initialState: CitiesState = {
  cities: {},
  loading: false,
  isError: false,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<City>) => {
      state.cities[action.payload.name] = action.payload;
    },
    remove: (state, action: PayloadAction<string>) => {
      delete state.cities[action.payload];
    },
    clear: (state) => {
      state.cities = {};
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    }
  },
});

export default citiesSlice.reducer;
export const { add, remove, clear, setIsError } = citiesSlice.actions;
