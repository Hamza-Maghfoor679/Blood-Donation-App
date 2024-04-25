import {View, Image, Text, StatusBar, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';
import Button from '../../CustomComponent/Button';
import { isUserExist } from '../../Utils/Api/Auth/isUserExist';

const Welcome = ({navigation}) => {
   
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
          height: Theme.hp('55%'),
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Image
          style={{
            height: Theme.hp('35%'),
            width: Theme.wp('50%'),
          }}
          source={require('../../Asset/Welcome.png')}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          height: Theme.hp('45%'),
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: Theme.hp('10%'),
            alignItems: 'center',
            width: Theme.wp('80%'),

            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: Theme.themecol,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            <Text
              style={{
                color: '#000000',
              }}>
              {' Welcome to '}
            </Text>
            <Text>{'HelpMe '}</Text>
            <Text
          style={{
                color: '#000000',
              }}>
              Mobile Application
            </Text>
          </Text>
        </View>
        <View
          style={{
            height: Theme.hp('10%'),
            alignItems: 'center',
            width: Theme.wp('80%'),

            justifyContent: 'center',
          }}>
          <Title
            numberOfLines={10}
            lable={
              'We just need 1 minute get basic details from you? We connect donors and recipients, spreading hope giving the gift of life.'
            }
            fsize={14}
            textAlign={'center'}
            fweight={'400'}
            col={Theme.txtgrey}
          />
        </View>
        <View
          style={{
            height: Theme.hp('28%'),
            alignItems: 'center',
            width: Theme.wp('80%'),

            justifyContent: 'center',
          }}>
          <Button
            onPress={() => navigation.navigate('Welcome1')}
            width={Theme.wp('80%')}
            buttonTitle={'Continue'}
          />
        </View>
      </View>
    </View>
  );
};

export default Welcome;
