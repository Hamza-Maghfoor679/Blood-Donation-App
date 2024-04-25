import axios from 'axios';
import {API_ENDPOINTS} from '../Api';
import {makeRequest} from '../makeRequest';

export const viewPatientRequest = async (token, id) => {

  const responseData = await makeRequest(
    API_ENDPOINTS.view_patient_request,
    'get',
    null,  
    token,
    { id: id }
  );

  if (responseData) {
    console.log('Response:', responseData);
    return responseData.data.requestData;
  } else {
    console.error('Error making the request.');
  }
};
