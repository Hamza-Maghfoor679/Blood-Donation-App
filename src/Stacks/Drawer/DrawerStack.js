import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabs from '../../BottomTabs/BottomTabs';
import Title from '../../CustomComponent/Title';
import Theme from '../../Utils/Theme';

import CustomDrawer from './CustomDrawer';
import ProfileEdit from '../../Screens/ProfileEdit/ProfileEdit';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {logoutUser, setUserData} from '../../redux/UserSlicee';
import PrivacyAndPolicy from '../../Screens/PrivacyAndPolicy/PrivacyAndPolicy';
import TermsAndConditions from '../../Screens/TermsAndConditions/TermsAndConditions';
import ContactUs from '../../Screens/ContactUs/ContactUs';
import {useIsFocused} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function DrawerStack({navigation}) {
  const {isDonor} = useSelector(state => state.todos);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          // drawerActiveBackgroundColor: '#aa18ea',
          // drawerActiveTintColor: '#fff',
          // drawerInactiveTintColor: '#333',
        },
        drawerItemStyle: {
          height: Theme.hp('6%'),
          justifyContent: 'center',
        },
      }}>
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="ProfileEdittt"
        component={ProfileEdit}
        options={{
          drawerLabel: () => <DrawerLabel label={'Profile'} />,
          drawerIcon: () => (
            <DrawerIcon source={require('../../Asset/Person.png')} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="ProfileEdit5"
        component={ProfileEdit}
        options={{
          drawerLabel: () => (
            <DrawerLabel label={isDonor == 'donor' ? 'Request' : 'Donors'} />
          ),
          drawerIcon: () => (
            <DrawerIcon
              source={
                isDonor == 'donor'
                  ? require('../../Asset/Request.png')
                  : require('../../Asset/Donor.png')
              }
            />
          ),
        }}
      /> */}

      <Drawer.Screen
        name="ProfileEdit2"
        component={PrivacyAndPolicy}
        options={{
          drawerLabel: () => <DrawerLabel label={'Privacy Policy'} />,
          drawerIcon: () => (
            <DrawerIcon source={require('../../Asset/PrivacyPolicy.png')} />
          ),
        }}
      />
      <Drawer.Screen
        name="ProfileEdit3"
        component={TermsAndConditions}
        options={{
          drawerLabel: () => <DrawerLabel label={'Terms & Conditions'} />,
          drawerIcon: () => (
            <DrawerIcon
              source={require('../../Asset/TermsAndConditions.png')}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="ProfileEdit4"
        component={ContactUs}
        options={{
          drawerLabel: () => <DrawerLabel label={'Contact Us'} />,
          drawerIcon: () => (
            <DrawerIcon source={require('../../Asset/ContactUs.png')} />
          ),
        }}
      /> */}

    </Drawer.Navigator>
  );
}
export default DrawerStack;




function DrawerIcon({source}) {
  return (
    <View style={styles.DrawerIcon}>
      <Image
        style={{
          height: Theme.hp('6%'),
          width: Theme.wp('6%'),
        }}
        source={source}
        resizeMode="contain"
      />
    </View>
  );
}

function DrawerLabel({label, onPress}) {
  return (
    <View
      style={{
        right: Theme.wp('8%'),
        height: Theme.hp('5%'),
        width: Theme.wp('50%'),
        // backgroundColor:"green",
        justifyContent: 'center',
      }}>
      <Title lable={label} fsize={16} fweight={'400'} col={'black'} />
    </View>
  );
}

const styles = StyleSheet.create({
  DrawerIcon: {
    width: Theme.wp('8%'),
    alignItems: 'center',
  },
});
