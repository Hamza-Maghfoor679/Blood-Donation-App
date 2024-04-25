import {useSelector} from 'react-redux';

export const RefreshUserData = async () => {
  const userData = useSelector(state => state.user);

  {
    const isVerified = await veryfyOtp(userData.phone_no);
    if (isVerified) {
      const {is_verified, token, userData} = isVerified;
      if (is_verified === true) {
        // If user is verified
        console.log('you are registered user');
        dispatch(
          setUserData({
            ...userData,
            token: token,
            is_verified: true,
            isLoggedin: true,
          }),
        );
      }
    }
  }
};
