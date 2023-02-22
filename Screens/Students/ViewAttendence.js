//import liraries
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet,FlatList,Button,ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AttendenceView from '../../Components/User/AttendenceView'
import * as MarkedAttendenceAction from '../../Store/Actions/MarkedAttendence';
import Color from '../../Constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton'

// create a component
const ViewAttendence = (props) => {
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [Isloading, Setisloading] = useState(false);
    const [Error, SetError] = useState();
    const dispatch = useDispatch();
    // const img = props.route.params? props.route.params.img:null;
    const viewAttendence = useSelector(state => state.MarkedAttendence.Attendence)
    const present = viewAttendence.filter(MarkedAttendence=> MarkedAttendence.attendence.toUpperCase().trim() !== 'Absent'.toUpperCase().trim())
    const Absent = viewAttendence.filter(MarkedAttendence=> MarkedAttendence.attendence.toUpperCase() !== 'Present'.toUpperCase())
    const size = present.length;
    const sizeAbsent = Absent.length;

    const UserProfile = useSelector(state => state.UserProfile.userProfile)

    let Name = UserProfile.map(User => User.Name);
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
        <View style={styles.container}>
            <Text style={styles.containertext}>Attendence Sheet</Text>
            <Text style={styles.Nametext}>{Name[0]}</Text>
            <Text style={styles.Presenttext}>Total Present <Text style={styles.present}>{size}</Text></Text>

            <FlatList
                onRefresh={LoadedAttendence}
                refreshing={Isrefreshing}
                keyExtractor={item => item.id}
                data={viewAttendence}
                renderItem={itemData => {
                    return (
                        <AttendenceView
                            Name={itemData.item.Name}
                            attendence={itemData.item.attendence}
                            date={itemData.item.readableDate}
                        //   time = {itemData.item.time}
                        />
                    )
                }}
            />
        </View>
    );
};

export const ScreenOptions = navData => {
    return {
        headerTitle: 'Attendence Sheet',
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
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    containertext:{
      fontSize:20,
      fontFamily:'Bold',
      color:Color.primary,
      marginVertical:10
    },
    Presenttext:{
        fontSize:18,
        color:Color.primary,
        marginTop:10,
        color:'black'
    },
    present:{
        fontSize:20,
        fontFamily:'Bold',
        color:Color.primary,
        marginTop:10,
    },
    presentContainer:{
     borderBottomWidth:1,
     borderBottomColor:'black'
    },
    Nametext:{
        fontSize:20,
        fontFamily:'Bold',
        color:Color.primary,
        marginBottom:10
    }
});

//make this component available to the app
export default ViewAttendence;
