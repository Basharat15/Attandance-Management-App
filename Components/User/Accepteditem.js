import React, { Component } from 'react';
import { View, Text, StyleSheet,Image ,Button} from 'react-native';
import Card from '../../Components/UI/Card'
import { useSelector, useDispatch } from 'react-redux'
import Color from '../../Constants/Colors'

// create a component
const AcceptedLeaveItem = (props) => {
    
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
            
            </View>
            {props.Remarks?<View style={styles.btnContainer}>
              <Text style={styles.Remarks}>{props.Remarks}</Text>
                </View>:null}
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
         alignItems:'center',      
         marginVertical:6
     },
    Remarks:{
        fontSize: 15,
        color: 'black',
        color:Color.primary,
    }
});

//make this component available to the app
export default AcceptedLeaveItem;