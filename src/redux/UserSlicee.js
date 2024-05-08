import {createSlice} from '@reduxjs/toolkit';
import {updateUserData} from './userAction';
import {registerUser} from '../Utils/Api/Auth/registerUser';
const initialState = {
  name: '',
  phone_no: '',
  blood_group: '',
  location: '',
  latitude: 0,
  longitude: 0,
  age: 0,
  disease: '',
  user_type: null,
  weight: 0,
  dob: null,
  profileImage: null,
  height: 0,
  medications: '',
  medical_condition: '',
  allergies_reaction: '',
  language: '',
  blood_donor: '',
  note: '',
  isLoggedin: false,
  pin_code: '',
  rememberme: false
};

const userSlicee = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState(state, action){
      return {...state, ...action.payload};
    },
    setUserData(state, action) {
      const updatedState = {...state, ...action.payload};
      Object.keys(updatedState).forEach((key) => {
        if (updatedState[key] === null) {
          updatedState[key] = initialState[key];
        }
      });
      return updatedState;
    },
    logoutUser(state) {
      return initialState;
    },
    async updateUserType(state, action) {
      try {
        const {pin_code, ...userDataWithoutPin} = state;
        const selectedOption = action.payload;
        const updatedUserType = selectedOption === 0 ? 'donor' : 'patient';

        console.log('Values from Redux slice:', userDataWithoutPin);

        const isRegistrationSuccessful = await registerUser({
          ...userDataWithoutPin,
          user_type: updatedUserType,
        });

        if (isRegistrationSuccessful) {
          console.log('Registration successful!');
        } else {
          console.log('Registration failed.');
        }

        return {...state, user_type: updatedUserType};
      } catch (error) {
        console.error('Error updating user type:', error);
        return state; // Return the original state in case of an error
      }
    },
  },
});

export default userSlicee.reducer;
export const {setUserData, logoutUser, setUserState,updateUserType} = userSlicee.actions;
