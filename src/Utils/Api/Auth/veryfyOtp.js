import axios from 'axios';

export const veryfyOtp = async (phone) => {
  try {
    const response = await axios.post(
      '/auth/verify_otp',
      {
        phone_no: phone,
   
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.data.success) {
      // If OTP verification is successful
      const {data} = response.data;
      const {token, userData} = data;

      if (data.is_verified === 1) {
        // If user is verified
        
        return {is_verified: true, token, userData};
      } else {
        // If user is not verified yet
        return {is_verified: false, token, userData};
      }
    } else {
      // If OTP verification fails
      console.log('Invalid code, please try again or resend code');
      return false;
    }
  } catch (error) {
    // Log any errors that occur during OTP verification
    console.log(error);
    return false;
  }
};
