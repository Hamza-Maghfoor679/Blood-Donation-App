import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Theme from '../Utils/Theme';
import Title from './Title';
import { Image } from 'react-native-elements';

const ProfileImage = ({profileImage,lable}) => {
  return (
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
          profileImage ? profileImage : require('../Asset/profileIcon.png')
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
          lable={lable??"lable"}
          fsize={18}
          fweight={'bold'}
          col={'white'}
        />
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({});
