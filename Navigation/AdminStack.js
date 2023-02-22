import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import AdminOverview,{ScreenOptions as AdminOverViewScreen} from '../Screens/Admin/AdminOverviewScreen'
import ViewUserAttendence,{ScreenOptions as ViewUserAttendenceScreen} from '../Screens/Admin/ViewUserAttendence';

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
                component={AdminOverview}
                options={AdminOverViewScreen}
              />
              <Stack.Screen
                name="User Attendence"
                component={ViewUserAttendence}
                options={ViewUserAttendenceScreen}
              />
            </Stack.Navigator>
       )
};

export default AdminAuthStack;