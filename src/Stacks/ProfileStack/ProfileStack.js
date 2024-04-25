import {createStackNavigator} from '@react-navigation/stack';

import ProfileEdit from '../../Screens/ProfileEdit/ProfileEdit';
import Profile from '../../Screens/Profile/Profile';

const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="ProfileEditt">
      <Stack.Screen
        options={{headerShown: false}}
        name="ProfileEditt"
        component={ProfileEdit}
        initialParams={{customHeight: true}}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Profilee"
        component={Profile}
        initialParams={{customHeight: true}}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
