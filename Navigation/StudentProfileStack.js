import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import StudentProfile,{ScreenOptions as StudentProfileScreen} from '../Screens/Students/StudentProfile'
import ViewAttendence,{ScreenOptions as ViewAttendenceScreen} from '../Screens/Students/ViewAttendence';
import UserEditProfile,{ScreenOptions as UserEditProfileScreen} from '../Screens/Students/StudentEditProfile'

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const StudentProfileStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption} initialRouteName={StudentProfile}>
              <Stack.Screen
                name="Student Profile"
                component={StudentProfile}
                options={StudentProfileScreen}
              />
              <Stack.Screen
                name="Edit Profile"
                component={UserEditProfile}
                options={UserEditProfileScreen}
              />
              <Stack.Screen
                name="View Attendence"
                component={ViewAttendence} 
                options={ViewAttendenceScreen}
              />
            </Stack.Navigator>
       )
};

export default StudentProfileStack;