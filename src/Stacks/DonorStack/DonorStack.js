import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../Screens/Home/Home';

const Stack = createStackNavigator();

function DonorStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
}

export default DonorStack;
