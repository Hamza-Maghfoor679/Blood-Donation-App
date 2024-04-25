import {View, Image, Text, ScrollView, StatusBar} from 'react-native';
import React, {useState} from 'react';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';

import Button from '../../CustomComponent/Button';
import BackButton from '../../CustomComponent/BackButton';
import InputField, {CustomInput} from '../../CustomComponent/InputField';
import DropDown from '../../CustomComponent/DropDown';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../redux/UserSlicee';

const ConnectingDonor = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const [age, setAge] = React.useState('');
  const [medicalCondition, setMedicalCondition] = React.useState('');

  // useeffect for user age and medical condition in redux
  React.useEffect(() => {
    dispatch(setUserData({age: age, medical_condition: medicalCondition}));
  }, [age]);

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
          lable={'Connecting Donors'}
          fsize={20}
          textAlign={'center'}
          fweight={'bold'}
          col={'#000000'}
        />
        <Title
          lable={
            'The gift of blood is the gift of life. Be a hero, donate blood, and give someone a chance to live.'
          }
          numberOfLines={5}
          fsize={14}
          textAlign={'center'}
          fweight={'400'}
          col={Theme.txtgrey}
        />
      </View>
      <View
        style={{
          height: Theme.hp('40%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            height: Theme.hp('35%'),
            width: Theme.wp('60%'),
          }}
          source={require('../../Asset/ConnectingDonor.png')}
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
            height: Theme.hp('17%'),
            alignItems: 'center',
            width: Theme.wp('90%'),
            justifyContent: 'space-between',
          }}>
          {/* age */}
          <CustomInput
          keyboardType={'number-pad'}
            label={'Age'}
            source={require('../../Asset/Age.png')}
            onChangeText={setAge}
          />

          {/* medical condition */}
          <DropDown
            textlabel={'Medical Condition'}
            placeholder={'All Perfect'}
            onChange={setMedicalCondition}
            source={require('../../Asset/MedicalCondition.png')}
          />
        </View>
        <View
          style={{
            height: Theme.hp('20%'),

            justifyContent: 'center',
          }}>
          <Button
            onPress={() => navigation.navigate('JoinUsToday')}
            width={Theme.wp('80%')}
            buttonTitle={'Continue'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ConnectingDonor;
