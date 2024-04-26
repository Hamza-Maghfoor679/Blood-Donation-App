import {
  View,
  Image,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';
import { isUserExist } from '../../Utils/Api/Auth/isUserExist';

import Button from '../../CustomComponent/Button';
import BackButton from '../../CustomComponent/BackButton';
import InputField, {CustomInput} from '../../CustomComponent/InputField';
import {StyleSheet} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {getOptCode} from '../../Utils/Api/Auth/getOptCode';
import {veryfyOtp} from '../../Utils/Api/Auth/veryfyOtp';
import {useSelector, useDispatch} from 'react-redux';
import {setUserData, setUserState} from '../../redux/UserSlicee';
import Modals from '../../CustomComponent/Modal';
import {Alert} from 'react-native';
import usePhoneAuthentication from '../../Utils/Hooks/usePhoneAuthentication';
import {normalizePhoneNumber} from '../../Utils/normalizePhoneNumber';
import {setChecks} from '../../redux/Checks';
import Toast from 'react-native-toast-message';

const CELL_COUNT = 6;

const OtpScreen = ({navigation, route}) => {

  const { otpMessage } = route.params;

  console.log("otpMessage", otpMessage);

  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: `Your Otp is ${otpMessage}`,
      visibilityTime: 10000,
      autoHide: true,
    });
  }, []);

  const dispatch = useDispatch();
  const checks = useSelector(state => state.checks);
  const userData = useSelector(state => state.user);
  const userName = userData.name;

  const [userOptInput, setUserOptInput] = useState(1234);
  const [userOriginalOpt, setUserOriginalOpt] = useState('');

  const ref = useBlurOnFulfill({value: userOptInput, cellCount: CELL_COUNT});

  const {signInWithPhoneNumber, confirmVerificationCode, code, setCode} =
    usePhoneAuthentication();

  const [props, getCellOnLayoutHandle] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const [isLoading, setIsLoading] = useState(false);

  //   otp

  // useeffect for set otp to user redux
  // useEffect(() => {
  //   console.log('pin_code in redux');
  //   console.log(userOptInput);
  //   dispatch(setUserData({pin_code: userOptInput}));
  // }, [userOptInput]);

  // resend otp
  const fireBaseNotImplemented = () => {
    console.warn('please buy firebase account before making resend request ');
  };
  const ResendOtp = async () => {
    console.log('resend otp');

    showAlert(
      'Code Sent',
      'Code sent to your phone number',
      fireBaseNotImplemented,
    );
    return;
    showAlert('Code Sent', 'Code sent to your phone number', sendOtp);
  };

  const sendOtp = async () => {
    const normalizedPhone = normalizePhoneNumber(userData.phone_no);
    console.log('normalizedPhone', normalizedPhone);

    try {
      setIsLoading(true);

      await signInWithPhoneNumber(normalizedPhone);
      setIsLoading(false);
    } catch (e) {
      console.warn('error', e.Error);
      setIsLoading(false);
    }
  };


  const CheckOtp = async () => {
    // setCode("111111")
    // setIsLoading(true); 

    if (true) {
      console.log(userData.phone_no);

      const isVerified = await veryfyOtp(userData.phone_no);
      // const isVerified = true;
      console.log("--------isVerified");
      // console.log( isVerified);
      setIsLoading(false); 
      // console.log('firebaseOptVerified', firebaseOptVerified);
      console.log("--------------------------------");
      console.log(isVerified.is_verified);
      if (isVerified !== null) {
        console.log("insdide verification");
        
        let _userData = isVerified?.userData;
        const token = isVerified.token;
        const is_verified = isVerified.is_verified;

        if (is_verified === true) {
          console.log('you are registered user');
          dispatch(
            setUserState({
              ..._userData,
              token: token,
              is_verified: true,
              isLoggedin: true,
            }),
          );
         

          dispatch(setChecks({InitialDataRender: true}));
          navigation.replace('DrawerStack');
        } else {
          console.log('you are not registered user');
          dispatch(
            setUserData({
              ...userData,
              name: userName,
              token: token,
              is_verified: false,
              isLoggedin: false,
            }),
          );
          navigation.navigate('ConnectingDonor');
        }
      } else {
        console.log('OTP not verified');
        console.warn('Invalid code, please try again or resend code');
      }
    }
    // if (code === otpMessage) {
    //   navigation.navigate("ConnectingDonor")
    // } else {
    //   Toast.show({
    //     type: "error",
    //     text1: "Invalid code, please try again or resend code",
    //     visibilityTime: 3000,
    //     autoHide: true
    //   })
    // }
    setCode("")
  };

  return (
    <ScrollView
      style={{
        height: Theme.hp('100%'),
        width: Theme.wp('100%'),
        backgroundColor: 'white',
      }}>
      <StatusBar backgroundColor={'white'} />

      <BackButton navigation={() => navigation.goBack()} />
      <View
        style={{
          //   height: Theme.hp('15%'),
          alignItems: 'center',
          width: Theme.wp('80%'),

          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        <Title
          lable={'OTP Verification'}
          fsize={20}
          textAlign={'center'}
          fweight={'bold'}
          col={'#000000'}
        />
        {/* <Title
          lable={
            'Thank you for joining our Blood Donation App! With your support, we can connect donors and recipients, Spreading hope and giving the gift of life.'
          }
          fsize={14}
          textAlign={'center'}
          fweight={'400'}
          col={Theme.txtgrey}
        /> */}
      </View>
      <View
        style={{
          height: Theme.hp('40%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            height: Theme.hp('35%'),
            width: Theme.wp('60%'),
          }}
          source={require('../../Asset/Welcome1.png')}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          height: Theme.hp('35%'),
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        {/* otp Verification */}
        <View
          style={{
            height: Theme.hp('17%'),

            width: Theme.wp('90%'),
            justifyContent: 'space-between',
          }}>
          <Text style={styles.title}>Verification</Text>
          <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandle(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          <Pressable
            style={{
              marginTop: Theme.hp('3%'),
              height: Theme.hp('5%'),
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => ResendOtp()}
            width={Theme.wp('80%')}>
            <Text style={{color: 'black'}}>
              Did not receive code?{' '}
              <Text style={{color: Theme.themecol}}>Resend</Text>
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            height: Theme.hp('28%'),

            justifyContent: 'center',
          }}>
          <Button
            onPress={CheckOtp}
            width={Theme.wp('80%')}
            buttonTitle={'Continue'}
          />
        </View>
      </View>

      <Modals loader={isLoading} loaderIndicator={true} />
    </ScrollView>
  );
};

const showAlert = (Title, Message, ok) => {
  Alert.alert(
    Title ?? 'Title',
    Message ?? 'Message',
    [
      {
        text: 'OK',
        onPress: () => ok(),
      },
    ],
    {cancelable: true},
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: Theme.txtLarge},
  codeFieldRoot: {marginTop: 20, width: Theme.wp('75%'), alignSelf: 'center'},
  cell: {
    width: Theme.wp('10%'),
    height: Theme.wp('10%'),
    // padding: Theme.wp('1.5%'),
    borderRadius: Theme.wp('1%'),
    lineHeight: 38,
    fontSize: Theme.txtMediumR,
    borderWidth: Theme.wp('0.1%'),
    borderColor: '#8D8D8D',
    textAlign: 'center',
    color: Theme.txtblack
  },
  focusCell: {
    borderColor: '#000',
  },
});
