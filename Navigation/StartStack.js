import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import startScreen, {ScreenOptions as StartScreenOptions} from '../Screens/StartScreen';
import AdminLoginScreen ,{ScreenOptions as adminScreenOptions}from '../Screens/Admin/AdminLoginScreen'
// import AdminSignUpScreen from '../Screens/Admin/AdminSignUpScreen'
import StudentsLoginScreen,{ScreenOptions as StudentloginScreenOptions} from '../Screens/Students/StudentsLoginScreen'
import StudentSignUpScreen,{ScreenOptions as StudentSignUpStartScreenOptions} from '../Screens/Students/StudentSignUpScreen'

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const StartStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="Start"
                component={startScreen}
                options={StartScreenOptions}
              />
              <Stack.Screen
                name="Admin login"
                component={AdminLoginScreen}
                options={adminScreenOptions}
              />
              {/* <Stack.Screen
                name="Admin SignUp"
                component={AdminSignUpScreen}
              /> */}
               <Stack.Screen
                name="Student Login"
                component={StudentsLoginScreen}
                options={StudentloginScreenOptions}
              />
               <Stack.Screen
                name="Student SignUp"
                component={StudentSignUpScreen}
                options={StudentSignUpStartScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default StartStack;