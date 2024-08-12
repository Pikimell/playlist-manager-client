import { configureStore } from '@reduxjs/toolkit';
import spotifyReducer from './spotify/spotifySlice';

export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
  },
});
