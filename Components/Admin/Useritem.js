import React, { Component } from 'react';
import { View, Text, StyleSheet,Image ,Button} from 'react-native';
import Card from '../../Components/UI/Card'
import { useSelector, useDispatch } from 'react-redux'
import Color from '../../Constants/Colors'
import MainButton from '../../Components/UI/CustomButton'

// create a component
const UserProfileItem = (props) => {
    
    return (
        <View style={styles.screen}>
            <Card style={styles.container}>
                <View style={styles.summary}>
                    <Image style={styles.image} source={{ uri:props.image}}/>
                    <View style={styles.attendence}>
                    <Text style={styles.title}>{props.Name}</Text>
                    <Text style={styles.Email}>{props.Email}</Text>
                    </View>
                    {/* <Button title='test' onPress={props.onSelect}/> */}
                </View>
                </Card>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    title: {
        fontFamily: 'Bold',
        fontSize: 17,
        color: 'black',
    
    },
    Email:{
        fontSize: 16,
        color: "#888",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius:35,
    },
    summary: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom:8
    },
    container: {
        margin:20,
         marginVertical:13,
         padding: 10,
         alignItems: 'center',
     },
     attendence:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'     
     },

     btn:{
       width:130,
       height:40,
       marginTop:7
     }
});

//make this component available to the app
export default UserProfileItem;