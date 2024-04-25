import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Theme from '../../Utils/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import BackButton from '../../CustomComponent/BackButton';
import {StatusBar} from 'react-native';
import Title from '../../CustomComponent/Title';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { getNotifications } from '../../Utils/Api/Notification/getNotifications';
import Modals from '../../CustomComponent/Modal';
import RenderDefaultMessage from '../../CustomComponent/RenderDefaultMessage';

const Notification = ({navigation}) => {
  const userData = useSelector(state => state.user);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const {token} = userData; // Assuming userData contains the token
        setIsLoading(true);
        const response = await getNotifications(token);
        const notificationsList = response?.NotificationsList;
        console.log('notificationsList', notificationsList);
        // Extracting only the desired attributes: name, message, and blood_group
        const formattedNotifications = notificationsList?.map(notification => ({
          name: notification?.sender?.name,
          id: notification?.id,
          img: notification?.sender?.image,
          description: notification?.message,
          bloodGroup: notification?.sender?.blood_group,
        }));
        setNotifications(formattedNotifications);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          height: Theme.hp('15.5%'),
          width: Theme.wp('90%'),
          alignSelf: 'center',
          borderRadius: 10,
          borderColor: '#8D8D8D',
          borderWidth: 0.3,
          marginVertical: Theme.hp('0.8%'),
          padding: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* Assuming the item object contains attributes: name, description, and bloodGroup */}
          {/* Using a default image for now, you can replace it with the actual image if available */}
          <Image
            style={{height: Theme.hp('6%'), width: Theme.wp('12%')}}
            source={item?.image??require('../../Asset/Flatlist.png')}
            resizeMode="cover"
          />
          <View
            style={{
              height: Theme.hp('13%'),
              justifyContent: 'space-between',
              width: Theme.wp('70%'),
              left: Theme.wp('2%'),
            }}>
            {/* Rendering dynamic data */}
            <Title lable={item.name} fsize={16} fweight={'500'} col={'black'} />
            <Title lable={item.description} fsize={14} col={'#8D8D8D'} />
            <Title lable={item.bloodGroup} col={Theme.themecol} fsize={14} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        height: Theme.hp('100%'),
        width: Theme.wp('100%'),
        backgroundColor: 'white',
      }}>
      <StatusBar backgroundColor={Theme.themecol} />
      <View
        style={{
          height: Theme.hp('10%'),
          width: Theme.wp('100%'),
          backgroundColor: Theme.themecol,
        }}>
        <BackButton
          lable={'Notification'}
          white
          navigation={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          width: Theme.wp('90%'),

          height: Theme.hp('81%'),
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: Theme.hp('5%'),

            justifyContent: 'center',
          }}>
          <Title
            lable={'Yesterday'}
            fsize={16}
            fweight={'bold'}
            col={'black'}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notifications}
          ListEmptyComponent={RenderDefaultMessage}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <Modals loader={isLoading} loaderIndicator={true} />

    </View>
  );
};

export default Notification;
