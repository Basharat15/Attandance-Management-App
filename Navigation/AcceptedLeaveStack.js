import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import AcceptedLeave,{ScreenOptions as AcceptedLeaveScreen} from '../Screens/Students/AcceptedLeave'

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const AccecptedLeaveStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="Accecpted"
                component={AcceptedLeave}
                options={AcceptedLeaveScreen}
              />
            </Stack.Navigator>
       )
};

export default AccecptedLeaveStack;