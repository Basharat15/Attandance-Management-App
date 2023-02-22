import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import UserLeave,{ScreenOptions as UserLeaveScreen} from '../Screens/Students/UserLeave'

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const UserLeaveStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="User Leave"
                component={UserLeave}
                options={UserLeaveScreen}
              />
            </Stack.Navigator>
       )
};

export default UserLeaveStack;