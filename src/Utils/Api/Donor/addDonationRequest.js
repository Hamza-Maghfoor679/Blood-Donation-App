import { API_ENDPOINTS } from '../Api';
import {makeRequest} from '../makeRequest';

export const addDonationRequest = async (token, data = null) => {
  const result = await makeRequest(
    API_ENDPOINTS.add_donate_date,
    'Post',
    data,
    token,
  );

  if (!result) return false;

  return result;
};
