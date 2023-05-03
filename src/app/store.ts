import { configureStore } from '@reduxjs/toolkit';
import cities from '../features/cities';

const store = configureStore({
  reducer: {
    cities: cities,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;