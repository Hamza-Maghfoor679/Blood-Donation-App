import {View, Image, Text, Modal} from 'react-native';
// import Modal from 'react-native-modal';
import React from 'react';
import Theme from '../../Utils/Theme';
import {CustomInput, DatePicker} from '../InputField';
import Entypo from 'react-native-vector-icons/Entypo';

import DropDown from '../DropDown';
import Button from '../Button';
import Title from '../Title';

const RequestDelete = ({isVisible, Close, Done, Navigation, onDelete}) => {
  const HandleContinue = () => {
    console.log('Delete sdfd');
  
    // Navigation.navigate('HomeScreen');
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
                height: Theme.hp('20%'),
                width: Theme.wp('30%'),
              }}
              source={require('../../Asset/TrashWithIcon.png')}
              resizeMode="contain"
            />
            <View
              style={{
                // height: Theme.hp('15%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: Theme.hp('3%'),
              }}>
              <Text
                style={{
                  fontSize: Theme.txtSmallR,
                  color: 'black',
                  textAlign: 'center',

                  width: Theme.wp('50%'),
                }}>
                Are you sure you want to delete your request?
              </Text>
            </View>

            {/* Actions Buttons */}
            <View
              style={{
                height: Theme.hp('15%'),
                justifyContent: 'center',
                flexDirection: 'row',
                gap: Theme.wp('2%'),
              }}>
              <Button
                onPress={() => {
                  Close();
                }}
                backgroundColor={Theme.white}
                textcolor={Theme.themecol}
                bcol={Theme.themecol}
                bw={1}
                width={Theme.wp('30%')}
                buttonTitle={'Cancel'}
              />

              <Button
                onPress={onDelete}
                width={Theme.wp('30%')}
                buttonTitle={'Delete'}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RequestDelete;
