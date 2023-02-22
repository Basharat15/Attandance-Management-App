import React, { Component } from 'react';
import { View, Text, StyleSheet,Image ,Button} from 'react-native';
import Card from '../../Components/UI/Card'
import { useSelector, useDispatch } from 'react-redux'
import Color from '../../Constants/Colors'
import MainButton from '../../Components/UI/CustomButton'

// create a component
const UserLeaveItem = (props) => {
    
    return (
        <View style={styles.screen}>
        <Card style={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.title}>{props.Name}</Text>
                <View style={styles.attendence}>
                <Text style={styles.date}>{props.date}</Text>
                <View style={styles.attendenceContainer}>
                <Text style={styles.MarkedAttendence}>From {props.FromDate}</Text>
                <Text style={styles.MarkedAttendence}> To {props.ToDate}</Text>
                </View>
                </View>
               
                {/* <Button title='test' onPress={()=>{
                    console.log(ImageUrl[0])
                }}/> */}
            </View>
            <View style={styles.btnContainer}>
                <MainButton 
                style={styles.acceptbtn}
                 onPress={props.onAccept}
                //  disabled={props.disabled}
                  >Accept</MainButton>
                    <MainButton style={styles.concelbtn} onPress={props.onDelete}>Decline</MainButton>
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
        fontSize: 15,
        color: 'black',
        marginLeft:5,
        marginTop:-30
    },
    image: {
        width: 60,
        height: 60,
        borderRadius:30,
       marginRight:60
    },
    summary: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
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
     },
     MarkedAttendence:{
        fontFamily: 'Bold',
        fontSize: 15,
        color: 'black',
        
     },
     date:{
        fontSize: 15,
        color: 'black',
        marginLeft:60,
        color:Color.primary
     },
     attendenceContainer:{
        backgroundColor:'white',
        height:30,
        width:250,
       paddingHorizontal:17,
       borderRadius:10,
       paddingVertical:3,
       borderWidth:1,
       borderColor:Color.primary,
       marginTop:10,
       flexDirection:'row'
     },
     btnContainer:{
        flex:1,
       width:'100%',
         flexDirection:'row',
         justifyContent:'space-between',
         alignContent:'space-between',
         marginVertical:6
     },
     acceptbtn:{
      width:100,
      borderRadius:20,
      paddingVertical:7,
      height:37
     },
     concelbtn:{
        width:100,
        borderRadius:20,
        paddingVertical:7,
        height:37
     }
});

//make this component available to the app
export default UserLeaveItem;