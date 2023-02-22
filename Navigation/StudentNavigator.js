import * as  React from 'react';
import { Platform, View, Button, SafeAreaView, StyleSheet, TouchableOpacity,Image} from 'react-native'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, MaterialIcons,FontAwesome,AntDesign,Feather ,Entypo } from '@expo/vector-icons'
import Color from '../Constants/Colors';
import * as StudentAuthActions from '../Store/Actions/StudentsAuthAction'
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch
} from 'react-native-paper'
// Screen
import StudentProfileStack from './StudentProfileStack'
import ViewAttendenceStack from './ViewAttendenceStack';
import AccecptedLeaveStack from './AcceptedLeaveStack';
import UserLeaveStack from './UserLeaveStack';
import UserGradeStack from './UserGradeStack';
import MainButton from '.././Components/UI/CustomButton'

const DrawerStackNavigator = createDrawerNavigator()

const UserNavigator = () => {
  const UserProfile = useSelector(state => state.UserProfile.userProfile)

    let Name = UserProfile.map(User => User.Name);
    let ImageUrl = UserProfile.map(User => User.image);
    let Email = UserProfile.map(User => User.Email);
  const dispatch = useDispatch();
  return (
    <DrawerStackNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={styles.drawerContent}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <View style={styles.userInfoSection}>
                <View style={{ marginTop: 10,alignItems:'center',justifyContent:'center',alignContent:'center' }}>
                   <Image style={styles.image} source={{ uri:ImageUrl[0]}}/>
                   <Title style={styles.title}>{Name[0]}</Title>
                   <Caption style={styles.Caption}>{Email[0]}</Caption>
                </View>
                
              </View>
              <View style={styles.row}>
                
                </View>
              <DrawerItemList {...props} />
              <MainButton style={styles.button} onPress={()=>{dispatch(StudentAuthActions.Logout())}}>Logout</MainButton>
   
            </SafeAreaView>
          </View>
        )
      }
      }
    >
      <DrawerStackNavigator.Screen
        name="User Profile"
        component={StudentProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <AntDesign name="user" size={focused ? 23 : 20} color={focused ? 'white' : 'gray'} />
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />
      
      <DrawerStackNavigator.Screen
        name="Attendence Sheet"
        component={ViewAttendenceStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons name="newspaper-sharp" size={focused ? 23 : 20} color={focused ? 'white' : 'gray'} />
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />
       <DrawerStackNavigator.Screen
        name="User Leave"
        component={UserLeaveStack}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="leave-bags-at-home" size={focused ? 23 : 20} color={focused ? 'white' : 'gray'} />
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />
       <DrawerStackNavigator.Screen
        name="Accepted Leave"
        component={AccecptedLeaveStack}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="time-to-leave" size={focused ? 23 : 20} color={focused ? 'white' : 'gray'} />
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      /> 
        <DrawerStackNavigator.Screen
        name="User Grade"
        component={UserGradeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="grade" size={focused ? 23 : 20} color={focused ? 'white' : 'gray'}/>
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      /> 


    </DrawerStackNavigator.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 30
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  
  },
  Caption: {
    fontSize: 15,
    lineHeight: 14,
    // marginLeft:5
  },
  row: {
    marginTop: 15,
    marginVertical: 15,
    borderWidth:1,
    borderColor:Color.primary
  },
  row1: {
    flexDirection: 'column',
    marginLeft: 10,
    alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  Paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
    marginTop: -4
  },
  drawerSection: {
    marginTop: 15
  },
  image: {
    width: 120,
    height: 120,
    borderRadius:60
},
  button:{
    borderRadius:5,
    marginTop:10,
  margin:9,
    height:45,
    // paddingVertical:15
  }
})

export default UserNavigator;