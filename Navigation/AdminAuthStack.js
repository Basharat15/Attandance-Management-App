import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import AdminAuthScreen from '../Screens/Admin/AdminAuthScreen'

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const AdminAuthStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="Admin"
                component={AdminAuthScreen}
                // options={DoctorAuthScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default AdminAuthStack;