import axios from 'axios';




export const makeRequest = async (url, method = "GET", data = null, token, params = null) => {
  try {
    console.log("token", token);
    const response = await axios({
      url,
      method,
      data: data,
      params: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response.status)
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log("error.response");
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log("error.request");
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return false;
  }
};
