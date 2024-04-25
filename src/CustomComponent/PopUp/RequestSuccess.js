import {View, Image, Text, Modal} from 'react-native';
// import Modal from 'react-native-modal';
import React from 'react';
import Theme from '../../Utils/Theme';
import {CustomInput, DatePicker} from '../InputField';
import Entypo from 'react-native-vector-icons/Entypo';

import DropDown from '../DropDown';
import Button from '../Button';
import Title from '../Title';

const RequestSuccess = ({isVisible, Close, Done, navigation}) => {
  let v = 0;
  const HandleContinue = () => {
    let time = new Date().toLocaleTimeString();
    // return
    navigation.navigate('HomeScreen', {requestAdded: time});
  };
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.5}
      style={
        {
          // backgroundColor: 'gray',
        }
      }>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}>
        <View
          style={{
            flex: 1,
            // backgroundColor:"gray",
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: Theme.hp('55%'),
              width: Theme.wp('90%'),
              backgroundColor: 'white',
              // opacity: 0.9,
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: Theme.wp('80%'),
                alignItems: 'flex-end',
                // height: Theme.hp('6%'),
                justifyContent: 'center',
              }}>
              <Entypo
                name={'cross'}
                size={25}
                color={'black'}
                onPress={Close}
              />
            </View>
            <Image
              style={{
                height: Theme.hp('27%'),
                width: Theme.wp('50%'),
              }}
              source={require('../../Asset/RequestPop.png')}
              resizeMode="contain"
            />
            <View
              style={{
                // height: Theme.hp('15%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: Theme.hp('3%'),
              }}>
              <Text>
                Your request for <Text style={{color: 'red'}}>Blood</Text> have
              </Text>
              <Text>sent Successfully</Text>
            </View>
            <View style={{height: Theme.hp('15%'), justifyContent: 'center'}}>
              <Button
                onPress={() => {
                  HandleContinue();
                }}
                width={Theme.wp('40%')}
                buttonTitle={'Continue'}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RequestSuccess;
