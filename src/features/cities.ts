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

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('cities');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

initialState.cities = loadFromLocalStorage();

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<City>) => {
      state.cities[action.payload.name] = action.payload;
      state.cities[action.payload.name].date = Date.now();
      localStorage.setItem('cities', JSON.stringify(state.cities));
    },
    remove: (state, action: PayloadAction<string>) => {
      delete state.cities[action.payload];
      localStorage.setItem('cities', JSON.stringify(state.cities));
    },
    clear: (state) => {
      state.cities = {};
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

export default citiesSlice.reducer;
export const { add, remove, clear, setIsError } = citiesSlice.actions;
