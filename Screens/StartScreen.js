import React from 'react';
import { Text, View, Button, StyleSheet, ImageBackground } from 'react-native';
import Colors from '../Constants/Colors';
import CustomButton from '../Components/UI/CustomButton'
import Color from '../Constants/Colors';


const StartScreen = props => {
       return (
              <ImageBackground
                     source={require('../assets/abg1.jpg')}
                     style={styles.screen}
              > 
              <View style={styles.TextContainer}>
                     <Text style={styles.text}>Attendence Management System</Text>
              </View>
                     <View style={styles.container}>
                            <CustomButton onPress={() => { props.navigation.navigate('Admin login') }}
                                   style={styles.AdminButton}
                            >Admin</CustomButton>

                            <CustomButton onPress={() => { props.navigation.navigate('Student Login') }}
                                   style={styles.StudentButton}
                            >Users</CustomButton>

                     </View>
              </ImageBackground>
       );
};

const styles = StyleSheet.create({
       screen: {
              flex: 1,
              width: '100%',
              height: '100%'
              // backgroundColor: '#2c3e50',
       },
       container: {
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              marginTop:200
       },
       StudentButton: {
              width: 270,
              height: 42,
              marginVertical:15,
              backgroundColor:Color.primary,
              opacity:0.9
       },
       AdminButton: {
              width: 270,
              height: 42,
              backgroundColor:Color.primary,
              opacity:0.9
       },
       TextContainer:{
         marginLeft:30,
         marginTop:30
       },
       text:{
         fontSize:30,
         color:Colors.primary,
         fontFamily:'Bold'
       }
})

export const ScreenOptions = navData => {
       return {

              headerStyle: {
                     backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
              },
              headerTitleStyle: {
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
       }
}
export default StartScreen;