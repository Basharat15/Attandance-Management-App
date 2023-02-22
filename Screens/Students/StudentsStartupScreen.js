import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Colors from '../../Constants/Colors';
import * as studentsAuthActions from '../../Store/Actions/StudentsAuthAction';


const StudentStartupScreen=({ navigation })=> {
  const dispatch = useDispatch();

  useEffect(() => {
    const TryLogin = async () => {
      const userData = await AsyncStorage.getItem('StudentData');
      if (!userData) {
        dispatch(studentsAuthActions.DidTryAutoLogin());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(studentsAuthActions.DidTryAutoLogin());
        return;
   
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      // props.navigation.navigate('Doctor Details');
      dispatch(studentsAuthActions.studentsAuthenticate(userId, token, expirationTime));
    };

    TryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StudentStartupScreen;

