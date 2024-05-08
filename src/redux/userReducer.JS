import { UPDATE_USER_DATA, REMEMBER_ME } from './Constants';

const initialState = {
  userData: null,
  rememberMe: false, // Initial state for rememberMe
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case REMEMBER_ME:
      return {
        ...state,
        rememberMe: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
