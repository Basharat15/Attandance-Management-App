import React, { useCallback, useEffect, useState,useReducer } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator, Modal, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AllAttendenceView from '../../Components/Admin/AllAttendenceView';
import * as MarkedAttendenceAction from '../../Store/Actions/MarkedAttendence';
import Color from '../../Constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton'
import Card from '../../Components/UI/Card';
import Input from '../../Components/UI/Input';

// create a component
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
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
const ViewAllAttendence = (props) => {
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [alert, setalert] = useState(false);
    const [SetAlert, SetIsAlert] = useState(false);
    const [Alert, setAlert] = useState(false);
    const [Isalert, setIsalert] = useState(false);
    const [Isloading, Setisloading] = useState(false);
    const [Error, SetError] = useState();
    const [pid, setpid] = useState('')
    const [Aid, setAid] = useState('')
    const [itemSelected, setItemSelected] = useState('');
    const dispatch = useDispatch();

    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            Attendence: ''

        },
        inputValidities: {
            Attendence: false,
        },
        FormValiditity: {
            fromIsValid: false,
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

    const SubmitFunction = useCallback(async () => {
        if (!stateFrom.fromIsValid) {
            setAlert(true)
            // setIsalert(false)
            return;
        }
        Setisloading(true)
        SetError(null)
        try {
            
            await dispatch(MarkedAttendenceAction.UpdateAttendence(
                Aid,
                stateFrom.inputValues.Attendence,
            ))
    
            // if(stateFrom.inputValues.Attendence.toUpperCase()==='Absent'.toUpperCase()){
            //     await dispatch(MarkedAttendenceAction.deleteAttendence(
            //         Aid,  
            //     ))
            // }
            
            // if(stateFrom.inputValues.Attendence.toUpperCase()==='Present'.toUpperCase()){
            //     await dispatch(MarkedAttendenceAction.AddAttendence(
            //         itemSelected.onwerId,
            //     stateFrom.inputValues.Attendence,
            //     itemSelected.Name,
            //     ))
            // }
           
        } catch (err) {
            SetError(err.message)
        }
        Setisloading(false)
        setIsalert(false)
        LoadedAttendence();
    }, [stateFrom, dispatch]);

    const SubmitFunctionAdd = useCallback(async () => {
        if (!stateFrom.fromIsValid) {
            setAlert(true)
            // setIsalert(false)
            return;
        }
        Setisloading(true)
        SetError(null)
        try {
            await dispatch(MarkedAttendenceAction.AddAttendence(
                itemSelected.onwerId,
                stateFrom.inputValues.Attendence,
                itemSelected.Name
            ))
        } catch (err) {
            SetError(err.message)
        }
        Setisloading(false)
        SetIsAlert(false)
        LoadedAttendence();
    }, [stateFrom, dispatch]);
    // const img = props.route.params? props.route.params.img:null;
    const viewAttendence = useSelector(state => state.MarkedAttendence.AllAttendence)

    const UserProfile = useSelector(state => state.UserProfile.userProfile)

    let Name = UserProfile.map(User => User.Name);
    const LoadedAttendence = useCallback(async () => {

        SetError(null);
        SetIsrefreshing(true);
        try {
            await dispatch(MarkedAttendenceAction.fetchAttendence());
            // console.log(viewAttendence)
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
            <Text style={styles.containertext}>Attendence Sheet of All Users</Text>
            {/* For update Attendence */}
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
                            <Text style={styles.useInfoText}>Update Attendence</Text>
                        </View>
                        <Input
                            id='Attendence'
                            label="Update Attendence"
                            warningText='Please Update Attendence!'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please Update  Attendence'
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
                    </Card>
                </View>
            </Modal>
            {/* For Add Attendence */}
            <Modal visible={SetAlert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    SetIsAlert(false)
                }}
            >
                <View style={styles.centerView}>
                    <Card style={styles.AuthContainer}>
                        <View style={styles.useInfo}>
                            <Text style={styles.useInfoText}>Add Attendence</Text>
                        </View>
                        <Input
                            id='Attendence'
                            label="Add Attendence"
                            warningText='Please Add Attendence!'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please Add  Attendence'
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
                         onPress={SubmitFunctionAdd}
                         color={Color.primary}
                         />
                        </View>
                    </Card>
                </View>
            </Modal>
            <FlatList
                onRefresh={LoadedAttendence}
                refreshing={Isrefreshing}
                keyExtractor={item => item.id}
                data={viewAttendence}
                renderItem={itemData => {
                    return (
                        <AllAttendenceView
                            Name={itemData.item.Name}
                            attendence={itemData.item.attendence}
                            date={itemData.item.readableDate}
                            onDelete={() => {
                                setalert(true)
                                setpid(itemData.item.id)
                            }}
                            onEdit={()=>{
                                setIsalert(true)
                                setAid(itemData.item.id)
                                setItemSelected(itemData.item)
                                // EditAttendenceHandler(itemData.item.id);
                            }}
                            onAdd={()=>{
                                SetIsAlert(true)
                                setItemSelected(itemData.item)
                                // EditAttendenceHandler(itemData.item.id);
                            }}
                        //   time = {itemData.item.time}
                        />
                    )
                }}
            />
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
                            <Text style={styles.text1}>Are you sure</Text>
                        </View>
                        <View style={styles.warning_Message}>
                            <Text style={styles.text}>'Do you really want to delete this item'</Text>
                        </View>
                        <View style={styles.cnfrimBox}>
                            <Pressable
                                style={styles.button}

                                onPress={async () => {
                                    Setisloading(true)
                                    await dispatch(MarkedAttendenceAction.deleteAttendence(pid))
                                    Setisloading(false)
                                    setalert(false)
                                    LoadedAttendence();
                                }}
                                android_ripple={{ color: Color.primary }}
                            >
                                <Text style={styles.text1}>Yes</Text>
                            </Pressable>

                            <Pressable
                                style={styles.button}
                                onPress={() => {
                                    setalert(false)
                                }}
                                android_ripple={{ color: Color.primary }}
                            >
                                <Text style={styles.text1}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* For Error */}
            <Modal visible={Alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setAlert(false)
                }}
            >
                <View style={styles.center_View}>
                    <View style={styles.warning_modal_Error}>
                        <View style={styles.warning_title}>
                            {Error ? <Text style={styles.text1}>'An error occured'</Text> : <Text style={styles.text1}>'Warning'</Text>}
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ? <Text style={styles.text}>'Something went wrong'</Text> : <Text style={styles.text}>'Please Check your form Enteries'</Text>}
                        </View>
                        <Pressable
                            onPress={() => {
                                setAlert(false)
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    containertext: {
        fontSize: 20,
        fontFamily: 'Bold',
        color: Color.primary,
        marginVertical: 10
    },
    Nametext: {
        fontSize: 20,
        fontFamily: 'Bold',
        color: Color.primary,
        marginBottom: 10
    }, 
    warning_modal: {
        width: 290,
        height: 290,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: Color.primary,
        borderRadius: 30,
    },
    warning_modal_Error: {
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
    reset: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    button: {
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 19,
        elevation: 5,
        width: 100,
        margin: 5,
        backgroundColor: Color.primary
    },
    cnfrimBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: -20
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text2: {
        color: 'red',
        fontSize: 16,
        fontFamily: 'Bold',
        textAlign: 'center'
    },
    AuthContainer: {
        width: 280,
        height: 270,
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
    useInfoText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Regular'
    },
    btnContainerModal: {
        flex: 1,
        marginTop: 23,
        width: 100,
        marginHorizontal: 60,
        marginLeft: 50
    },
});

//make this component available to the app
export default ViewAllAttendence;