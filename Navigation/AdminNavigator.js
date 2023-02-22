import * as  React from 'react';
import { Platform, View, Button, SafeAreaView, StyleSheet, TouchableOpacity,Image,ImageBackground} from 'react-native'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, MaterialIcons,FontAwesome,AntDesign,Feather ,Entypo } from '@expo/vector-icons'
import Color from '../Constants/Colors';
import * as AdminAuthActions from '../Store/Actions/AdminAuthAction'
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
import AdminStack from './AdminStack'
import AttendenceSheetStack from './AllAttendenceStack.js'
import MainButton from '.././Components/UI/CustomButton'
import LeaveStack from './LeaveStack'

const DrawerStackNavigator = createDrawerNavigator()

const AdminNavigator = () => {
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
            <ImageBackground
          source={require('../assets/bg9.png')}
          style={{padding: 20,height:210}}
          >
          <Image
            source={require('../assets/atn.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 14}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            Admin
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                marginRight: 5,
              }}>
            Admin123@gmail.com
            </Text>
          </View>
        </ImageBackground>
              <View style={styles.row}>
                
                </View>
              <DrawerItemList {...props} />
              <MainButton style={styles.button} onPress={()=>{dispatch(AdminAuthActions.Logout())}}>Logout</MainButton>
   
            </SafeAreaView>
          </View>
        )
      }
      }
    >
      <DrawerStackNavigator.Screen
        name="All Users"
        component={AdminStack}
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
        component={AttendenceSheetStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Entypo name="spreadsheet" size={focused ? 23 : 20} color={focused ? 'white' : 'gray'} />
          ),
          headerShown: false,
          drawerActiveTintColor: 'white',
          drawerActiveBackgroundColor: Color.primary
        }}
      />
       <DrawerStackNavigator.Screen
        name="Leave portal"
        component={LeaveStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Entypo name="spreadsheet" size={focused ? 23 : 20} color={focused ? 'white' : 'gray'} />
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

export default AdminNavigator;