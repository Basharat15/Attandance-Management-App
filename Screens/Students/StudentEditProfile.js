import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet,  Platform,  Pressable, Modal,ActivityIndicator,Alert,ImageBackground ,Button,Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SupplyInput from '../../Components/UI/SupplyInput';
import Color from '../../Constants/Colors';

import * as UserProfileAction from '../../Store/Actions/UserProfile'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton'

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

const StudentProfileEdit = props => {
    const [alert, setalert] = useState(false);
    const [Isloading,Setisloading] = useState(false);
    const [Error,SetError]= useState();
    const dispatch = useDispatch();
    const profileId = props.route.params? props.route.params.profileId:null;
    const Editprofile = useSelector(state =>
        state.UserProfile.userProfile.find(prof => prof.id === profileId));


    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            Name: Editprofile ? Editprofile.title : '',
            Email:Editprofile ? Editprofile.Email : '',
            image: Editprofile ? Editprofile.image : '',
        },
        inputValidities: {
            Name: Editprofile ? true : false,
            Email: Editprofile ? true : false,
            image: Editprofile ? true : false,
        },
        FormValiditity: {
            fromIsValid: Editprofile ? true : false,
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

    const SubmitFunction = useCallback( async () => {
        if (!stateFrom.fromIsValid) {
            setalert(true)
            return;
        }
        Setisloading(true)
        SetError(null)
        try{
                                
            if(Editprofile) {
                await dispatch(UserProfileAction.Editprofile(
                    profileId, 
                    stateFrom.inputValues.Name,
                    stateFrom.inputValues.Email,
                    stateFrom.inputValues.image,
                   )
                 );
                //  props.navigation.goBack();
               } else {
                await  dispatch(UserProfileAction.CreateProfile(
                    stateFrom.inputValues.Name,
                    stateFrom.inputValues.Email,
                    stateFrom.inputValues.image,
                   ))
               }
               props.navigation.goBack();
        } catch(err){
          SetError(err.message)
        }
        Setisloading(false)
        
    }, [stateFrom, profileId, dispatch]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                            title='card'
                            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                            onPress={SubmitFunction}
                        />
                    </HeaderButtons>
                )
            }
        })
    }, [SubmitFunction])

    // useEffect(()=>{
    //     if(Error){
    //        setalert(true)
    //     } 
    // },[Error])

    if(Isloading){
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
        <View
        style={styles.container}
        >
        
            <View style={styles.textContainer1}>
                    <Text style={styles.text2}>{Editprofile ? 'Edit Product' : 'Add Product'}</Text>
                    </View>  
                    <ScrollView>  
                <SupplyInput
                    id='Name'
                    label="Name"
                    warningText='Please Enter Your Name'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='Please Enter Your Name'
                    initialValue={Editprofile ? Editprofile.Name : ''}
                    initiallyValid={!!Editprofile}
                    onInputChange={Changetext}
                    required
                />
                <SupplyInput
                        id='Email'
                        label="E-mail"
                        keyboardType='email-address'
                        required
                        email
                        returnKeyType='next'
                        autoCapitalize='none'
                        warningText='please enter a valid email address.'
                        onInputChange={Changetext}
                        initialValue={Editprofile ? Editprofile.Email : ''}
                    initiallyValid={!!Editprofile}
                        placeholder='Please Enter Your E-mail'
                    />

                <SupplyInput
                    id='image'
                    label="imageUrl"
                    warningText='please enter some URL!'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    placeholder='Please Enter URL'
                    multiline
                    numberOfLines={3}
                    initialValue={Editprofile ?Editprofile.image : ''}
                    initiallyValid={!!Editprofile}
                    onInputChange={Changetext}
                    required
                />
            </ScrollView> 
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
                        {Error ?  <Text style={styles.text3}>'An error occured'</Text>:<Text style={styles.text3}>'Warning'</Text>} 
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ?  <Text style={styles.text}>'Something went wrong'</Text>:<Text style={styles.text}>'Please Check your form Enteries'</Text>}  
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Color.primary }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text3}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export const ScreenOptions = navData => {
    const routeParams = navData.route.params ?navData.route.params:{}
    return {
        headerTitle: routeParams.profileId ? 'Edit Profile' : 'Create Profile',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    image: {
        height: 200,
        width: 200
    },
    textContainer:{
      marginTop:10,
      alignItems:'center',
      justifyContent:'center',
    },
    text1:{ 
        color:'white',
       fontSize:20,
       fontFamily:'Bold',
       marginVertical:5
    },
    textContainer1:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        marginVertical:20
        
      },
      text2:{ 
          color:Color.primary,
         fontSize:22,
         fontFamily:'Bold',
      },
    warning_modal: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Color.primary,
        borderRadius: 20,
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
    text3: {
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
    Centered:{
        flex:1,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },

})
export default StudentProfileEdit;