import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import AttendenceSheet,{ScreenOptions as ViewAttendenceScreen} from '../Screens/Admin/AttendenceSheet';
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
                name="Attendence sheet"
                component={AttendenceSheet}
                options={ViewAttendenceScreen}
              />
            </Stack.Navigator>
       )
};

export default AdminAuthStack;