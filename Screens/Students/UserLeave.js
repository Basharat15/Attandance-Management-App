import React, { useCallback, useEffect, useState,useReducer } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator, Modal, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AcceptedLeaveitem from '../../Components/User/Accepteditem'
import HeaderButton from '../../Components/UI/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import Colors from '../../Constants/Colors';
import * as UserLeaveAction from '../../Store/Actions/LeaveAction'

const UserLeave = props => {
  const [Isrefreshing, SetIsrefreshing] = useState(false)
  const [Isloading, Setisloading] = useState(false);
  const [Error, SetError] = useState();
  const dispatch = useDispatch();

  const UserProfile = useSelector(state => state.UserProfile.userProfile)
  let Name = UserProfile.map(User => User.Name);

  const UserLeave = useSelector(state=>state.Leave.Leave)

  const LoadedUserLeave = useCallback(async () => {

      SetError(null);
      SetIsrefreshing(true);
      try {
             await dispatch(UserLeaveAction.fetchLeave());
            //  console.log(AcceptedLeave)
      } catch (err) {
          SetError(err.message);
      }
      SetIsrefreshing(false);
}, [dispatch, Setisloading, SetError]);

useEffect(() => {
      const willFocusSub = props.navigation.addListener('willFocus', LoadedUserLeave)

      return () => {
             willFocusSub.remove();
      }
}, [LoadedUserLeave]);
useEffect(() => {
  Setisloading(true);
  LoadedUserLeave().then(() => {
          Setisloading(false);
      })
}, [dispatch, LoadedUserLeave]);

      


  if (Isloading) {
      return (
          <View style={styles.Centered}>
              <ActivityIndicator
                  size='large'
                  color={Colors.primary}
              />
          </View>
      )
  }
  if (!Isrefreshing &&  UserLeave.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Leave found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
      <View style={styles.container}>
          <Text style={styles.containertext}>Your Leave</Text>
          <Text style={styles.Nametext}>{Name[0]}</Text>
          <FlatList
              onRefresh={LoadedUserLeave}
              refreshing={Isrefreshing}
              keyExtractor={item => item.id}
              data={UserLeave}
              renderItem={itemData => {
                  return (
                    // <Text>{itemData.item.Name}</Text>
                      <AcceptedLeaveitem 
                      Name={itemData.item.Name}
                      FromDate={itemData.item.FromDate}
                      ToDate={itemData.item.ToDate}
                      date={itemData.item.readableDate}
                      />
                      
                  )
              }}
          />
      </View>
  );
};

export const ScreenOptions = navData => {
  return {
      headerTitle: 'User Leave',
      headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
      },
      headerTitleStyle: {
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,

      headerLeft: () => {
          return (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                      title="Menu"
                      iconName={Platform.OS === 'android' ? 'menu' : 'menu'}
                      onPress={() => {
                          navData.navigation.toggleDrawer();
                      }}
                  />
              </HeaderButtons>
          )
      },
  }
}
// define your styles
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      marginTop:10
  },
  containertext: {
    fontSize: 20,
    fontFamily: 'Bold',
    color: Colors.primary,
    marginVertical: 10
},
Nametext: {
    fontSize: 20,
    fontFamily: 'Bold',
    color: Colors.primary,
    marginBottom: 10
}, 
warning_modal: {
    width: 290,
    height: 290,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 30,
},
warning_modal_Error: {
    width: 250,
    height: 250,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 30,
},
warning_title: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
},
center_View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099'
},
reset: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
},
warning_Message: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
},
text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black'
},
text1: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
},
centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099'
},
button: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 19,
    elevation: 5,
    width: 100,
    margin: 5,
    backgroundColor: Colors.primary
},
cnfrimBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -20
},
Centered: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
},
text2: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'Bold',
    textAlign: 'center'
},
AuthContainer: {
    width: 280,
    height: 270,
    padding: 40,
    marginTop: 100,
    backgroundColor: 'white'
},
useInfo: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: Colors.primary,
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
},
useInfoText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Regular'
},
btnContainerModal: {
    flex: 1,
    marginTop: 23,
    width: 100,
    marginHorizontal: 60,
    marginLeft: 50
},
});

export default UserLeave;