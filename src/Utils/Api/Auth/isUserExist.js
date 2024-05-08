import axios from 'axios';

export const isUserExist = async (phone, opt) => {
  try {
    const response = await axios.post(
      '/auth/verify_otp',
      {
        phone_no: phone,
        pin_code: otp,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('response');
    console.log(response.data);

    // is user
    if (response.data.data.success === true) {
      return (UserVerification = {
        token: response.data.data.data.token,
        is_verified: response.data.data.data.user,
      });
    } else {
      console.log('user not exist');
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
