import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

function usePhoneAuthentication() {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  function onAuthStateChanged(user) {
    if (user) {
      // Handle successful authentication
      console.log('User signed in:', user);
    } else {
      // Handle sign-out
      console.log('User signed out');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // Unsubscribe on unmount
  }, []);

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('confirmation', JSON.stringify(confirmation, null, 2));
    setConfirm(confirmation);
  }

  async function confirmVerificationCode() {
    console.log('confirmVerificationCode code: ', code);

    try {
      const response = await confirm.confirm(code);
      console.log('response', response);
      console.log('User signed in successfully');
      return true;
    } catch (error) {
      console.error('Invalid code.', error);
      return false;
    }
  }

  return {
    signInWithPhoneNumber,
    confirmVerificationCode,
    code,
    setCode,
  };
}

export default usePhoneAuthentication;
