import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Colors from '../../Constants/Colors';
import * as AdminAuthActions from '../../Store/Actions/AdminAuthAction';

const AdminStartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('AdminData');
      if (!userData) {
        dispatch(AdminAuthActions.DidTryAutoLogin());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(AdminAuthActions.DidTryAutoLogin());
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      // props.navigation.navigate('All Doctors');
      dispatch(AdminAuthActions.AdminAuthenticate(userId, token, expirationTime));
    };

    tryLogin();
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

export default AdminStartupScreen;
