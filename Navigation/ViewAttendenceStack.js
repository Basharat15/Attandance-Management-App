import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import ViewAttendence,{ScreenOptions as ViewAttendenceScreen} from '../Screens/Students/ViewAttendence';

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const ViewAttendenceStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="View Attendence"
                component={ViewAttendence}
                options={ViewAttendenceScreen}
              />
            </Stack.Navigator>
       )
};

export default ViewAttendenceStack;