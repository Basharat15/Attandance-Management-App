import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import LeaveScreen,{ScreenOptions as LeaveScreenOption} from '../Screens/Admin/LeaveScreen'

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
                name="Leave"
                component={LeaveScreen}
                options={LeaveScreenOption}
              />
            </Stack.Navigator>
       )
};

export default AdminAuthStack;