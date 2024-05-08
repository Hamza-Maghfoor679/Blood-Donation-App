import {
  View,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
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
import {registerUser} from '../../Utils/Api/Auth/registerUser';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInput} from 'react-native-gesture-handler';
import {lang} from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import ErrorMessage from '../../CustomComponent/ErrorMessage';
import {setUserData} from '../../redux/UserSlicee';
import LocationSearch from '../../CustomComponent/LocationSearch/LocationSearch';
import {launchImageLibrary} from 'react-native-image-picker';
import ContactUs from '../ContactUs/ContactUs';
import {setChecks} from '../../redux/Checks';

const validationSchema = Yup.object().shape({
  // Required fields
  name: Yup.string().required('Name is required'),

  blood_group: Yup.string().required('Blood group is required'),
  location: Yup.string().required('Location is required'),
  latitude: Yup.string().required('Latitude is required'),
  longitude: Yup.string().required('Longitude is required'),

  // Optional fields
  phone_no: Yup.string().nullable(),
  allergies_reaction: Yup.string().nullable(),
  language: Yup.string().nullable(),
  blood_donor: Yup.string().nullable(),
  age: Yup.string().nullable(),
  // disease: Yup.string().nullable(),
  user_type: Yup.string().nullable(),
  weight: Yup.string().nullable(),
  dob: Yup.date().nullable(),
  height: Yup.string().nullable(),
  medications: Yup.string().nullable(),
  medical_condition: Yup.string().nullable(),
  note: Yup.string().nullable(),
});

const initialRequiredValues = {
  name: '',
  phone_no: '',
  blood_group: '',
  location: '',
  latitude: 0,
  longitude: 0,
};

const initialOptionalValues = {
  age: 0,
  disease: '',
  user_type: '',
  weight: 0,
  dob: null,
  height: 0,
  medications: '',
  medical_condition: '',
  allergies_reaction: '',
  language: '',
  blood_donor: '',
  note: '',
};

