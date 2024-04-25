import axios from 'axios';
import { API_ENDPOINTS } from '../Api';


export const createOrUpdatePatient = async (
  {
    user_id = '', no_of_blood = '', blood_group = '', phone_no = '', location = '', latitude = '',request_id = null, longitude = '', date = '',note=''
  },
  token
) => {
  try {
    console.log('token in api', token);
    // console.log('data in api', bloodRequest);
    const response = await axios.post(
      API_ENDPOINTS.PATIENT_CREATE_OR_UPDATE,
      {
        request_id : request_id,
        user_id: user_id,
        no_of_blood: Number(no_of_blood), // convert to number
        blood_group: blood_group,
        phone_no: phone_no,
        location: location,
        latitude: latitude,
        longitude: longitude,
        note: note,
        date: `${date} 00:00:00`, // add time to date
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Response:', response);

    if (response.data.success) {
      console.log('Patient registered successfully!');
      return true;
    } else {
      console.error('Registration failed:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('Error during registration:', error.message);
    return false;
  }
};
