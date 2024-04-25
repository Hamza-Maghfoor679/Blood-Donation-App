import { API_ENDPOINTS } from "../Api";
import { makeRequest } from "../makeRequest";


export const getDonor_request_list = async (token,params=null) => {
  const body = {
    blood_group:"B+",
    search:"Lahore"
  };
  const result = await makeRequest(
    API_ENDPOINTS.donor_request_list,
    'GET',
    null,
     token,
    params??body
  );

  if (!result) return false;

  console.log(result.data);
  return result.data;
};
