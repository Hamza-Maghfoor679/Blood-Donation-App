import {
  FlatList,
  Text,
  Title,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Theme from '../../Utils/Theme';

const CustomFlatlist = ({navigation}) => {
  data = [
    {
      id: 1,
      name: 'Muhammad Ali',
      location: 'Dha Phase 1',
      phone: '0302-1234567',
      description:
        'I am a Patient of Blood Cancer and need 1 bottle I am a Patient of Blood Cancer and need 1 bottle blood.',
    },
    {
      id: 2,
      name: 'Muhammad Ali',
      location: 'Dha Phase 1',
      phone: '0302-1234567',
      description:
        'I am a Patient of Blood Cancer and need 1 bottle I am a Patient of Blood Cancer and need 1 bottle blood.',
    },
    {
      id: 3,
      name: 'Muhammad Ali',
      location: 'Dha Phase 1',
      phone: '0302-1234567',
      description:
        'I am a Patient of Blood Cancer and need 1 bottle I am a Patient of Blood Cancer and need 1 bottle blood.',
    },
    {
      id: 4,
      name: 'Muhammad Ali',
      location: 'Dha Phase 1',
      phone: '0302-1234567',
      description:
        'I am a Patient of Blood Cancer and need 1 bottle I am a Patient of Blood Cancer and need 1 bottle blood.',
    },
    {
      id: 5,
      name: 'Muhammad Ali',
      location: 'Dha Phase 1',
      phone: '0302-1234567',
      description:
        'I am a Patient of Blood Cancer and need 1 bottle I am a Patient of Blood Cancer and need 1 bottle blood.',
    },
  ];
  const renderItem = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PatientDetail')}
        style={{
          height: Theme.hp('20%'),
          width: Theme.wp('90%'),
          alignSelf: 'center',
          borderRadius: 10,
          borderColor: '#8D8D8D',
          borderWidth: 0.3,
          marginVertical: Theme.hp('0.8%'),

          padding: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: Theme.hp('7%'), width: Theme.wp('14%')}}
            source={require('../../Asset/Flatlist.png')}
            resizeMode="cover"
          />
          <View
            style={{
              height: Theme.hp('10%'),
              justifyContent: 'space-between',

              width: Theme.wp('45%'),
              left: Theme.wp('2%'),
            }}>
            <Title
              lable={'Muhammad Ali'}
              fsize={16}
              fweight={'500'}
              col={'black'}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: Theme.wp('1%'),
              }}>
              <Ionicons name={'location-outline'} size={16} color={'#8D8D8D'} />
              <Title lable={'Dha Phase 1'} fsize={14} col={'#8D8D8D'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: Theme.wp('1.2%'),
              }}>
              <Feather name={'phone'} size={14} color={'#8D8D8D'} />
              <Title lable={'0302-1234567'} fsize={14} col={'#8D8D8D'} />
            </View>
            <View>
              <Title lable={'A+ Positive'} col={Theme.themecol} fsize={14} />
            </View>
          </View>

          <View
            style={{
              alignItems: 'flex-end',
              width: Theme.wp('24.5%'),
            }}>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                borderRadius: 100,
                backgroundColor: Theme.themecol,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SimpleLineIcons name={'share-alt'} size={15} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: Theme.hp('8%'),
            width: Theme.wp('85%'),
            top: Theme.hp('0.5%'),
          }}>
          <Text style={{fontSize: 14, color: '#8D8D8D'}}>
            <Text style={{fontSize: 14, fontWeight: '500', color: 'black'}}>
              {'Description: '}
            </Text>
            <Text>
              {
                'I am a Patient of Blood Cancer and need 1 bottle I am a Patient of Blood Cancer and need 1 bottle blood.'
              }
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        data={data}
      />
    </View>
  );
};

export default CustomFlatlist;
