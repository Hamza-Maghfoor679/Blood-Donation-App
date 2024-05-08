import {View, ImageBackground, StatusBar, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Theme from '../../Utils/Theme';
import Title from '../../CustomComponent/Title';
import {Text} from 'react-native';
import { isUserExist } from '../../Utils/Api/Auth/isUserExist';
import { useSelector } from 'react-redux';

const Splash = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const userData = useSelector(state => state.user);
  console.log("SplashScreen login status",userData.isLoggedin);

  // Inside your component
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (userData.isLoggedin) {
        console.log("user is logged in")
        navigation.replace('DrawerStack');
      } else {
        console.log("user is not logged in")
        navigation.replace('Welcome');
      }
    }, 3000);

    // Cleanup function to clear the timeout 
    return () => clearTimeout(timeoutId);
  }, [userData.isLoggedin, navigation]); // Dependencies

  return (
    <View style={{height: Theme.hp('100%'), width: Theme.wp('100%')}}>
      <StatusBar backgroundColor={Theme.themecol} />

      <ImageBackground
        style={{
          height: Theme.hp('100%'),
          width: Theme.wp('100%'),
        }}
        source={require('../../Asset/Splash.png')}
        resizeMode="cover">
        <View
          style={{
            height: Theme.hp('95%'),
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: Theme.wp('100%'),
          }}>
          <Title
            lable={'Powered by Kodex Technologies'}
            col={Theme.white}
            fsize={14}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splash;
