// userActions.js

import { UPDATE_USER_DATA } from "./Constants";

export const updateUserData = (userData) => {
    return {
      type: UPDATE_USER_DATA,
      payload: userData,
    };
  };
  