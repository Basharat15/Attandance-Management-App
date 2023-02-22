import React, { useCallback, useEffect, useState, useReducer } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator, Modal, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Leaveitem from '../../Components/Admin/Leaveitem'
import HeaderButton from '../../Components/UI/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import Colors from '../../Constants/Colors';
import * as LeaveAction from '../../Store/Actions/LeaveAction'
import * as AcceptedLeaveAction from '../../Store/Actions/AcceptedLeave'
import MainButton from '../../Components/UI/CustomButton'
import Card from '../../Components/UI/Card';
import Input from '../../Components/UI/Input';

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

const LeaveScreen = props => {
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [alert, setalert] = useState(false);
    const [Alert, setAlert] = useState(false);
    const [SetAlert, SetIsAlert] = useState(false);
    const [pid, setpid] = useState('')
    const [Isloading, Setisloading] = useState(false);
    const [Error, SetError] = useState();
    const [itemSelected, setItemSelected] = useState('');
    const dispatch = useDispatch();

    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            Remarks: ''

        },
        inputValidities: {
            Remarks: false,
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
            await dispatch(AcceptedLeaveAction.AcceptedAllLeave(
                itemSelected.onwerId,
                itemSelected.Name,
                itemSelected.FromDate,
                itemSelected.ToDate,
                stateFrom.inputValues.Remarks,
            ))
        } catch (err) {
            SetError(err.message)
        }
        Setisloading(false)
        SetIsAlert(false)
        LoadedLeave();
    }, [stateFrom, dispatch]);
    const Leave = useSelector(state => state.Leave.AllLeave)

    const LoadedLeave = useCallback(async () => {

        SetError(null);
        SetIsrefreshing(true);
        try {
            await dispatch(LeaveAction.fetchLeave());
        } catch (err) {
            SetError(err.message);
        }
        SetIsrefreshing(false);
    }, [dispatch, Setisloading, SetError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', LoadedLeave)

        return () => {
            willFocusSub.remove();
        }
    }, [LoadedLeave]);
    useEffect(() => {
        Setisloading(true);
        LoadedLeave().then(() => {
            Setisloading(false);
        })
    }, [dispatch, LoadedLeave]);

    const DelAcceptedRequest = async (id) => {
        await dispatch(LeaveAction.deleteLeave(id))
    }


    if (Isloading) {
        return (
            <View style={styles.Centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primary}
                />
            </View>
        )
    }
    if (!Isrefreshing && Leave.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No Leave found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.containertext}>Leave of All Users</Text>
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
                            <Text style={styles.useInfoText}>Remarks</Text>
                        </View>
                        <Input
                            id='Remarks'
                            label="Add Remarks"
                            warningText='Please Add Attendence!'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please Enter Remrks'
                            initialValue=''
                            onInputChange={Changetext}
                            required
                            min={5}
                        />
                        <View style={styles.btnContainerModal}>
                            <Button
                                title='submit'
                                onPress={SubmitFunction}
                                color={Colors.primary}
                            />
                        </View>
                    </Card>
                </View>
            </Modal>
            <FlatList
                onRefresh={LoadedLeave}
                refreshing={Isrefreshing}
                keyExtractor={item => item.id}
                data={Leave}
                renderItem={itemData => {
                    return (
                        <Leaveitem
                            Name={itemData.item.Name}
                            FromDate={itemData.item.FromDate}
                            ToDate={itemData.item.ToDate}
                            date={itemData.item.readableDate}
                            onDelete={() => {
                                setalert(true)
                                setpid(itemData.item.id)
                            }}
                            onAccept={() => {
                                SetIsAlert(true)
                                setItemSelected(itemData.item)
                                DelAcceptedRequest(itemData.item.id)
                            }}
                        // disabled={itemSelected===''}
                        />

                    )
                }}
            />
            {/* Confrim Box */}
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
                                    await dispatch(LeaveAction.deleteLeave(pid))
                                    Setisloading(false)
                                    setalert(false)
                                    LoadedLeave();
                                }}
                                android_ripple={{ color: Colors.primary }}
                            >
                                <Text style={styles.text1}>Yes</Text>
                            </Pressable>

                            <Pressable
                                style={styles.button}
                                onPress={() => {
                                    setalert(false)
                                }}
                                android_ripple={{ color: Colors.primary }}
                            >
                                <Text style={styles.text1}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* For any Error */}
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
                            android_ripple={{ color: Colors.primary }}
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
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,

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
        color: Colors.primary,
        marginVertical: 10
    },
    Nametext: {
        fontSize: 20,
        fontFamily: 'Bold',
        color: Colors.primary,
        marginBottom: 10
    },
    warning_modal: {
        width: 290,
        height: 290,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 30,
    },
    warning_modal_Error: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 30,
    },
    warning_title: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Colors.primary,
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
        backgroundColor: Colors.primary,
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
        backgroundColor: Colors.primary
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
        backgroundColor: Colors.primary,
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

export default LeaveScreen;