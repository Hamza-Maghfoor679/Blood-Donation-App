import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';

import Button from '../../CustomComponent/Button';
import BackButton from '../../CustomComponent/BackButton';
import InputField, {CustomInput} from '../../CustomComponent/InputField';
import { setUserData } from '../../redux/UserSlicee';
import { useDispatch } from 'react-redux';

const JoinUsToday = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(null);
  const items = [
    'Yellow Fever',
    'Liver Disease',
    'Hypertension',
    'Hepatitis A',
    'Malaria',
    'Cholera',
  ];

  const handleItemPress = item => {
    setSelectedItem(item === selectedItem ? null : item);
    // set disease in redux
    dispatch(setUserData({disease: item}));
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
          height: Theme.hp('13%'),
          alignItems: 'center',
          width: Theme.wp('80%'),

          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        <Title
          lable={'Join Us Today!'}
          fsize={20}
          textAlign={'center'}
          fweight={'bold'}
          col={'#000000'}
        />
        <Title
          lable={
            'Together, we can bridge the gap between those in need and those ready to give. Your contribution is the lifeline that brings hope.'
          }
          numberOfLines={25}
          fsize={14}
          textAlign={'center'}
          fweight={'400'}
          col={Theme.txtgrey}
        />
      </View>
      <View
        style={{
          height: Theme.hp('35%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            height: Theme.hp('35%'),
            width: Theme.wp('60%'),
          }}
          source={require('../../Asset/JoinUsDay.png')}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          height: Theme.hp('35%'),
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: Theme.hp('22%'),
            alignItems: 'center',
            width: Theme.wp('90%'),
            justifyContent: 'space-between',
          }}>
          <CustomInput
            label={'Disease'}
            value={selectedItem}
            placeholder={'Yellow Fever'}
            source={require('../../Asset/Disease.png')}
          />

          <View
            style={{
              flexWrap: 'wrap',
              alignItems: 'center',
              flexDirection: 'row',
              width: Theme.wp('90%'),
            }}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleItemPress(item)}
                style={{
                  height: Theme.hp('5%'),
                  width: Theme.wp('27%'),
                  borderRadius: 7,
                  borderColor: '#EEEEEE',
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 5,
                  marginVertical: 5,
                  backgroundColor:
                    item === selectedItem ? Theme.themecol : 'white',
                }}>
                <Title
                  lable={item}
                  fsize={13}
                  fweight={'500'}
                  col={item === selectedItem ? 'white' : 'black'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            height: Theme.hp('20%'),

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            onPress={() =>
              navigation.navigate('Profile')
            }
            width={Theme.wp('80%')}
            buttonTitle={'Continue'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default JoinUsToday;
