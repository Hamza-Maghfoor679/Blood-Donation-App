import {createSlice} from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    isDonor: 'Donor',
  },
  reducers: {
    dispatchIsDonor(state, action) {
      state.isDonor = action.payload;
    },
  },
});

export const {dispatchIsDonor} = todosSlice.actions;
export default todosSlice.reducer;
