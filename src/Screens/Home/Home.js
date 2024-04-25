import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Share,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Theme from '../../Utils/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector, useDispatch} from 'react-redux';

import BackButton from '../../CustomComponent/BackButton';
import InputField, {
  BloodDonationHistory,
  DonorDonationHistory,
  DonorHistory,
} from '../../CustomComponent/InputField';
import {StatusBar} from 'react-native';
import Title from '../../CustomComponent/Title';
import AddDonationDate from '../../CustomComponent/PopUp/AddDonationDate';
import {dispatchIsDonor} from '../../redux/Slicee';
import {getPatientBloodRequest} from '../../Utils/Api/Patient/getPatientBloodRequest';
import {logoutUser, setUserData} from '../../redux/UserSlicee';
import {registerUser} from '../../Utils/Api/Auth/registerUser';
import {getNear_by_donor} from '../../Utils/Api/Donor/GetNear_by_donor';
import {getPatientBloodRequestList} from '../../Utils/Api/Patient/getPatientBloodRequestList';
import Modals from '../../CustomComponent/Modal';
import {Linking} from 'react-native';
import {handleShare} from '../../Utils/handleShare';
import RenderDefaultMessage from '../../CustomComponent/RenderDefaultMessage';
import {logObject} from '../../Utils/logObject';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {useIsFocused} from '@react-navigation/native';
import {isFulfilled} from '@reduxjs/toolkit';
import {ScreenStackHeaderCenterView} from 'react-native-screens';
import {setChecks} from '../../redux/Checks';
import {setApiResponses} from '../../redux/ApiResponces';

