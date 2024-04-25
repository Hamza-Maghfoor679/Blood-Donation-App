import { makeRequest } from '../makeRequest';
import { API_ENDPOINTS } from '../Api';


export const getPatientBloodRequest = async (token) => {
  console.log(token)
  const result = await makeRequest(API_ENDPOINTS.patient_blood_request, 'GET', null, token);

  if (!result) return false;

  console.log(result.data);
  return result.data;           
};
