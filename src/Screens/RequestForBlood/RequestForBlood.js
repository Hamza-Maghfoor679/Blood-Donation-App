import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';

import Button from '../../CustomComponent/Button';
import BackButton from '../../CustomComponent/BackButton';
import InputField, {
  CustomInput,
  DatePicker,
} from '../../CustomComponent/InputField';
import DropDown from '../../CustomComponent/DropDown';
import RequestSuccess from '../../CustomComponent/PopUp/RequestSuccess';
import {Formik} from 'formik';

import * as yup from 'yup';
import ErrorMessage from '../../CustomComponent/ErrorMessage';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {createOrUpdatePatient} from '../../Utils/Api/Patient/createOrUpdatePatient';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';

import LocationSearch from '../../CustomComponent/LocationSearch/LocationSearch';
import {setUserData} from '../../redux/UserSlicee';
import Modals from '../../CustomComponent/Modal';
import moment from 'moment';

const validationSchema = yup.object().shape({
  user_id: yup.number().required('User ID is required'),
  no_of_blood: yup
    .number()
    .required('Number of blood is required')
    .typeError('Please enter a valid number'),
  blood_group: yup.string().required('Blood group is required'),
  // phone_no: yup.string().required('Phone number is required'),
  phone_no: yup
    .string()
    .required('Phone number is required')
    .matches(/^(\+92|0092|0)?\d{10}$/, 'Invalid phone number'),
  location: yup.string().required('Location is required'),
  latitude: yup.string().required('Latitude is required'),
  longitude: yup.string().required('Longitude is required'),
  date: yup.date().required('Date is required'),
  note: yup.string(),
});

const initialRequiredValues = {
  user_id: 1,
  no_of_blood: '',
  blood_group: 'A-',
  phone_no: '',
  location: '',
  latitude: '',
  longitude: '',
  date: '',
  note: 'hi',
};

const list = [];

const valuesToAdd = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

// Adding new values to the original list
valuesToAdd.forEach(value => {
  list.push({
    label: value,
    value: value,
  });
});

