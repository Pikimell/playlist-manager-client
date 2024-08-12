import { createSlice } from '@reduxjs/toolkit';
import { fetchPlayList } from './operations.js';
const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const templateSlice = createSlice({
  name: 'spotify',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchPlayList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchPlayList.pending, handlePending)
      .addCase(fetchPlayList.rejected, handleRejected);
  },
});

export default templateSlice.reducer;

function handlePending(state, action) {}
function handleRejected(state, action) {}
