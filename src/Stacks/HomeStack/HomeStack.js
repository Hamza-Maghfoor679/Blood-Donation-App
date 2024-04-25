import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../Screens/Home/Home';
import Notification from '../../Screens/Notification/Notification';
import PatientDetail from '../../Screens/PatientDetail/PatientDetail';
import RequestForBlood from '../../Screens/RequestForBlood/RequestForBlood';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Notification"
        component={Notification}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PatientDetail"
        component={PatientDetail}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="RequestForBlood"
        component={RequestForBlood}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
