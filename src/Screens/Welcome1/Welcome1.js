import {View, Image, ScrollView, StatusBar} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';
import Button from '../../CustomComponent/Button';
import BackButton from '../../CustomComponent/BackButton';
import {CustomInput} from '../../CustomComponent/InputField';
import {getOptCode} from '../../Utils/Api/Auth/getOptCode';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {setUserData} from '../../redux/UserSlicee';
import Modals from '../../CustomComponent/Modal';
import usePhoneAuthentication from '../../Utils/Hooks/usePhoneAuthentication';
import {normalizePhoneNumber} from '../../Utils/normalizePhoneNumber';

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^(\+92|0092|0)?\d{10}$/, 'Invalid phone number'),
});

const Welcome1 = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState("123456");

  const onSubmit = async values => {
    console.log(values);
    await SubmitOtp(values.phone, values.name);
  };

  const SubmitOtp = async (phone, name) => {
    console.log(phone);
    const _pin_code = await getOptCode(phone);

    dispatch(
      setUserData({
        name: name,
        phone_no: phone,
        isLoggedin: false,
      }),
    );

    navigation.navigate('OtpScreen', { otpMessage: otpMessage });
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
          height: Theme.hp('15%'),
          alignItems: 'center',
          width: Theme.wp('80%'),
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        <Title
          lable={'Welcome'}
          fsize={20}
          textAlign={'center'}
          fweight={'bold'}
          col={'#000000'}
        />
        <Title
          numberOfLines={7}
          lable={
            'Thank you for joining our Blood Donation App!!! With your support, we can connect donors and recipients, Spreading hope and giving the gift of life.'
          }
          fsize={14}
          textAlign={'center'}
          fweight={'400'}
          col={Theme.txtgrey}
        />
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
      {/* form */}
      <Formik
        initialValues={{name: '', phone: ""}}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          //form container
          <View
            style={{
              height: Theme.hp('30%'),
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            {/* input fields */}
            <View
              style={{
                height: Theme.hp('17%'),
                width: Theme.wp('90%'),
              }}>
              <CustomInput
                label={'Name'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                touched={touched.name}
                error={errors.name}
                placeholder={'Muhammad Ali'}
                source={require('../../Asset/Person.png')}
                marginBottom={8}
              />
              <CustomInput
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                touched={touched.phone}
                label={'Phone'}
                error={errors.phone}
                placeholder={'03001234567'}
                source={require('../../Asset/phoneTransperent2.png')}
                keyboardType={'number-pad'}
              />
            </View>

            {/* continue button */}
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Button
                onPress={handleSubmit}
                width={Theme.wp('80%')}
                buttonTitle={'Continue'}
              />
            </View>
          </View>
        )}
      </Formik>

      <Modals loader={isLoading} loaderIndicator={true} />
    </ScrollView>
  );
};

export default Welcome1;
