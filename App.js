import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/RootStack/RootStack';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store, persistor} from './src/redux/Store';
import axios from 'axios';
import { jsiConfigureProps } from 'react-native-reanimated/lib/typescript/reanimated2/core';
import Toast from 'react-native-toast-message';

axios.defaults.baseURL = 'http://dev.kodextech.com/blood-donation/public/api';
axios.interceptors.request.use(config => {
  console.log('Starting Request');
  console.log('Method:', config.method);
  console.log('URL:', config.url);
  console.log('Data:', JSON.stringify( config.data,2,4));
  console.log('Params:', JSON.stringify( config.params));
  return config;
});

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    console.log('Response Status Code:', response.status);
    return response;
  },
  error => {
    console.log('error:',  error);
    return Promise.reject(error);
  },
);

axios.defaults.timeout = 50000; // Set timeout to 5 seconds (adjust as needed)

const RootStackk = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStackk.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <RootStackk.Screen name="AllStack" component={RootStack} />
            </RootStackk.Navigator>
          </NavigationContainer>
          <Toast />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
