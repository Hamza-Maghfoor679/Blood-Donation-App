import {createStackNavigator} from '@react-navigation/stack';
import RequestForBlood from '../../Screens/RequestForBlood/RequestForBlood';
import PatientRequest from '../../Screens/PatientRequest/PatientRequest';
import PatientDetail from '../../Screens/PatientDetail/PatientDetail';

const Stack = createStackNavigator();

function RequestStack() {
  return (
    <Stack.Navigator initialRouteName="RequestForBlood">
      <Stack.Screen
        options={{headerShown: false}}
        name="PatientRequest"
        component={PatientRequest}
      />
         <Stack.Screen
        options={{headerShown: false}}
        name="PatientDetail"
        component={PatientDetail}
      />
    </Stack.Navigator>
  );
}

export default RequestStack;
