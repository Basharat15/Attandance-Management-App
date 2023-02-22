//import liraries
import React, { useEffect, useCallback, useState, useReducer } from 'react'
import { View, Text, StyleSheet, Image, Button, Modal, Pressable, ActivityIndicator, FlatList,ScrollView } from 'react-native';
import { Colors } from 'react-native-paper';
import Color from '../../Constants/Colors';
import Input from '../../Components/UI/Input'
import Card from '../../Components/UI/Card'
import MainButton from '../../Components/UI/CustomButton'
import { useSelector, useDispatch } from 'react-redux'
import * as MarkedAttendenceAction from '../../Store/Actions/MarkedAttendence';
import * as UserProfileAction from '../../Store/Actions/UserProfile'
import * as LeaveActions from '../../Store/Actions/LeaveAction'
import UserProfileItem from '../../Components/User/UserProfileItem'
import UserItemButton from '../../Components/UI/UserItemButton'
import { Ionicons } from '@expo/vector-icons'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const FORM_INPUT_LEAVE = 'FORM_INPUT_LEAVE'

const fromReducerLeave = (state, action) => {
    if (action.type === FORM_INPUT_LEAVE) {
        const UpdatedValues = {
            ...state.inputValue,
            [action.input]: action.value
        }
        const UpdatedValidities = {
            ...state.inputValiditie,
            [action.input]: action.IsValid
        }

        let IsfromValid = true;
        for (const key in UpdatedValidities) {
            IsfromValid = IsfromValid && UpdatedValidities[key]
        }
        return {
            inputValue: UpdatedValues,
            inputValiditie: UpdatedValidities,
            IsfromValid: IsfromValid
        }
    };
    return state;
}
const fromReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const UpdatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const UpdatedValidities = {
            ...state.inputValidities,
            [action.input]: action.IsValid
        }

        let fromIsValid = true;
        for (const key in UpdatedValidities) {
            fromIsValid = fromIsValid && UpdatedValidities[key]
        }
        return {
            inputValues: UpdatedValues,
            inputValidities: UpdatedValidities,
            fromIsValid: fromIsValid
        }
    };
    return state;
}
// create a component
const StudentProfile = (props) => {
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [Error, SetError] = useState()
    const [Isalert, setIsalert] = useState(false);
    const [alert, setalert] = useState(false);
    const [Alert, SetAlert] = useState(false)
    const [isloading, Setisloading] = useState(false);

    // const Selectedproduct = array.find(product => product.title === itemSelected.title)
    const UserProfile = useSelector(state => state.UserProfile.userProfile)

    const loadProfile = useCallback(async () => {

        SetError(null);
        SetIsrefreshing(true)
        SetIsloading(true)
        try {
            await dispatch(UserProfileAction.fetchData());
            // console.log(UserProfile)
        } catch (err) {
            SetError(err.message);
        }
        SetIsrefreshing(false)
        SetIsloading(false)
    }, [dispatch, SetIsloading, SetError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProfile)

        return () => {
            willFocusSub.remove();
        }
    }, [loadProfile]);
    useEffect(() => {
        SetIsloading(true);
        loadProfile().then(() => {
            SetIsloading(false);
        })
    }, [dispatch, loadProfile]);

    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            Attendence: '',
            Name: '',

        },
        inputValidities: {
            Attendence: false,
            Name: false,
        },
        FormValiditity: {
            fromIsValid: false,
        }
    })
    const [FormState, DispatchFormState] = useReducer(fromReducerLeave, {
        inputValue: {
            Name: '',
            FromDate: '',
            ToDate: '',

        },
        inputValiditie: {
            Name: false,
            FromDate: false,
            ToDate: false
        },
        FormValiditities: {
            IsfromValid: false,
        }
    })
    const Changetext = useCallback((inputIdentifier, inputValue, inputValiditiy) => {
        DispatchstateFrom({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            IsValid: inputValiditiy,
            input: inputIdentifier,
        });

    }, [DispatchstateFrom]);

    const ChangetextLeave = useCallback((inputIdentifier, inputValue, inputValiditiy) => {
        DispatchFormState({
            type: FORM_INPUT_LEAVE,
            value: inputValue,
            IsValid: inputValiditiy,
            input: inputIdentifier,
        });

    }, [DispatchFormState]);

    const SubmitFunction = useCallback(async () => {
        if (!stateFrom.fromIsValid) {
            setalert(true)
            // setIsalert(false)
            return;
        }
        Setisloading(true)
        SetError(null)
        try {
            await dispatch(MarkedAttendenceAction.TotalAttendence(
                stateFrom.inputValues.Attendence,
                stateFrom.inputValues.Name,
            ))


        } catch (err) {
            SetError(err.message)
        }
        Setisloading(false)
        setIsalert(false)
    }, [stateFrom, dispatch]);

    const SubmitLeaveFunction = useCallback(async () => {
        if (!FormState.IsfromValid) {
            setalert(true)
            // setIsalert(false)
            return;
        }
        Setisloading(true)
        SetError(null)
        try {
            await dispatch(LeaveActions.TotalLeave(
                FormState.inputValue.Name,
                FormState.inputValue.FromDate,
                FormState.inputValue.ToDate,
            ))


        } catch (err) {
            SetError(err.message)
        }
        Setisloading(false)
        SetAlert(false)
    }, [FormState, dispatch]);
    useEffect(() => {
        if (Error) {
            setalert(true)
        }
    }, [Error])


    const [disabled, setDisabled] = useState(false);

    const sendData = () => {
        setDisabled(true);
        setTimeout(() => setDisabled(false),86400);
    };

    if (Error) {
        return (
            <View style={styles.Centered}>
                <Text style={styles.text}>{Error}</Text>
                <View style={styles.btnContainer2}>
                    <Button
                        color={Color.primary}
                        title="Try Again"
                        onPress={loadProfile}
                    />
                </View>
            </View>
        )
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
    const editProfileHandler = id => {
        props.navigation.navigate('Edit Profile', { profileId: id });
    }
    if (!Isrefreshing && UserProfile.length === 0) {
        return (
            <View style={styles.screen}>
                <Image  source={require('../../assets/atn.png')} style={styles.backgroundImage} />
                <Text style={styles.title}>
                    Well Come Here!
                </Text>
                <View style={styles.descryptionContainer}>
                    <Text style={styles.descryption}>
                        Please create your profile to proceed next!!!
                        Make sure enter your details accurately, In case of
                        any violation Your Profile will be dismissed without
                        your permission.Thanks
                    </Text>
                </View>
                <UserItemButton
                    style={styles.createButton}
                    onPress={() => {
                        props.navigation.navigate('Edit Profile')
                    }}
                >
                    Create Profile
                </UserItemButton>
            </View>
        )
    };
    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={loadProfile}
                refreshing={Isrefreshing}
                data={UserProfile}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <UserProfileItem
                        Name={itemData.item.Name}
                        Email={itemData.item.Email}
                        image={itemData.item.image}
                        onSelect={() => {
                            editProfileHandler(itemData.item.id)
                        }}
                    >



                    </UserProfileItem>
                )}
            />
            {/* For Marked Attendence  */}
            <Modal visible={Isalert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setIsalert(false)
                }}
            >
                <View style={styles.centerView}>
                    <Card style={styles.AuthContainer}>
                        <View style={styles.useInfo}>
                            <Text style={styles.useInfoText}> Mark Attendence Here</Text>
                        </View>
                        <ScrollView> 
                        <Input
                            id='Name'
                            label="Name"
                            warningText='Please Enter Your Name!'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='please Enter Your Name'
                            initialValue=''
                            onInputChange={Changetext}
                            required
                            min={5}
                        />
                        <Input
                            id='Attendence'
                            label="Mark Attendence"
                            warningText='Please Mark Attendence!'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='please Mark Your Attendence'
                            initialValue=''
                            Present
                            Absent
                            onInputChange={Changetext}
                            required
                            min={5}
                        />
                           
                        <View style={styles.btnContainerModal}>
                            <Button
                                title='submit'
                                onPress={SubmitFunction}
                                color={Color.primary}
                            />
                        </View>
                        </ScrollView>
                    </Card>
                </View>
            </Modal>
            {/* For leave  */}
            <Modal visible={Alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    SetAlert(false)
                }}
            >
                <View style={styles.centerView}>
                    <Card style={styles.AuthContainerLeave}>
                        <View style={styles.useInfoLeave}>
                            <Text style={styles.useInfoText}>Leave</Text>
                        </View>

                        <Input
                            id='Name'
                            label="Name"
                            warningText='Please Enter Your Name!'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='please Enter Your Name'
                            initialValue=''
                            onInputChange={ChangetextLeave}
                            required
                            min={5}
                        />
                        <Input
                            id='FromDate'
                            label="From"
                            warningText='Please Enter Some Date!'
                            keyboardType='decimal-pad'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please Enter From Date'
                            initialValue=''
                            onInputChange={ChangetextLeave}
                            required
                            min={5}
                        />
                        <Input
                            id='ToDate'
                            label="To"
                            warningText='Please Enter Some Date!'
                            keyboardType='decimal-pad'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please Enter To Date'
                            initialValue=''
                            onInputChange={ChangetextLeave}
                            required
                            min={5}
                        />
                        <View style={styles.btnContainerModalLeave}>
                            {/* <MainButton style={styles.button3} onPress={SubmitFunction}>Submit</MainButton>  */}
                            <Button
                                title='submit'
                                onPress={SubmitLeaveFunction}
                                color={Color.primary}
                            />
                        </View>
                    </Card>
                </View>
            </Modal>
            {/* For any Error */}
            <Modal visible={alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setalert(false)
                }}
            >
                <View style={styles.center_View}>
                    <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                            {Error ? <Text style={styles.text1}>'An error occured'</Text> : <Text style={styles.text1}>'Warning'</Text>}
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ? <Text style={styles.text}>'Something went wrong'</Text> : <Text style={styles.text}>'Please Check your form Enteries'</Text>}
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Color.primary }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text1}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={styles.btnContainer}>
                <View style={styles.MarkBtn}>
                    <Button
                        color={Color.primary}
                        title='Mark Attendence'
                        disabled={disabled}
                        onPress={() => {
                            setIsalert(true)
                            sendData()
                        }}
                    />
                </View>
                <View style={styles.LeaveBtn}>
                    <Button
                        color={Color.primary}
                        title=' Mark leave'
                        onPress={() => {
                            SetAlert(true)
                        }}
                    />
                </View>
                <View style={styles.ViewBtn}>
                    <Button
                        color={Color.primary}
                        title='View Attendence'
                        onPress={() => {
                            props.navigation.navigate('View Attendence')
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export const ScreenOptions = navData => {
    return {
        headerTitle: 'User Profile',
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
    },
    AuthContainer: {
        width: 300,
        height: 340,
        padding: 40,
        marginTop: 100,
        backgroundColor: 'white'
    },
    AuthContainerLeave: {
        width: 300,
        height: 410,
        padding: 40,
        marginTop: 100,
        backgroundColor: 'white'
    },
    useInfo: {
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: Color.primary,
        height: 40,
        justifyContent: 'center',
        borderRadius: 5,

    },
    useInfoLeave: {
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: Color.primary,
        height: 40,
        justifyContent: 'center',
        borderRadius: 5,

    },
    useInfoText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Regular'
    },
    btnContainerModal: {
        flex: 1,
        marginTop: 26,
        width: 100,
        marginHorizontal: 60,
        marginLeft: 60
    },
    btnContainerModalLeave: {
        flex: 1,
        marginTop: 20,
        width: 100,
        marginHorizontal: 60,
        marginLeft: 60
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    warning_modal: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Color.primary,
        borderRadius: 30,
    },
    warning_title: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    center_View: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    warning_Message: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,

    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    text1: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',

    },
    reset: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    MainText: {
        fontFamily: 'Bold',
        fontSize: 20,
        color: Color.primary,
        marginVertical: 5
    },
    button1: {
        borderRadius: 10,
        width: 150,
        marginTop: 30,
        height: 45
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
   
    btnContainer: {
        marginBottom: 120,
        flexDirection: 'column',
        // justifyContent: 'space-around'
    },
    MarkBtn: {
        width: '80%',
        marginLeft: 33,
        height: 70,
    },
    LeaveBtn: {
        width: '80%',
        marginLeft: 33,
        height: 70,
    },
    ViewBtn: {
        width: '80%',
        marginLeft: 33,
        height: 70,
    },
    descryption:{
        fontFamily:'Regular',
        color:Colors.primary,
        
      },
      createButton:{
        marginTop:25,
        color:Color.primary,
        backgroundColor:Color.primary
      },
      descryptionContainer:{
         marginTop:20,  
      },
      screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',

      },
      backgroundImage:{
        width:'100%',
        height:'50%',
      },
      title:{
        fontFamily:'RobotoBold',
        fontSize:16
      },
});

//make this component available to the app
export default StudentProfile;
