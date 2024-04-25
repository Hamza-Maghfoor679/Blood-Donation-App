import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Theme from '../Utils/Theme';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Title from './Title';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../redux/UserSlicee';
import { setApiResponses } from '../redux/ApiResponces';

export default function Logout({navigation}) {
  const dispatch = useDispatch();
  const OpenAlert = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => navigation.goBack(),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(logoutUser());
          // dispatch(setApiResponses({NearbyDonor:null,NearPatientBloodRequest:null}));
          navigation.replace('Welcome1');
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={OpenAlert}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: Theme.wp('0.5'),
      }}>
      <Image
        style={{
          height: Theme.hp('6%'),
          width: Theme.wp('6%'),
        }}
        source={require('../Asset/Refresh.png')}
        resizeMode="contain"
      />

      <Title lable={'Logout'} fsize={16} fweight={'400'} col={'black'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