const initialValues = {
  ...initialRequiredValues,
  ...initialOptionalValues,
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

const list2 = [
  {
    label: 'English',
    value: 'English',
  },
  {
    label: 'Urdu',
    value: 'Urdu',
  },
  {
    label: 'French',
    value: 'French',
  },
  {
    label: 'German',
    value: 'German',
  },
];

const Profile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  console.log('_____________________________');
  console.log(userData);
  const isLoggedIn = userData?.is_verified ? true : false;
  const [profileImage, setProfileImage] = useState(
    userData?.image ? {uri: userData?.image} : null,
  );
  // States for the form inputs
  const [location, setLocation] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState('');

  const setDateOfBirthField = (dateOfBirth, setFieldValue) => {
    setFieldValue('dob', dateOfBirth);
  };

  const showAllValues = values => {
    //console log all states values
    console.log('values from form');
    console.log(values);
  };

  const handleSubmit = async values => {
    console.log('values frsdfsdfsdfsdfsdfdom form');
    // console.log(values);
    // return

    values.profileImage = userData.profileImage;
    dispatch(setUserData(values));
    console.log('isLoggedIn  ' + isLoggedIn);
    dispatch(setChecks({isEditComplete: false}));

    if (isLoggedIn) {
      navigation.goBack();
    } else {
      navigation.navigate('ProfileEdit');
    }

    // navigation.navigate('ProfileEdit',{isEditComplete:true});

    // navigation.goBack();
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

  // update the image from redux
  useEffect(() => {
    if (userData.profileImage) {
      setProfileImage(userData.profileImage);
    }
  }, [userData.profileImage]);

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

  const {customHeight} = route.params ?? '';

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: Theme.hp('100%'),
        width: Theme.wp('100%'),
        backgroundColor: 'white',
      }}>
      <StatusBar backgroundColor={'white'} />

      <View
        style={{
          height: Theme.hp('30%'),
          width: Theme.wp('100%'),
          backgroundColor: 'white',
        }}>
        <BackButton
          black
          lable={'Profile'}
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
            source={profileImage ?? require('../../Asset/profileIcon.png')}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={openGallery}
            style={{
              // backgroundColor: 'green',
              left: Theme.wp('11%'),
              bottom: Theme.hp('4%'),
            }}>
            <Image
              style={{
                height: Theme.hp('4%'),
                width: Theme.wp('8%'),
              }}
              source={require('../../Asset/ImagePicker.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View
            style={{
              height: Theme.hp('4%'),
              width: Theme.wp('100%'),
              alignItems: 'center',
              bottom: Theme.hp('2%'),
            }}>
            <Title
              lable={userData.name}
              fsize={18}
              fweight={'bold'}
              col={'black'}
            />
          </View>
        </View>
      </View>

      <ScrollView
        nestedScrollEnabled
        style={{
          height: Theme.hp('70%'),
          width: Theme.wp('100%'),
          // backgroundColor: 'gray',
        }}>
        <Formik
          initialValues={userData}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleSubmit(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View
              style={{
                // height: customHeight ? Theme.hp('160%') : Theme.hp('150%'),
                justifyContent: 'space-between',
                alignSelf: 'center',
                // backgroundColor:"gray"
              }}>
              {/* personal information */}
              <View
                style={{
                  // backgroundColor: 'gray',
                  // gap: Theme.hp('1%'),
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    marginBottom: Theme.hp('2%'),
                    width: Theme.wp('90%'),
                    alignSelf: 'center',
                    height: Theme.hp('5%'),
                    justifyContent: 'flex-end',
                  }}>
                  <Title
                    lable={'Personal Information'}
                    col={Theme.txtblack}
                    fsize={16}
                    fweight={'bold'}
                  />
                </View>

                {/* name input */}
                <CustomInput
                  marginBottom={Theme.hp('1%')}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  touched={touched.name}
                  label={'Name'}
                  error={errors.name}
                  placeholder={'Muhammad Ali'}
                  source={require('../../Asset/Person.png')}
                />

                {/* place search input */}
                <LocationSearch
                  setFieldValue={setFieldValue}
                  placeholder={values.location}
                  handlePlaceSelect={handlePlaceSelect}
                  width={Theme.wp('90%')}
                  alignSelf={'center'}
                />

                {/* location error */}
                {touched.location && errors.location ? (
                  <View
                    style={{
                      marginBottom: Theme.hp('2%'),
                    }}>
                    <Text style={{color: 'red'}}>{errors.location}</Text>
                  </View>
                ) : null}

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

                {/* medical Condition */}
                <CustomInput
                  marginBottom={Theme.hp('1%')}
                  onChangeText={handleChange('medical_condition')}
                  onBlur={handleBlur('medical_condition')}
                  value={values.medical_condition}
                  touched={touched.medical_condition}
                  label={'Medical Condition'}
                  error={errors.medical_condition}
                  placeholder={'All Perfect'}
                  source={require('../../Asset/MedicalConditionh.png')}
                />

                {/* blood group */}
                <DropDown
                  marginBottom={Theme.hp('1%')}
                  // onChangeText={handleChange('blood_group')}
                  list={list}
                  value={values.blood_group}
                  textlabel={'Blood Group'}
                  placeholder={'A+'}
                  source={require('../../Asset/MedicalCondition.png')}
                  // onChangeText={setBloodGroup}
                  onChange={handleChange('blood_group')}
                />
                {touched.blood_group && errors.blood_group && (
                  <ErrorMessage error={errors.blood_group} />
                )}

                {/* weight */}
                <CustomInput
                  marginBottom={Theme.hp('1%')}
                  label={'Weight'}
                  keyboardType={'numeric'}
                  placeholder={'65lb'}
                  source={require('../../Asset/Weight.png')}
                  onChangeText={handleChange('weight')}
                  onBlur={handleBlur('weight')}
                  value={values.weight}
                  touched={touched.weight}
                  error={errors.weight}
                />
                {/* Date of Birth */}
                <DatePicker
                  marginBottom={Theme.hp('1%')}
                  label={'Date Of Birth'}
                  value={values.dob == 'null' ? '' : values.dob ?? ''}
                  placeholder={'02-10-1999'}
                  source={require('../../Asset/DateOfBirth.png')}
                  setDate={date => setDateOfBirthField(date, setFieldValue)}
                />
                {touched.dob && errors.dob && (
                  <ErrorMessage error={errors.dob} />
                )}

                <CustomInput
                  marginBottom={Theme.hp('1%')}
                  label={'Height'}
                  placeholder={'5,11'}
                  source={require('../../Asset/Height.png')}
                  keyboardType={'number-pad'}
                  onChangeText={handleChange('height')}
                  onBlur={handleBlur('height')}
                  value={values.height}
                  touched={touched.height}
                  error={errors.height}
                />
              </View>

              {/* medical */}
              <View
                style={{
                  height: Theme.hp('22.5%'),
                  justifyContent: 'space-between',

                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    width: Theme.wp('90%'),
                    alignSelf: 'center',
                    height: Theme.hp('5%'),
                    justifyContent: 'flex-end',
                  }}>
                  <Title
                    lable={'Medical'}
                    col={Theme.txtblack}
                    fsize={16}
                    fweight={'bold'}
                  />
                </View>
                <CustomInput
                  label={'Allergies & Reactions'}
                  placeholder={'None'}
                  source={require('../../Asset/Allergies.png')}
                  onChangeText={handleChange('allergies_reaction')}
                  onBlur={handleBlur('allergies_reaction')}
                  value={values.allergies_reaction}
                  touched={touched.allergies_reaction}
                  error={errors.allergies_reaction}
                />
                <CustomInput
                  label={'Medications'}
                  placeholder={'None'}
                  source={require('../../Asset/Medication.png')}
                  onChangeText={handleChange('medications')}
                  onBlur={handleBlur('medications')}
                  value={values.medications}
                  touched={touched.medications}
                  error={errors.medications}
                />
              </View>

              {/* medical + language*/}
              <View
                style={{
                  height: Theme.hp('14%'),
                  justifyContent: 'space-between',

                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    width: Theme.wp('90%'),
                    alignSelf: 'center',
                    height: Theme.hp('7%'),
                    justifyContent: 'center',
                  }}>
                  <Title
                    lable={'Language'}
                    col={Theme.txtblack}
                    fsize={16}
                    fweight={'bold'}
                  />
                </View>
                <DropDown
                  list={list2}
                  textlabel={'Primary Language'}
                  placeholder={'English'}
                  source={require('../../Asset/PrimaryLanguage.png')}
                  onChange={lang => setFieldValue('language', lang)}
                />
              </View>

              {/* note */}
              <View
                style={{
                  height: Theme.hp('27%'),
                  justifyContent: 'space-between',

                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    width: Theme.wp('90%'),
                    alignSelf: 'center',
                    height: Theme.hp('7%'),
                    justifyContent: 'center',
                  }}>
                  <Title
                    lable={'Note'}
                    col={Theme.txtblack}
                    fsize={16}
                    fweight={'bold'}
                  />
                </View>
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
              </View>

              {/* save btn */}
              <View
                style={{
                  marginTop: Theme.hp('2%'),
                  height: customHeight ? Theme.hp('15%') : Theme.hp('10%'),
                  justifyContent: customHeight ? 'flex-start' : 'center',
                }}>
                <Button
                  onPress={() => {
                    handleSubmit();
                  }}
                  width={Theme.wp('80%')}
                  buttonTitle={'Next'}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </ScrollView>
  );
};

export default Profile;
