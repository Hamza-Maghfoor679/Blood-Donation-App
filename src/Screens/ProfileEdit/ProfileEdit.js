import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Button from '../../CustomComponent/Button';
import BackButton from '../../CustomComponent/BackButton';
import InputField, {
  CustomInput,
  ProfileView,
} from '../../CustomComponent/InputField';
import DropDown from '../../CustomComponent/DropDown';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../redux/UserSlicee';
import {dispatchIsDonor} from '../../redux/Slicee';
import {registerUser} from '../../Utils/Api/Auth/registerUser';
import Modals from '../../CustomComponent/Modal';
import {setChecks} from '../../redux/Checks';
import {RefreshUserData} from '../../Utils/RefreshUserData';

const ProfileEdit = ({navigation, route}) => {
  const {customHeight} = route.params ?? '';
  // const customHeight ='';
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const checks = useSelector(state => state.checks);
  const isLoggedIn = userData.isLoggedin;
  const [isEditComplete, setIsEditComplete] = useState(false);

  console.log('isEditComplete', checks.isEditComplete);

  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(
    userData?.image ? {uri: userData?.image} : null,
  );
  useEffect(() => {
    if (userData?.profileImage) {
      setProfileImage(userData.profileImage);
    }
  }, [userData?.profileImage]);

  useEffect(() => {
    setIsEditComplete(checks.isEditComplete);
    console.log('loop works');
  }, []);

  const handleDone = async () => {
    console.log('handleDone');
    console.log('isLoggedIn', isLoggedIn);
    if (!isLoggedIn) {
      setIsEditComplete(true);
      dispatch(setChecks({isEditComplete: !checks.isEditComplete}));

      navigation.navigate('Selection');
    } else {
      handSubmit();
    }
  };

  const handSubmit = async () => {
    console.log('Submitting form...');
    setIsLoading(true);
    // remove pin_code from the object

    const {pin_code, ...userDataWithoutPin} = userData;

    console.log('userDataWithoutPin__________________________________');
    console.log(userDataWithoutPin);

    // userDataWithoutPin.user_type = selectedOption === 0 ? 'donor' : 'patient';
    console.log('values');
    console.log(userDataWithoutPin);

    const isRegistrationSuccessful = await registerUser(
      {
        ...userDataWithoutPin,
      },
      dispatch,
    );

    if (isRegistrationSuccessful) {
      console.log('Registration successful!');
      dispatch(dispatchIsDonor(userDataWithoutPin.user_type));
      dispatch(setUserData({user_type: userDataWithoutPin.user_type}));
      dispatch(setChecks({isEditComplete: isEditComplete}));

      RefreshUserData();

      let time = new Date().toLocaleTimeString();
      // Replace the 'replace' method with 'navigate' method
      setIsEditComplete(true);
      dispatch(setChecks({isEditComplete: !checks.isEditComplete}));

      navigation.navigate('HomeScreen', {requestAdded: time});

      console.log('navigate');
    } else {
      console.log('Registration failed.');
    }
    setIsLoading(false);
  };
  console.log('profsdsdsile image', profileImage);

  return (
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
          lable={'Profile'}
          white
          edit
          ok={customHeight}
          drawer={customHeight}
          navigation={() => navigation.goBack()}
          onPress={() => {
            // customHeight
            //   ? navigation.navigate('ProfileEdit')
            //   : navigation.navigate('Profile');
            navigation.navigate('Profilee');
          }}
          drawerOpen={() => navigation.openDrawer()}
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
              profileImage ? profileImage : require('../../Asset/Profile.png')
              // profileImage
            }
            resizeMode="cover"
          />

          <View
            style={{
              height: Theme.hp('4%'),
              width: Theme.wp('100%'),
              alignItems: 'center',
              top: Theme.hp('2%'),
            }}>
            <Title
              lable={userData.name}
              fsize={18}
              fweight={'bold'}
              col={'white'}
            />
          </View>
        </View>
      </View>

      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: 'white',
          bottom: Theme.hp('3%'),
        }}
        contentContainerStyle={
          {
            // backgroundColor: 'green',
          }
        }>
        <View
          style={{
            // height: customHeight ? Theme.hp('140%') : Theme.hp('145%'),
            // height: Theme.hp('1%'),
            // justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <View
            style={{
              height: Theme.hp('75%'),
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
                lable={'Personal Information'}
                col={Theme.txtblack}
                fsize={16}
                fweight={'bold'}
              />
            </View>
            <ProfileView
              label={'Name'}
              placeholder={userData.name}
              source={require('../../Asset/Person.png')}
            />
            <ProfileView
              label={'Location'}
              placeholder={userData.location}
              source={require('../../Asset/Location.png')}
            />
            <ProfileView
              label={'Medical Condition'}
              placeholder={userData?.medical_condition ?? ''}
              source={require('../../Asset/MedicalConditionh.png')}
            />
            <ProfileView
              label={'Blood Group'}
              placeholder={userData.blood_group}
              source={require('../../Asset/MedicalCondition.png')}
            />
            {/* <ProfileView
              label={'Blood Donor'}
              placeholder={userData}
              source={require('../../Asset/BloodGroup.png')}
            /> */}
            <ProfileView
              label={'Weight'}
              placeholder={userData.weight}
              source={require('../../Asset/Weight.png')}
            />
            <ProfileView
              label={'Date Of Birth'}
              placeholder={userData.dob}
              source={require('../../Asset/DateOfBirth.png')}
            />
            <ProfileView
              label={'Height'}
              placeholder={userData.height}
              source={require('../../Asset/Height.png')}
            />
          </View>

          <View
            style={{
              height: Theme.hp('22%'),
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
            <ProfileView
              label={'Allergies & Reactions'}
              placeholder={userData.allergies_reaction}
              source={require('../../Asset/Allergies.png')}
            />
            <ProfileView
              label={'Medications'}
              placeholder={userData.medications}
              source={require('../../Asset/Medication.png')}
            />
          </View>
          <View
            style={{
              height: Theme.hp('12%'),
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
            <ProfileView
              label={'Primary Language'}
              placeholder={userData.language}
              source={require('../../Asset/PrimaryLanguage.png')}
            />
          </View>
          <View
            style={{
              height: Theme.hp('14%'),
              justifyContent: 'space-between',

              alignSelf: 'center',
            }}>
            {userData?.note && (
              <View
                style={{
                  width: Theme.wp('90%'),
                  alignSelf: 'center',
                  height: Theme.hp('9%'),
                  top: Theme.hp('4'),
                }}>
                <Title
                  lable={'Note'}
                  numberOfLines={20}
                  col={Theme.txtblack}
                  fsize={16}
                  fweight={'bold'}
                />
              </View>
            )}
            <View
              style={{
                width: Theme.wp('90%'),
                alignSelf: 'center',
                minHeight: Theme.hp('12%'),

                borderRadius: 7,
                backgroundColor: '#F7F7F7',

                padding: 10,
                // alignItems: 'center',
              }}>
              <Title
                lable={userData?.note ?? ''}
                numberOfLines={15}
                fsize={14}
                // textAlign={'center'}
                fweight={'400'}
                col={Theme.txtgrey}
              />
            </View>
          </View>

          <View
            style={{
              height: Theme.hp('30%'),
              // backgroundColor: 'red',
              justifyContent: 'center',
            }}>
            {!checks.isEditComplete && (
              <Button
                onPress={handleDone}
                alignSelf={'center'}
                width={Theme.wp('80%')}
                buttonTitle={'Done'}
                fonntSize={14}
                bradius={7}
                textColor={'white'}
                fontWeight={'500'}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <Modals loader={isLoading} loaderIndicator={true} />
    </View>
  );
};

export default ProfileEdit;
