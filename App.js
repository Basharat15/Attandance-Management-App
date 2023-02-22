import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font'

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import AppContainer from './Navigation/AppContainer';
import ReduxThunk from 'redux-thunk';
import AdminAuthReducer from './Store/Reducers/AdminAuthReducer';
import StudentsAuthReducer from './Store/Reducers/StudentsAuthReducer';
import MarkedAttendence from './Store/Reducers/MarkedAttendence'
import UserProfile from './Store/Reducers/UserProfile'
import Leave from './Store/Reducers/LeaveReducer'
import AcceptedLeave from './Store/Reducers/AcceptedLeave'

const rootReducer = combineReducers({
  AmdinAuth: AdminAuthReducer,
  StudentAuth: StudentsAuthReducer,
  MarkedAttendence:MarkedAttendence,
  UserProfile:UserProfile,
  Leave:Leave,
  AcceptedLeave:AcceptedLeave,
})

const store = createStore(rootReducer , applyMiddleware(ReduxThunk));
export default function App() {
  const [loaded]= useFonts({
    RobotoBold: require('./assets/font/RobotoBold.ttf'),
    RobotoLight:require('./assets/font/RobotoLight.ttf'),
    RobotoRegular:require('./assets/font/RobotoRegular.ttf'),
    Bold:require('./assets/font/Bold.ttf'),
    Regular:require('./assets/font/Regular.ttf')
  })
  if(!loaded){
    return null
  }
  return (
    <Provider store ={store}>
   <AppContainer/> 
   </Provider> 
  );
}


