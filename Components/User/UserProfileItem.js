import React,{useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, Platform, Image ,Button} from 'react-native';
import Colors from '../../Constants/Colors'
import MainButton from '../../Components/UI/CustomButton'

const UserProfileItem = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.imgContainer}>
            <Image style={styles.img} source={{ uri: props.image }}/>
            </View>
            <Text style={styles.title}>{props.Name}</Text>
            <Text style={styles.mail}>{props.Email}</Text> 
           <MainButton style={styles.btn} onPress={props.onSelect}>Edit Profile</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    imgContainer: {
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        
        // marginTop:'20%'
        marginTop:30,
        // marginLeft:90

    },
    img: {
        height: 180,
        width: 180,
        borderRadius: 90,
        // backgroundColor:'blue'
    },
    title: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'RobotoBold',
        // marginTop:5,
        // marginLeft: 5,
        marginBottom: 2

    },
    mail: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        fontFamily: 'RobotoRegular',
        marginBottom: 10
    },
    btn:{
        width:150,
        height:40,
        // marginLeft:125,

    }
  
    
});

export default UserProfileItem;