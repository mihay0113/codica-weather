import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../types';

type CitiesState = {
  cities: {
    [key: string]: City;
  };
  loading: boolean;
  error: string;
};

const initialState: CitiesState = {
  cities: {},
  loading: false,
  error: '',
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
  },
});

export default citiesSlice.reducer;
export const { add, remove, clear } = citiesSlice.actions;
