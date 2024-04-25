// userReducer.js
import { UPDATE_USER_DATA } from "./Constants";
const initialState = {
    userData: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_USER_DATA:
        return {
          ...state,
          userData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  