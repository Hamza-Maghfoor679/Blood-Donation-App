import {createSlice} from '@reduxjs/toolkit';

const Checks = createSlice({
  name: 'Checks',
  initialState: {
    isEditComplete: false,
    requestAdded:false,
    InitialDataRender:false,
    userType:'',
  },
  reducers: {
    setChecks(state, action) {
      return {...state, ...action.payload};
    },
  },
});


export const {setChecks} = Checks.actions;
export default Checks.reducer;
