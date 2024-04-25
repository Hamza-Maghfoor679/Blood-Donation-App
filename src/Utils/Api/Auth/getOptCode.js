import axios from 'axios';
import { API_ENDPOINTS } from '../Api';


export const getOptCode = async (phone) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.IS_EXISTS,
      {
        phone_no: phone,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // console.log('response');
    // console.log(response.data);
    // is user
    if (response.data.success === true) {
      return response.data.data.pin_code;
    } else {
      console.log('user not exist');
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
