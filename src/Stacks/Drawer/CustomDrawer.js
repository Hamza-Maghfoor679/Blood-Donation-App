import React from 'react';
import {View, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';
import {useSelector} from 'react-redux';
import {Text} from 'react-native';
import Logout from '../../CustomComponent/Logout';

const CustomDrawer = props => {
  const userData = useSelector(state => state.user);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: Theme.themecol,

          height: '28%',
          width: '100%',

          paddingTop: Theme.hp('5%'),
          borderColor: '#E7E7E7',
          padding: Theme.wp('4%'),
        }}>
        <Image
          style={{
            height: Theme.hp('8%'),
            width: Theme.wp('16%'),
            borderRadius: 100,
          }}
          source={
            userData?.image
              ? {uri: userData.image}
              : require('../../Asset/Profile.png')
          }
          resizeMode="cover"
        />
        <View style={{height: Theme.hp('2%')}} />
        <Title
          lable={userData.name}
          fsize={16}
          fweight={'bold'}
          col={'white'}
        />

        {/* <Title lable={'muhammadali@gmail.com'} fsize={16} col={'white'} /> */}
        {/* <Title lable={userData.user_type} fsize={16} col={'white'} /> */}
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          bottom: Theme.hp('3%'),
        }}>
        <View style={{height: Theme.hp('3%')}} />
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <View
            style={{
              paddingLeft: Theme.wp('5.5%'),
              height: Theme.hp('5%'),
              // width: Theme.wp('50%'),
              // backgroundColor:"green",
              justifyContent: 'center',
            }}>
            <Logout navigation={props.navigation} />
          </View>
        </DrawerContentScrollView>
      </View>
    </View>
  );
};

export default CustomDrawer;
