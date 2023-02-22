//import liraries
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet,FlatList,Button,ActivityIndicator,ImageBackground,Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../../Constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton'
import * as MarkedAttendenceAction from '../../Store/Actions/MarkedAttendence';
import * as AcceptedLeaveAction from '../../Store/Actions/AcceptedLeave'
// create a component
const GradeScreen = (props) => {
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [Isloading, Setisloading] = useState(false);
    const [Error, SetError] = useState();
    const dispatch = useDispatch();
    const viewAttendence = useSelector(state => state.MarkedAttendence.Attendence)
    const present = viewAttendence.filter(MarkedAttendence=> MarkedAttendence.attendence.toUpperCase().trim() !== 'Absent'.toUpperCase().trim())
    const size = present.length;
    const Absent = viewAttendence.filter(MarkedAttendence=> MarkedAttendence.attendence.toUpperCase().trim() !== 'Present'.toUpperCase().trim())
    const sizeAbsent = Absent.length;
    const AcceptedLeave = useSelector(state=>state.AcceptedLeave.AcceptedLeave)
    const sizeLeave = AcceptedLeave.length;
    const UserProfile = useSelector(state => state.UserProfile.userProfile)

    const LoadedAttendence = useCallback(async () => {

        SetError(null);
        SetIsrefreshing(true);
        try {
               await dispatch(MarkedAttendenceAction.fetchAttendence());
            //    console.log(viewAttendence)
        } catch (err) {
            SetError(err.message);
        }
        SetIsrefreshing(false);
 }, [dispatch, Setisloading, SetError]);

 useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', LoadedAttendence)

        return () => {
               willFocusSub.remove();
        }
 }, [LoadedAttendence]);
 useEffect(() => {
    Setisloading(true);
        LoadedAttendence().then(() => {
            Setisloading(false);
        })
 }, [dispatch, LoadedAttendence]);

 const LoadedAcceptedLeave = useCallback(async () => {

    SetError(null);
    SetIsrefreshing(true);
    try {
           await dispatch(AcceptedLeaveAction.fetchAcceptedLeave());
        //    console.log(AcceptedLeave)
    } catch (err) {
        SetError(err.message);
    }
    SetIsrefreshing(false);
}, [dispatch, Setisloading, SetError]);

useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', LoadedAcceptedLeave)

    return () => {
           willFocusSub.remove();
    }
}, [LoadedAcceptedLeave]);
useEffect(() => {
Setisloading(true);
LoadedAcceptedLeave().then(() => {
        Setisloading(false);
    })
}, [dispatch, LoadedAcceptedLeave]);

    let Name = UserProfile.map(User => User.Name);
    let Email = UserProfile.map(User => User.Email);
    let image = UserProfile.map(User => User.image);
    let Grade
    // let size= 15
    if(size<=26){
        Grade='A'
    }
    if(size<=20){
        Grade='B'
    }
    if(size<=15){
        Grade='C'
    }
    if(size<=10){
        Grade='D'
    }
    if(size<=5){
        Grade='F'
    }
    if (Isloading) {
        return (
            <View style={styles.Centered}>
                <ActivityIndicator
                    size='large'
                    color={Color.primary}
                />
            </View>
        )
    }
    return (
     <ImageBackground
            source={require('../../assets/bg3.jpg')}
            style={styles.container}
        >
        <View style={styles.screen}>
             <Text style={styles.welcome}>Welcome To Our Grade System</Text>
            <Text style={styles.Attendence}> Total Present: {size}</Text>
            <Text style={styles.Absent}> Total Absent: {sizeAbsent}</Text>
            <Text style={styles.Leave}> Total Leave: {sizeLeave}</Text>
        <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: image[0] }}/>
        </View>
        <Text style={styles.title}>{Name[0]}</Text>
        <Text style={styles.mail}>{Email[0]}</Text> 
        
        <View style={styles.attendenceContainer}>
        <Text style={styles.Grade}>Grade: {Grade}</Text>
        </View>
    </View>
    </ImageBackground>
    );
};

export const ScreenOptions = navData => {
    return {
        headerTitle: 'User Grade',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,

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
    screen: {
        flex: 1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
        // backgroundColor: '#2c3e50',
    },
    welcome:{
        fontSize: 22,
        color: Color.primary,
        textAlign: 'center',
        fontFamily: 'Bold',
        marginBottom:40
    },
    Attendence:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Bold',
         marginTop:-20,
         marginVertical:5
    },
    Absent:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Bold',
        //  marginTop:-20
        marginVertical:5
    },
    Leave:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Bold',
        //  marginTop:-20
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
    Grade:{
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Bold',
        marginLeft:20
    },
    attendenceContainer:{
        height:40,
        width:160,
       paddingHorizontal:19,
       borderRadius:10,
       paddingVertical:5,
       borderWidth:1,
       borderColor:Color.primary,
       marginTop:10,
       flexDirection:'row'
     },
    img: {
        height: 180,
        width: 180,
        borderRadius: 90,
        // backgroundColor:'blue'
    },
    title: {
        fontSize: 20,
        color: Color.primary,
        textAlign: 'center',
        fontFamily: 'RobotoBold',
        // marginTop:5,
        // marginLeft: 5,
        marginBottom: 2

    },
    mail: {
        fontSize: 16,
        color: 'white',
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

//make this component available to the app
export default GradeScreen;
