import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Theme from '../../Utils/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import BackButton from '../../CustomComponent/BackButton';
import InputField, {CustomInput} from '../../CustomComponent/InputField';
import {StatusBar} from 'react-native';
import Title from '../../CustomComponent/Title';
import {useSelector} from 'react-redux';
import {getPatientBloodRequestList} from '../../Utils/Api/Patient/getPatientBloodRequestList';
import {getDonor_request_list} from '../../Utils/Api/Donor/getDonor_request_list';
import Modals from '../../CustomComponent/Modal';
import {handleShare} from '../../Utils/handleShare';
import LocationSearch from '../../CustomComponent/LocationSearch/LocationSearch';

const PatientRequest = ({navigation}) => {
  const userData = useSelector(state => state.user);

  const {isDonor} = useSelector(state => state.todos);
  const [RequestList, setDataRequestList] = useState([]);
  const [location, setLocation] = useState('Lahore');
  const [isNextPage, setIsNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState('A+');

  const items = ['A+', 'B+', 'AB+', 'O+', 'O-'];

  const getImageUri = request => {
    // Check if the request has an image URI, if not, check the user's image URI
    const imageUri = request?.image
      ? {uri: request.image}
      : request?.user?.image
      ? {uri: request.user.image}
      : require('../../Asset/Flatlist.png');

    return imageUri;
  };

  const handleItemPress = item => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  const handleSearch = () => {
    getData();
  };

  const getData = async () => {
    const params = {blood_group: selectedItem, search: location};
    console.log('params');
    console.log(params);
    let response = null;

    if (userData.user_type == 'donor') {
      setIsLoading(true);
      response = await getPatientBloodRequestList(userData.token, params);
      setIsLoading(false);
    } else {
      console.log('getDonor_request_list');
      setIsLoading(true);
      response = await getDonor_request_list(userData.token, params);
      setIsLoading(false);
    }

    if (response.requestData.data) {
      const _data = response?.requestData?.data;
      const isNextPage = response?.next_page_url;
      setIsNextPage(isNextPage ? true : false);

      setDataRequestList(_data);
    } else {
      console.log('no data');
    }
  };

  useEffect(() => {
    getData();
  }, [selectedItem]);

  const RenderItem = ({request}) => {
    console.log(request);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PatientDetail', {id: request?.id})}
        style={{
          height: isDonor == 'donor' ? Theme.hp('20%') : Theme.hp('14%'),
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
            style={{
              height: Theme.hp('7%'),
              width: Theme.wp('14%'),
              borderRadius: 100,
            }}
            source={getImageUri(request)}
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
              lable={
                userData.user_type === 'patient'
                  ? request?.name
                  : request?.user?.name
              }
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
              <Title lable={request?.location} fsize={14} col={'#8D8D8D'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: Theme.wp('1.2%'),
              }}>
              <Feather name={'phone'} size={14} color={'#8D8D8D'} />
              <Title lable={request?.phone_no} fsize={14} col={'#8D8D8D'} />
            </View>
            <View>
              <Title
                lable={request?.blood_group}
                col={Theme.themecol}
                fsize={14}
              />
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
              }}
              onPress={() => handleShare(request)}>
              <SimpleLineIcons name={'share-alt'} size={15} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
        {isDonor == 'donor' && (
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
        )}
      </TouchableOpacity>
    );
  };

  const RenderDefaultMessage = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No data available</Text>
    </View>
  );
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
          height: Theme.hp('28%'),
          width: Theme.wp('100%'),
          justifyContent: 'space-between',
        }}>
        <BackButton
          navigation={() => navigation.goBack()}
          lable={isDonor == 'donor' ? 'Requests' : 'Donors'}
          noti
          drawer
          black
          notification={() => navigation.navigate('Notification')}
          drawerOpen={() => navigation.openDrawer()}
        />

        <CustomInput
          placeholder={'Location'}
          isSearch={true}
          OnSearch={handleSearch}
          location
          source={require('../../Asset/Location.png')}
          onChangeText={setLocation}
          // style={{width:Theme.wp('60%')}}

          value={location}
        />

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            width: Theme.wp('90%'),
            alignSelf: 'center',
          }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
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
            )}
          />
        </View>
      </View>
      <View
        style={{
          width: Theme.wp('90%'),

          height: Theme.hp('62%'),
          alignSelf: 'center',
        }}>
        <View style={{height: Theme.hp('2%')}} />
        <View
          style={{
            height: Theme.hp('5%'),

            justifyContent: 'center',
          }}>
          <Title
            lable={'Request List'}
            fsize={17}
            fweight={'bold'}
            col={'black'}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={RequestList}
          renderItem={({item}) => <RenderItem request={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={RenderDefaultMessage}
        />
      </View>

      <Modals loader={isLoading} loaderIndicator={true} />
    </View>
  );
};

export default PatientRequest;
