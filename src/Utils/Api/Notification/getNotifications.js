import { API_ENDPOINTS } from '../Api';
import { makeRequest } from '../makeRequest';


export const  getNotifications   = async (token,params=null) => {

  const result = await makeRequest(
    API_ENDPOINTS.notifications_list,
    'GET',
    null,
     token,
    params
  );

  if (!result) return false;

  return result.data;
};