const Home = ({navigation, route}) => {
  const isFocused = useIsFocused();
  if (route?.params?.InitialDataRender) {
    console.log('inital');
  }

  console.log(
    '>_______________________________________>',
    route?.params?.requestAdded,
  );
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const checks = useSelector(state => state.checks);
  const ApiResponses = useSelector(state => state.ApiResponses);

  const [donorRequest, setDonorRequest] = useState('donor'); // ['Donor', 'Patient']
  const [patientRequest, setPatientRequest] = useState('patient'); // ['Donor', 'Patient'
  // const {isDonor} = useSelector(state => state.todos);
  const [isDonor, setIsDonor] = useState('donor'); // ['Donor', 'Patient'
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleTimer, setIsVisibleTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestAdded, setRequestAdded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  console.log(checks?.InitialDataRender);
  console.log('is donoer', isDonor);

  const getNearbyDonor = async () => {
    try {
      const {token} = userData;
      const data = await getNear_by_donor(token);

      // console.log(data);
      dispatch(setApiResponses({NearbyDonor: data}));

      const {blood_request_check, donorData} = data;

      // console.log(JSON.stringify(data, 2, 4));

      if (donorData && donorData.near_by_donor) {
        const {near_by_donor, user_blood_request} = donorData;
        setData(near_by_donor);

        setPatientRequest({
          ...user_blood_request,
          name: userData?.name,
          image: userData?.image,
        });
        setIsVisibleTimer(blood_request_check === 1);
      }
    } catch (error) {
      console.error('Error fetching nearby donor data:', error);
      // Handle the error as needed
    }
  };

  const getNearPatientBloodRequest = async () => {
    try {
      const {token} = userData;
      console.log('tokenerkekrj');
      console.log(userData);
      const data = await getPatientBloodRequest(token);

      dispatch(setApiResponses({NearPatientBloodRequest: data}));

      const {requestData, blood_donate_check} = data;

      if (requestData) {
        setData(requestData.near_by_request);
        setDonorRequest({
          ...requestData?.user_donor_data,
          name: userData?.name,
          image: userData?.image,
        });
        console.log('donorjhjkhkjhjkhjkhjhjhjkhj');

        console.log(donorRequest);
        setIsVisibleTimer(blood_donate_check === 1);
        if (requestAdded) {
          setIsVisibleTimer(true);
        }
      } else {
        console.log('no data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    setIsLoading(true);
    setData([]);
    dispatch(
      setUserData({user_type: isDonor == 'donor' ? 'patient' : 'donor'}),
    );
    dispatch(dispatchIsDonor(isDonor == 'donor' ? 'patient' : 'donor'));
    setIsDonor(isDonor == 'donor' ? 'patient' : 'donor');
    // console.warn('type ', isDonor);
    console.log('type ', isDonor);
    if (isDonor === 'donor') {
      await getNearbyDonor();
    } else if (isDonor === 'patient') {
      await getNearPatientBloodRequest();
    } else {
      console.warn('the user type is not correct ');
    }

    setIsLoading(false);
  };

  const getImage = item => {
    if (item?.user?.image) return {uri: item?.user?.image};
    if (item?.image) return {uri: item?.image};

    return null;
  };

  const getDataOnResh = async () => {
    // setIsDonor(isDonor === 'patient' ? 'donor' : 'patient');

    setIsRefreshing(true);
    setIsVisibleTimer(false);
    await getData();

    setIsRefreshing(false);
  };

  // useEffect(() => {
  //   console.log('home is donor');
  //   setIsDonor(userData.user_type); // Set the isDonor value
  // }, [userData.user_type]);

  if (checks?.InitialDataRender == true) {
    console.log('initial rendeer ');
    // setIsDonor("patient")
    getData();
    dispatch(setChecks({InitialDataRender: false}));
  }

  useEffect(() => {
    if (route?.params?.requestAdded) {
      console.warn('requestAdded');
      console.log('route?.params?.requestAdded');
      getData();
    }
  }, [route?.params?.requestAdded]);

  // load user data from the redux store 
  useEffect(() => {
    if (checks?.InitialDataRender) return
    if (data.length <= 0) {
      console.log('setting persisted response h ');
     
      console.log(isDonor);
      console.log(ApiResponses?.NearbyDonor);
      // return

      if (isDonor == 'patient') {
        if (ApiResponses?.NearbyDonor == null) return;
        const {blood_request_check, donorData} = ApiResponses?.NearbyDonor;
        if (donorData && donorData.near_by_donor) {
          const {near_by_donor, user_blood_request} = donorData;
          setData(near_by_donor);

          setPatientRequest({
            ...user_blood_request,
            name: userData?.name,
            image: userData?.image,
          });
          setIsVisibleTimer(blood_request_check === 1);
        }
      } else if (isDonor == 'donor') {
        if (ApiResponses?.NearPatientBloodRequest == null) return;

        const {requestData, blood_donate_check} =
          ApiResponses?.NearPatientBloodRequest;
        setData(requestData?.near_by_request);
        setDonorRequest({
          ...requestData?.user_donor_data,
          name: userData?.name,
          image: userData?.image,
        });
        setIsVisibleTimer(blood_donate_check === 1);
      }
    }
  }, []);

  const RenderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PatientDetail', {id: item.id})}
        style={{
          // height: isDonor == 'donor' ? .heme.hp('20%') : Theme.hp('14%'),
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
            source={getImage(item) ?? require('../../Asset/Profile.png')}
            resizeMode="cover"
          />
          <View
            style={{
              // height: Theme.hp('10%'),
              justifyContent: 'space-between',

              width: Theme.wp('45%'),
              left: Theme.wp('2%'),
            }}>
            <Title
              lable={isDonor === 'donor' ? item?.user?.name : item?.name}
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
              <Title lable={item.location} fsize={14} col={'#8D8D8D'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: Theme.wp('1.2%'),
              }}>
              <Feather name={'phone'} size={14} color={'#8D8D8D'} />
              <Title lable={item.phone_no} fsize={14} col={'#8D8D8D'} />
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
              }}
              onPress={() => handleShare(item)}>
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
              <Text>{item.note}</Text>
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
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
          height: isVisibleTimer ? Theme.hp('35%') : Theme.hp('20%'),
          width: Theme.wp('100%'),
        }}>
        <BackButton
          navigation={() => navigation.goBack()}
          lable={'Dashboard'}
          noti
          drawer
          black
          refff
          notification={() => navigation.navigate('Notification')}
          drawerOpen={() => navigation.openDrawer()}
          refresher={() => {
            setIsVisibleTimer(false);
            // dispatch(dispatchIsDonor(isDonor == 'donor' ? 'patient' : 'donor'))
            setIsDonor(isDonor == 'donor' ? 'patient' : 'donor');

            getDataOnResh();
          }}
        />

        {!isVisibleTimer && !isRefreshing && (
          <DonorHistory
            buttonTitle={
              isDonor == 'donor' ? 'Add Donation Date' : 'Request for Blood'
            }
            source={
              isDonor == 'donor'
                ? require('../../Asset/DonationHistory.png')
                : require('../../Asset/HomePatient.png')
            }
            onPress={() => {
              isDonor == 'donor'
                ? setIsVisible(true)
                : navigation.navigate('RequestForBlood');
            }}
          />
        )}

        {isVisibleTimer && isDonor == 'donor' && (
          <DonorDonationHistory donor={donorRequest} />
        )}
        {isVisibleTimer && isDonor == 'patient' && (
          <BloodDonationHistory user={patientRequest} />
        )}
      </View>

      <View
        style={{
          width: Theme.wp('90%'),

          height: isVisibleTimer ? Theme.hp('56%') : Theme.hp('71%'),
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: Theme.hp('5%'),

            justifyContent: 'center',
          }}>
          <Title
            lable={isDonor == 'donor' ? 'Request List' : 'Donor List'}
            fsize={17}
            fweight={'bold'}
            col={'black'}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => <RenderItem item={item} />}
          keyExtractor={item => item.id}
          ListEmptyComponent={RenderDefaultMessage}
        />
      </View>
      <AddDonationDate
        isVisible={isVisible}
        Close={() => setIsVisible(false)}
        Done={async () => {
          setIsVisible(false);
          await getData();
          setIsVisibleTimer(true);
        }}
      />

      <Modals loader={isLoading} loaderIndicator={true} />
    </View>
  );
};

export default Home;
