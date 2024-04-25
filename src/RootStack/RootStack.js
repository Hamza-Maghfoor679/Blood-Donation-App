import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../Screens/Splash/Splash';
import Welcome from '../Screens/Welcome/Welcome';
import Welcome1 from '../Screens/Welcome1/Welcome1';
import ConnectingDonor from '../Screens/ConnectingDonor/ConnectingDonor';
import JoinUsToday from '../Screens/JoinUsToday/JoinUsToday';
import Profile from '../Screens/Profile/Profile';
import ProfileEdit from '../Screens/ProfileEdit/ProfileEdit';
import DrawerStack from '../Stacks/Drawer/DrawerStack';
import Selection from '../Screens/Selection/Selection';
import OtpScreen from '../Screens/Otp/OtpScreen';
import SampleFirebase from '../Screens/sampleFirebase/sampleFirebase';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        options={{headerShown: false}}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Welcome1"
        component={Welcome1}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OtpScreen"
        component={OtpScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ConnectingDonor"
        component={ConnectingDonor}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="JoinUsToday"
        component={JoinUsToday}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="ProfileEdit"
        component={ProfileEdit}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Selection"
        component={Selection}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DrawerStack"
        component={DrawerStack}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
