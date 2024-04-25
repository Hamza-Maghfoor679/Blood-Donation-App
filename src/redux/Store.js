import {configureStore} from '@reduxjs/toolkit';

import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserSlicee from './UserSlicee';
import todosReducer from './Slicee';
import Checks from './Checks';
import ApiResponces from './ApiResponces';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, todosReducer);
const persistedUserReducer = persistReducer(persistConfig, UserSlicee);
const persistedUserChecks = persistReducer(persistConfig, Checks);
const persistedApiResponses = persistReducer(persistConfig, ApiResponces);

export const store = configureStore({
  reducer: {
    todos: persistedReducer,
    user: persistedUserReducer,
    checks: persistedUserChecks,
    ApiResponses: persistedApiResponses
  },
});

export const persistor = persistStore(store);
