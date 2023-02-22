import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import StudentsAuthScreen from '../Screens/Students/StudentsAuthScreen'

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const StudentsAuthStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="Students"
                component={StudentsAuthScreen}
                // options={DoctorAuthScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default StudentsAuthStack;