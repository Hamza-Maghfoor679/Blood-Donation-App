import { createSlice } from '@reduxjs/toolkit';

const rememberSlice = createSlice({
  name: 'remember',
  initialState: {
    rememberMe: false, // Initial state
  },
  reducers: {
    setRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
  },
});

export const { setRememberMe } = rememberSlice.actions;
export default rememberSlice.reducer;
