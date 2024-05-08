import {configureStore} from '@reduxjs/toolkit';

import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserSlicee from './UserSlicee';
import todosReducer from './Slicee';
import Checks from './Checks';
import ApiResponces from './ApiResponces';
import RememberState from './remeberReducer';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, todosReducer);
const persistedUserReducer = persistReducer(persistConfig, UserSlicee);
const persistedUserChecks = persistReducer(persistConfig, Checks);
const persistedApiResponses = persistReducer(persistConfig, ApiResponces);
const persistedRememberStateReducer = persistReducer(persistConfig, RememberState);

export const store = configureStore({
  reducer: {
    todos: persistedReducer,
    user: persistedUserReducer,
    checks: persistedUserChecks,
    ApiResponses: persistedApiResponses,
    RememberState: persistedRememberStateReducer
  },
});

export const persistor = persistStore(store);
