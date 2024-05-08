import {createSlice} from '@reduxjs/toolkit';

const RememberState = createSlice({
  name: 'RememberState',
  initialState: {
    isDonor: 'ok donero form the remember state',
    rememberMe: true
  },
  reducers: {
    dispatchIsDonor(state, action) {
      state.isDonor = action.payload;
    },
    dispatchIsRemember(state, action) {
        console.log('value from state.isRemember');
      console.log("check state",state.rememberMe);

      state.rememberMe = action.payload;
    }
  },
});

export const {dispatchIsDonor, dispatchIsRemember} = RememberState.actions;
export default RememberState.reducer;