const RequestForBlood = ({navigation, route}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const [profileImage, setProfileImage] = useState(userData?.image ?? null);
  const [isLoading, setIsLoading] = useState(false);
  let requestData = route?.params?.requestData ?? null;

  const showAllValues = values => {
    //console log all states values
    console.log('values from form');
    console.log(values);
  };

  const handleSubmit = async values => {
    setIsVisible(false);
    setIsLoading(true);
    console.log('values from form');
    const userId = userData.id;
    let requestAfterEdit = null;

    if (requestData !== null) {
      console.log('if is working');
      console.log('requestData is not null');
      requestAfterEdit = {
        request_id: values.id,
        user_id: values.user_id,
        no_of_blood: values.no_of_blood,
        blood_group: values.blood_group,
        phone_no: values.phone_no,
        location: values.location,
        latitude: values.latitude,
        note: values.note,
        longitude: values.longitude,
        date: moment(values.date, 'DD-MM-YYYY').format('DD-MM-YYYY'),
      };

      values = requestAfterEdit;
      console.log('requestAfterEdit:');
      console.log(JSON.stringify(requestAfterEdit, null, 2));
    } else {
      console.log('requestData is null');
      values.user_id = userId;
      console.log('values after setting user_id:', values);
    }
    console.log('requestAfterEdit', requestAfterEdit);
    const token = userData.token;

    console.log(token);

    const isResterOrUpdated = await createOrUpdatePatient({...values}, token);
    console.log('isResterOrUpdated');
    console.log(isResterOrUpdated);
    if (isResterOrUpdated) {
      console.log('isResterOrUpdated COMPLETED SUCCESSFULLY');
      setIsVisible(true);
    } else {
      console.log('isResterOrUpdated FAILED');
    }
    setIsLoading(false);
  };

  const handlePlaceSelect = (data, details = null, setFieldValue) => {
    if (details) {
      // Access latitude and longitude from the details object
      const {geometry} = details;
      const {location} = geometry;

      // Log latitude and longitude

      console.log('Latitude:', location.lat);
      console.log('longitude:', location.lng);

      // setting location values
      console.log('data.description');
      console.log(data.description);
      setFieldValue('location', data.description);
      setFieldValue('latitude', location.lat);
      setFieldValue('longitude', location.lng);

      setLocation(location);
    } else {
      setFieldValue('location', '');
    }
  };

  const HnadleImagePicker = () => {
    ImagePicker.showImagePicker({title: 'Select Image'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setImageSource(source);
      }
    });
  };

  // update the image from redux
  // useEffect(() => {
  //   if (userData.profileImage) {
  //     setProfileImage(userData.profileImage);
  //   }
  // }, [userData.profileImage]);

  const openGallery = async () => {
    console.log('openGallery');
    try {
      launchImageLibrary(
        {
          quality: 1,
          selectionLimit: 1,
          mediaType: 'photo',
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const source = response.assets[0];

            console.log(source);
            // uploadPhoto(source, setProfileImages, setLoader, dispatch);
            const Image = {
              uri: source.uri,
              name: source.fileName,
              type: source.type,
            };
            dispatch(setUserData({profileImage: Image}));
            console.log('user data from image picker', userData);
          }
        },
      );
    } catch (error) {
      console.log('ERROR ', error);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          height: Theme.hp('100%'),
          width: Theme.wp('100%'),
          backgroundColor: 'white',
        }}>
        <StatusBar backgroundColor={Theme.themecol} />
        <View
          style={{
            height: Theme.hp('33%'),
            width: Theme.wp('100%'),
            backgroundColor: Theme.themecol,
          }}>
          <BackButton
            white
            lable={'Request'}
            navigation={() => navigation.goBack()}
          />
          <View
            style={{
              width: Theme.wp('100%'),
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: Theme.hp('12%'),
                width: Theme.wp('24%'),
                borderRadius: 100,
              }}
              source={
                profileImage
                  ? {uri: profileImage}
                  : require('../../Asset/Profile.png')
              }
              resizeMode="cover"
            />
            {/* note: note needed here this logic is not good  */}
            {/* <TouchableOpacity
              style={{
                left: Theme.wp('11%'),
                bottom: Theme.hp('4%'),
              }}
              onPress={openGallery}>
              <Image
                style={{
                  height: Theme.hp('4%'),
                  width: Theme.wp('8%'),
                }}
                source={require('../../Asset/ImagePicker.png')}
                resizeMode="contain"
              />
            </TouchableOpacity> */}
            <View
              style={{
                height: Theme.hp('4%'),
                width: Theme.wp('100%'),
                alignItems: 'center',
                marginTop: Theme.hp('3%'),
                bottom: Theme.hp('2%'),
              }}>
              <Title
                lable={'Muhammad Ali'}
                fsize={16}
                fweight={'bold'}
                col={'white'}
              />
            </View>
          </View>
        </View>

        <ScrollView
          nestedScrollEnabled
          style={{
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            bottom: Theme.hp('3%'),
            backgroundColor: 'white',
            // opacity: 0.8,
          }}>
          <View style={{height: Theme.hp('4%')}} />
          <Formik
            initialValues={
              requestData
                ? {...requestData, note: requestData.note??"", date: requestData?.date}
                : initialRequiredValues
            }
            validationSchema={validationSchema}
            onSubmit={values => {
              handleSubmit(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              setFieldValue,
            }) => (
              <View
                style={{
                  // height: Theme.hp('90%'),
                  // justifyContent: 'space-between',
                  alignSelf: 'center',
                }}>
                {/* Blood Group */}
                <DropDown
                  marginBottom={Theme.hp('1%')}
                  onChange={handleChange('blood_group')}
                  textlabel={'Blood Group'}
                  list={list}
                  // value = {values.blood_group}
                  placeholder={'A+'}
                  source={require('../../Asset/MedicalCondition.png')}
                />
                {touched.blood_group && errors.blood_group && (
                  <ErrorMessage error={errors.blood_group} />
                )}

                {/* no of Blood */}
                <CustomInput
                  keyboardType={'numeric'}
                  marginBottom={Theme.hp('1%')}
                  onChangeText={handleChange('no_of_blood')}
                  onBlur={handleBlur('no_of_blood')}
                  value={values.no_of_blood}
                  touched={touched.no_of_blood}
                  error={errors.no_of_blood}
                  label={'No Bottle '}
                  placeholder={'01'}
                  source={require('../../Asset/BottleRequired.png')}
                />

                {/* phone */}
                <CustomInput
                  keyboardType={'numeric'}
                  marginBottom={Theme.hp('1%')}
                  onChangeText={handleChange('phone_no')}
                  onBlur={handleBlur('phone_no')}
                  value={values.phone_no}
                  touched={touched.phone_no}
                  error={errors.phone_no}
                  label={'Phone'}
                  placeholder={'0300 1234567'}
                  source={require('../../Asset/phoneTransperent2.png')}
                />
                {/* location search */}
                <LocationSearch
                  setFieldValue={setFieldValue}
                  handlePlaceSelect={handlePlaceSelect}
                  width={Theme.wp('90%')}
                  alignSelf={'center'}
                  placeholder={values.location}
                />

                {touched.location && errors.location ? (
                  <View
                    style={{
                      marginLeft: Theme.wp('2%'),
                      marginBottom: Theme.hp('3%'),
                    }}>
                    <Text style={{color: 'red'}}>{errors.location}</Text>
                  </View>
                ) : null}
                <DatePicker
                  marginBottom={Theme.hp('1%')}
                  value={values.date?moment(values.date).format('DD-MM-YYYY'):""}
                  label={'Date'}
                  placeholder={'02-10-1999'}
                  source={require('../../Asset/DateOfBirth.png')}
                  setDate={date => setFieldValue('date', date)}
                />
                {touched.date && errors.date && (
                  <ErrorMessage
                    marginLeft={Theme.wp('2%')}
                    error={errors.date}
                  />
                )}
                <InputField
                  height={Theme.hp('20%')}
                  width={Theme.wp('90%')}
                  borderColor={'#848484'}
                  placeholder={'Note....'}
                  borderRadius={10}
                  borderWidth={0.3}
                  multiline={true}
                  numberOfLines={9}
                  textAlignVertical={'top'}
                  paddingHorizontal={Theme.wp('3%')}
                  paddingTop={Theme.hp('2%')}
                  backgroundColor={true}
                  onChangeText={handleChange('note')}
                  onBlur={handleBlur('note')}
                  value={values.note}
                />

                <View
                  style={{
                    height: Theme.hp('15%'),
                  }}>
                  <Button
                    onPress={() => {
                      handleSubmit();
                      //  navigation.navigate('ProfileEdit');
                    }}
                    width={Theme.wp('80%')}
                    buttonTitle={'Send Request'}
                  />
                </View>

                <Modals loader={isLoading} loaderIndicator={true} />

                <RequestSuccess
                  isVisible={isVisible}
                  navigation={navigation}
                  Close={() => setIsVisible(false)}></RequestSuccess>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default RequestForBlood;
