import {
  View,
  StatusBar,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BackButton from '../../CustomComponent/BackButton';
import Title from '../../CustomComponent/Title';
import Theme from '../../Utils/Theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Button from '../../CustomComponent/Button';
import {viewDonorRequest} from '../../Utils/Api/Donor/viewDonorRequest';
import {getNear_by_donor} from '../../Utils/Api/Donor/GetNear_by_donor';
import {viewPatientRequest} from '../../Utils/Api/Patient/viewPatientRequest';
import Modals from '../../CustomComponent/Modal';
import {Linking} from 'react-native';
import {handleShare} from '../../Utils/handleShare';
import {patientRequestDelete} from '../../Utils/Api/Patient/patientRequestDelete';
import {logoutUser} from '../../redux/UserSlicee';
import {logObject} from '../../Utils/logObject';
import RequestDelete from '../../CustomComponent/PopUp/RequestSuccessDelete';

const PatientDetail = ({navigation, route}) => {
  const id = route.params.id;
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const [isDonor, setIsDonor] = useState('');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMy, setIsMy] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  console.log(id);

  const getPatientDetails = async () => {
    const {token} = userData;
    const user_id = userData?.id;

    let data = [];
    setIsLoading(true);
    setIsDonor(userData.user_type);

    if (userData.user_type === 'patient') {
      data = await viewDonorRequest(token, id);
      const user_id_in_Request = data?.user_id;
      console.log('user_id_in_Request', user_id_in_Request);
      console.log('user_id', user_id);
      if (user_id_in_Request === user_id) {
        setIsMy(true);
        console.log('isMy', isMy);
      }
    } else {
      data = await viewPatientRequest(token, id);
      const user_id_in_Request = data?.user_id;

      console.log('user_id_in_Resdfest', user_id_in_Request);
      console.log('user_id', user_id);

      if (Number(user_id_in_Request) === Number(user_id)) {
        setIsMy(true);
        console.log('isMy', isMy);
      } else {
        setIsMy(false);
        console.log('isMy', isMy);
      }
      console.log('patient', data);
    }

    setIsLoading(false);
    setData(data);
    console.log('working hard', data);
  };

  const handlePress = () => {
    const _buttonTitle = buttonTitle();
    console.log('buttonTitle', _buttonTitle);
    if (_buttonTitle == 'Edit Request') {
      console.log('Edit Request navigations ');
      console.log('requestTfsdfsdfoEdit', JSON.stringify(data, 2, 4));

      navigation.navigate('RequestForBlood', {requestData: data});
    } else if (_buttonTitle == 'Contact') {
      Linking.openURL(`tel:${data.phone_no}`);
    }

    // if (userData.user_type == 'donor') {
    //   navigation.navigate('RequestForBlood', {
    //     isVisible: true,
    //     Close: () => setIsVisible(false),
    //     Done: () => setIsVisible(false),
    //   });
    // }
  };

  const buttonTitle = () => {
    if (userData.user_type == 'donor') {
      if (isMy) {
        return 'Edit Request';
      }
      return 'Contact';
    }
    if (userData.user_type == 'patient') {
      return 'Contact';
    }
  };
  const getImage = item => {
    if (item?.user?.image) return {uri: item?.user?.image};
    if (item?.image) return {uri: item?.image};

    return null;
  };

  const HandleDelete = async id => {
    const {token} = userData;
    setIsLoading(true);
    const data = await patientRequestDelete(token, id);
    setIsLoading(false);
    console.log('data', data);
    let time = new Date().toLocaleTimeString();
    // return
    navigation.navigate('HomeScreen', {requestAdded: time});
  };

  useEffect(() => {
    getPatientDetails();
  }, [id]);
  return (
    <View
      style={{
        height: Theme.hp('100%'),
        width: Theme.wp('100%'),
        backgroundColor: 'white',
        flex: 1,
      }}>
      <StatusBar backgroundColor={'white'} />

      <ImageBackground
        source={require('../../Asset/PatientDetail.png')}
        resizeMode="cover"
        style={{
          height: Theme.hp('35%'),
          width: Theme.wp('100%'),
          zIndex: 50,
        }}>
        <BackButton
          navigation={() => navigation.goBack()}
          lable={isDonor == 'donor' ? 'Patient Details' : 'Donor Details'}
          black
        />
      </ImageBackground>
      <ScrollView
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          bottom: Theme.hp('3%'),
        }}>
        <View
          style={{
            height: Theme.hp('65%'),
            width: Theme.wp('100%'),
            alignSelf: 'center',
          }}>
          <View style={{height: Theme.hp('3%')}} />
          <View
            style={{
              height: Theme.hp('10%'),

              flexDirection: 'row',

              width: Theme.wp('90%'),
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: Theme.hp('7%'),
                width: Theme.wp('14%'),
                borderRadius: 100,
              }}
              source={getImage(data) ?? require('../../Asset/Profile.png')}
              resizeMode="cover"
            />
            <View style={{width: Theme.wp('60%'), left: Theme.wp('3%')}}>
              <Title
                lable={isDonor === 'patient' ? data?.name : data?.user?.name}
                fsize={16}
                fweight={'bold'}
                col={'black'}
              />
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                width: Theme.wp('15%'),
              }}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 10,
                  backgroundColor: Theme.themecol,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => handleShare(data)}>
                <SimpleLineIcons name={'share-alt'} size={18} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: Theme.hp('1%')}} />

          <View
            style={{
              borderWidth: 1,
              justifyContent:'space-between',
              borderColor: '#E6E6E6',
              width: Theme.wp('90%'),
              alignSelf: 'center',
            }}
          />
         
          <View style={{height: Theme.hp('3%')}} />
          {/* view icon */}
        
          {userData.user_type == 'donor' && (
            <View
              style={{
                position: 'absolute',
                right: Theme.wp('7%'),
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',

                top: Theme.hp('16%'),
              }}>
              <Image
                style={{
                  height: Theme.wp('15%'),
                  width: Theme.wp('15%'),
                  position: 'relative',
                  top: Theme.hp('1%'),
                  left: Theme.wp('1%'),
                }}
                source={require('../../Asset/viewIcon.png')}
                resizeMode="contain"
              />

              <Title
                lable={data?.total_count ?? '0'}
                fsize={Theme.txtMediumR3}
                fweight={'bold'}
                col={'black'}
              />
            </View>
          )}
          <View
            style={{height: Theme.hp('13%'), justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: Theme.wp('90%'),
                alignSelf: 'center',
                gap: Theme.wp('3%'),
              }}>
              <Image
                style={{height: Theme.hp('3%'), width: Theme.wp('6%')}}
                source={require('../../Asset/BloodBg.png')}
                resizeMode="cover"
              />
              <Title
                lable={data?.blood_group + ' Blood Group'}
                fsize={14}
                fweight={'500'}
                col={'black'}
              />
            </View>

            {isDonor === 'patient' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: Theme.wp('90%'),
                  alignSelf: 'center',
                  gap: Theme.wp('3%'),
                }}>
                <Image
                  style={{height: Theme.hp('3%'), width: Theme.wp('6%')}}
                  source={require('../../Asset/Allergies2.png')}
                  resizeMode="cover"
                />
                <Title
                  lable={data?.disease ?? 'No disease '}
                  fsize={14}
                  fweight={'500'}
                  col={'black'}
                />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: Theme.wp('90%'),
                  alignSelf: 'center',
                  gap: Theme.wp('3%'),
                }}>
                <Image
                  style={{height: Theme.hp('3%'), width: Theme.wp('6%')}}
                  source={require('../../Asset/BloodGrBg.png')}
                  resizeMode="cover"
                />
                <Title
                  lable={data?.no_of_blood + ' Bottles Required'}
                  fsize={14}
                  fweight={'500'}
                  col={'black'}
                />
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: Theme.wp('90%'),
                alignSelf: 'center',
                gap: Theme.wp('3%'),
              }}>
              <Image
                style={{height: Theme.hp('3%'), width: Theme.wp('6%')}}
                source={require('../../Asset/LocationBg.png')}
                resizeMode="cover"
              />
              <Title
                lable={data?.location}
                fsize={14}
                fweight={'500'}
                col={'black'}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: Theme.wp('90%'),
                alignSelf: 'center',
                gap: Theme.wp('3%'),
              }}>
              <Image
                style={{height: Theme.hp('3%'), width: Theme.wp('6%')}}
                source={require('../../Asset/Phone.png')}
                resizeMode="cover"
              />
              <Title
                lable={
                  isDonor === 'patient' ? data?.phone_no : data?.user?.phone_no
                }
                fsize={14}
                fweight={'500'}
                col={'black'}
              />
            </View>
          </View>

          {data?.note && (
            <View
              style={{
                height: Theme.hp('18%'),
                justifyContent: 'center',
                width: Theme.wp('90%'),
                alignSelf: 'center',
                marginTop: Theme.hp('2%'),
              }}>
              <Title
                lable={'Note:'}
                col={'black'}
                fsize={16}
                fweight={'bold'}
              />
              <ScrollView>
                <Title
                  numberOfLines={80}
                  textAlign={'justify'}
                  lable={data?.note ?? 'Note'}
                  col={'#969696'}
                  fsize={14}
                  fweight={'400'}
                />
              </ScrollView>
            </View>
          )}
          <View
            style={{
              width: Theme.wp('90%'),
              height: Theme.hp('10%'),
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Button
              onPress={handlePress}
              width={Theme.wp('72%')}
              buttonTitle={buttonTitle()}
              textcolor={userData.user_type == 'donor' ? '#DC3642' : 'white'}
              backgroundColor={
                userData.user_type == 'donor' ? '#FFD9D8' : Theme.themecol
              }
            />

            {/* delete button */}
            {userData.user_type == 'donor' && isMy && (
              <Pressable
                style={{
                  width: Theme.wp('12%'),
                  height: Theme.hp('6%'),

                  borderColor: '#DC3642',
                  borderWidth: 1,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  // handleDelete(id);
                  setIsVisible(true);
                  console.log('delete');
                }}>
                <Image
                  style={{
                    height: '50%',
                    width: '50%',
                  }}
                  source={require('../../Asset/trash.png')}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
      <Modals loader={isLoading} loaderIndicator={true} />
      <RequestDelete
        isVisible={isVisible}
        onDelete={() => {
          HandleDelete(id);
        }}
        Navigation={navigation}
        Close={() => setIsVisible(false)}></RequestDelete>
    </View>
  );
};

export default PatientDetail;
