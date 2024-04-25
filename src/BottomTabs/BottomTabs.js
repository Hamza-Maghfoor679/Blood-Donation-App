import React from 'react';
import {View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles} from './Style';
import HomeStack from '../Stacks/HomeStack/HomeStack';
import RequestStack from '../Stacks/RequestStack/RequestStack';
import ProfileStack from '../Stacks/ProfileStack/ProfileStack';
import Theme from '../Utils/Theme';

const Tab = createBottomTabNavigator();
const screenOptions = {
  // tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: '#fff',
  },
  tabBarLabelStyle: {
    color: 'black',
  },

  tabBarHideOnKeyboard: true,
};
export default function BottomTabs() {
  const {isDonor} = useSelector(state => state.todos);
  const userData = useSelector(state => state.user);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.View}>
                <Feather
                  name="home"
                  size={23}
                  color={focused ? '#16247d' : '#767A8B'}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name={isDonor == 'donor' ? 'Request' : 'Donor'}
        component={RequestStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.View}>
                {isDonor == 'donor' ? (
                  <Feather
                    name="user-plus"
                    size={24}
                    color={focused ? '#16247d' : '#767A8B'}
                  />
                ) : (
                  <Fontisto
                    name="blood-drop"
                    size={24}
                    color={focused ? '#16247d' : '#767A8B'}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.View}>
                <Feather
                  name="user"
                  size={23}
                  color={focused ? '#16247d' : '#767A8B'}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
