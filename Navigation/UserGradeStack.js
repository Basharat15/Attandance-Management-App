import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import UserGrade,{ScreenOptions as UserGradeScreen} from '../Screens/Students/UserGradeScreen';

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const UserGradeStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="Grade"
                component={UserGrade}
                options={UserGradeScreen}
              />
            </Stack.Navigator>
       )
};

export default UserGradeStack;