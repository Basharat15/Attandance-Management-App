//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image ,Button} from 'react-native';
import Card from '../../Components/UI/Card'
import { useSelector, useDispatch } from 'react-redux'
import Color from '../../Constants/Colors'
import MainButton from '../../Components/UI/CustomButton'

// create a component
const AllAttendenceView = (props) => {
    const UserProfile = useSelector(state => state.UserProfile.userProfile)

    let ImageUrl = UserProfile.map(User => User.image);
    
    return (
        <View style={styles.screen}>
            <Card style={styles.container}>
                {/* <Text style={styles.time}>{props.time}</Text>  */}
                <View style={styles.summary}>
                    {/* <Image style={styles.image} source={{ uri:ImageUrl[0]}}/> */}
                    <Text style={styles.title}>{props.Name}</Text>
                    <View style={styles.attendence}>
                    <Text style={styles.date}>{props.date}</Text>
                    <View style={styles.attendenceContainer}>
                    <Text style={styles.MarkedAttendence}>{props.attendence}</Text>
                    </View>
                    </View>
                    {/* <Button title='test' onPress={()=>{
                        console.log(ImageUrl[0])
                    }}/> */}
                </View>
                <View style={styles.btnContainer}>
                    <MainButton style={styles.addbtn} onPress={props.onAdd}>Add</MainButton>
                    <MainButton style={styles.editbtn} onPress={props.onEdit}>Edit</MainButton>
                    <MainButton style={styles.delbtn} onPress={props.onDelete}>Delete</MainButton>
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
        // marginLeft:25,
        // marginTop:30
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
        marginLeft:5,
        color:Color.primary
     },
     attendenceContainer:{
        backgroundColor:'white',
        height:30,
        width:100,
        marginLeft:80,
       paddingHorizontal:17,
       borderRadius:10,
       paddingVertical:3,
       borderWidth:1,
       borderColor:Color.primary,
       marginTop:10
     },
     btnContainer:{
        flex:1,
       width:'100%',
         flexDirection:'row',
         justifyContent:'space-between',
         alignContent:'space-between',
         marginVertical:6
     },
     addbtn:{
      width:90,
      borderRadius:10,
      paddingVertical:7,
      height:37
     },
     editbtn:{
        width:90,
        borderRadius:10,
        paddingVertical:7,
        height:37
     },
     delbtn:{
        width:90,
        borderRadius:10,
        paddingVertical:7,
        height:37
     }
});

//make this component available to the app
export default  AllAttendenceView;