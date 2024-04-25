import {createSlice} from '@reduxjs/toolkit';

const ApiResponses = createSlice({
  name: 'ApiResponses',
  initialState: {
    data: null,
    PatientBloodRequest:null,
    NearbyDonor:null,
   
  },
  reducers: {
    setApiResponses(state, action) {
      return {...state, ...action.payload};
    },
  },
});

export const {setApiResponses} = ApiResponses.actions;
export default ApiResponses.reducer;
