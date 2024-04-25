import { makeRequest } from '../makeRequest';
import { API_ENDPOINTS } from '../Api';


export const getPatientBloodRequestList = async (token,params=null) => {
  const body = {
    blood_group:"B+",
    search:"Lahore"
  };
  const result = await makeRequest(
    API_ENDPOINTS.request_patient_list,
    'GET',
    null,
     token,
    params??body
  );

  if (!result) return false;

  console.log(result.data.requestData);
  return result.data;
};
