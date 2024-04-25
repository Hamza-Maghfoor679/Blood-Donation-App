import { API_ENDPOINTS } from '../Api';
import { makeRequest } from '../makeRequest';


export const  getNear_by_donor   = async (token,params=null) => {

  const result = await makeRequest(
    API_ENDPOINTS.near_by_donor,
    'GET',
    null,
     token,
    params
  );

  if (!result) return false;

  return result.data;
};
