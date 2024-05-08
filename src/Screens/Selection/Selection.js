import {View, StatusBar, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../../CustomComponent/BackButton';
import Theme from '../../Utils/Theme';
import {useSelector, useDispatch} from 'react-redux';

import Title from '../../CustomComponent/Title';
import Button from '../../CustomComponent/Button';
import {dispatchIsDonor} from '../../redux/Slicee';
import {registerUser} from '../../Utils/Api/Auth/registerUser';
import {setUserData, updateUserType} from '../../redux/UserSlicee';
import Modals from '../../CustomComponent/Modal';

const options = [
  {
    label: 'Donor',
    imageSource: require('../../Asset/BloodGroup.png'),
  },
  {
    label: 'Patient',
    imageSource: require('../../Asset/Request.png'),
  },
];

const Selection = ({navigation}) => {
  const {isDonor} = useSelector(state => state.todos);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState(0);
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(userData?.image?{uri: userData?.image}:null);

  console.log(selectedOption);

  const handSubmit = async () => {
    console.log('Submitting form...');
    setIsLoading(true);
    // remove pin_code from the object

    const {pin_code, ...userDataWithoutPin} = userData;


    console.log("userDataWithoutPin__________________________________")
    console.log(userDataWithoutPin)

    userDataWithoutPin.user_type = selectedOption === 0 ? 'donor' : 'patient';
    console.log('values');
    console.log(userDataWithoutPin);

    const isRegistrationSuccessful = await registerUser({
      ...userDataWithoutPin,
    },dispatch);

    if (isRegistrationSuccessful) {
      console.log('Registration successful!');
      dispatch(dispatchIsDonor(userDataWithoutPin.user_type));
      dispatch(setUserData({user_type: userDataWithoutPin.user_type}));
      console.log('replace');
      if (userData?.token) {
        navigation.replace('DrawerStack');
      } else {
        navigation.replace('Welcome1');
      }
    } else {
      console.log('Registration failed.');
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (userData.profileImage) {
      setProfileImage(userData.profileImage);
    }
  }, [userData.profileImage]);


  useEffect(() => {
    const token = userData?.token ?? null;
    console.log('token in selection');
    console.log(token);
    if (token) {
      setSelectedOption(userData.user_type === 'donor' ? 0 : 1);
    }
  }, []);

  return (
    <View
      style={{
        height: Theme.hp('100%'),
        width: Theme.wp('100%'),
        backgroundColor: 'white',
      }}>
      <StatusBar backgroundColor={'white'} />
      <View
        style={{
          height: Theme.hp('10%'),
          width: Theme.wp('100%'),
        }}>
        <BackButton navigation={() => navigation.goBack()} black />
      </View>
      <View
        style={{
          height: Theme.hp('35%'),
          width: Theme.wp('90%'),
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          gap: Theme.hp('2%'),
        }}>
        <Image
          style={{height: Theme.hp('12%'),
          height: Theme.hp('12%'),
          width: Theme.wp('24%'),
          borderRadius: 100,
           backgroundColor: 'green',
          }}
          source={
            profileImage ? profileImage : require('../../Asset/profileIcon.png')
            // profileImage
          }
          resizeMode="cover"
        />
        <Title
          lable={userData.name}
          fsize={16}
          fweight={'bold'}
          col={'black'}
        />
      </View>
      <View
        style={{
          height: Theme.hp('18%'),
          width: Theme.wp('90%'),
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        {options.map((option, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#E6E6E6',
              height: Theme.hp('8%'),
              borderRadius: 7,
              backgroundColor: '#F7F7F7',
              flexDirection: 'row',
              padding: 10,
              width: Theme.wp('90%'),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: Theme.wp('25%'),
                justifyContent: 'space-between',
              }}>
              <Image
                style={{height: Theme.hp('4%'), width: Theme.wp('8%')}}
                source={option.imageSource}
                resizeMode="cover"
              />
              <Title
                lable={option.label}
                fsize={16}
                fweight={'bold'}
                col={'black'}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setSelectedOption(index);
                if (option.label == 'Donor') {
                  dispatch(dispatchIsDonor('Donor'));
                } else {
                  dispatch(dispatchIsDonor('Patient'));
                }
              }}
              style={{
                width: Theme.wp('6%'),
                height: Theme.wp('6%'),
                borderRadius: 100,
                borderColor: '#DC3642',
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: Theme.wp('4%'),
                  height: Theme.wp('4%'),
                  borderRadius: 100,
                  backgroundColor:
                    selectedOption === index ? '#DC3642' : 'transparent',
                }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View
        style={{
          height: Theme.hp('35%'),

          justifyContent: 'center',
        }}>
        <View style={{height: Theme.hp('10%')}} />
        <Button
          onPress={() => {
            if (selectedOption == 0) {
              dispatch(dispatchIsDonor('Donor'));
            } else {
              dispatch(dispatchIsDonor('Patient'));
            }

            handSubmit();
          }}
          width={Theme.wp('80%')}
          buttonTitle={'Continue'}
        />
      </View>
      <Modals loader={isLoading} loaderIndicator={true} />
    </View>
  );
};

export default Selection;
