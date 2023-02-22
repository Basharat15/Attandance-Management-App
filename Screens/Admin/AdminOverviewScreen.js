import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, Button, ActivityIndicator, StyleSheet, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Useritem from '../../Components/Admin/Useritem'
import HeaderButton from '../../Components/UI/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import Colors from '../../Constants/Colors';
import * as UserProfileAction from '../../Store/Actions/UserProfile'
// import * as doctorsActions from '../../store/actions/DoctorsAction'

// import DoctorItemButton from '../../components/UI/DoctorItemButton';

const DoctorsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const AllUser = useSelector(state => state.UserProfile.AllProfile);
  const viewAttendence = useSelector(state => state.MarkedAttendence.Attendence)
  const size = viewAttendence.length;

  const loadUserProfile = useCallback(async () => {

    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(UserProfileAction.fetchData());
      console.log(size)
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadUserProfile)

    return () => {
      willFocusSub.remove();
    }
  }, [loadUserProfile]);

  const selectItemHandler = () => {
    props.navigation.navigate('User Attendence');
  };

  useEffect(() => {
    setIsLoading(true);
    loadUserProfile().then(() => {
      setIsLoading(false);
    })
  }, [dispatch, loadUserProfile]);


  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadUserProfile}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isRefreshing && AllUser.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No User found. Maybe start adding some!</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
   <Text style={styles.containertext}>All Users</Text>
      <FlatList
        onRefresh={loadUserProfile}
        refreshing={isRefreshing}
        data={AllUser}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <Useritem
          Name={itemData.item.Name}
          Email={itemData.item.Email}
          image={itemData.item.image}

              onSelect={() => {
                props.navigation.navigate('User Attendence', {
                    Name: itemData.item.Name,
                    Email: itemData.item.Email,
                    image:itemData.item.image
                })
            }}
      />
        )}

      />
    </View>
  );
};

export const ScreenOptions = navData => {
  return {
      headerTitle: 'Admin',
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

const styles = StyleSheet.create(
  {
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    containertext:{
      fontSize:22,
      fontFamily:'Bold',
      color:Colors.primary,
      marginVertical:10,
      textAlign:'center',
      marginTop:15
    },
    screen: {
      flex: 1,
    },
    containerText: {
      alignItems: 'center',
      marginVertical: 10,
  },
  text1: {
      alignItems: 'center',
      fontSize: 20,
      fontFamily: 'Bold',
      color: Colors.primary
  },

  centerView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000099'
  },
  AuthContainer: {
      width: 330,
      height: 590,
      padding: 40,
      marginTop: 100,
      backgroundColor: 'white'
  },
  useInfo: {
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: Colors.primary,
      height: 40,
      justifyContent: 'center',
      borderRadius: 5
  },
  useInfoText: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Regular'
  },
  btnContainer: {
      flex: 1,
      marginTop: 35,
      width: 100,
      marginHorizontal: 70
  },
  warning_modal: {
      width: 250,
      height: 250,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: Colors.primary,
      borderRadius: 20,
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
  warning_Message: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 180,

  },
  text: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      color: 'black'
  },
  reset: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: Colors.primary,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
  },
  Centered: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
  },

  })

export default DoctorsOverviewScreen;