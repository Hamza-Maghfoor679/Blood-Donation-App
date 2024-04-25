import React, {useState, useEffect} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';


function SampleFirebase({navigation}) {
  // If null, no SMS has been sent
  useEffect(()=>{
    console.log("initial render ")
  },[])
  const [state,setState] =  useState(5);

  useEffect(()=>{
    console.log("state render ")
  },[state])

  return (
    <View>
      <Text>how are you</Text>
      <Text>{state}</Text>
      <TouchableOpacity style={{padding:15}} onPress={()=>setState((prv)=>prv+5)}>
      <Text>Click to update</Text>
      </TouchableOpacity>
    </View>
  );
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('confirmation', JSON.stringify(confirmation, null, 2));
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const responce = await confirm.confirm(code);
      console.log('responce', responce);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+923038433329')}
      />
    );
  }

  return (
    <>
      <Button title="Toggle Confirm" onPress={() => setConfirm(!confirm)} />

      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Text>Enter the code from the SMS</Text>
      <Text>Enter the code from the SMS</Text>
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}

export default SampleFirebase;
