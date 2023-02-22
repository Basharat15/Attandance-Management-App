import React, { useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TextInput,Platform } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const ON_BLUR = 'ON_BLUR';

const lnputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case ON_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    }
}

const InputSign = props => {

    const [inputState, dispatch] = useReducer(lnputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false,
    })

    const InputChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        if (id ==='confrimpassword' && inputState.value.password === inputState.value.confrimpassword) {
            isValid = false;
        }
        

        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid: isValid
        })
    }

    const loseFocusedHandler = () => {
        dispatch({
            type: ON_BLUR
        })
    };

    const { onInputChange, id } = props;

    useEffect(() => {
        onInputChange(id, inputState.value, inputState.isValid)

    }, [inputState, onInputChange, id])

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={{...styles.input,...props.style}}
                value={inputState.value}
                onChangeText={InputChangeHandler}
                onBlur={loseFocusedHandler}
            // onEndEditing={() => console.log('submitting')}
            // onSubmitEditing={() => console.log('submitting2')}
            />
            {!inputState.isValid && inputState.touched && ( 

                <View style={styles.warningTextContainer}>
            <Text style={styles.warningText}>{props.warningText}</Text>
            </View>
              
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'Bold',
        marginVertical: 8,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#888',
        paddingHorizontal: 2,
        paddingVertical: 5
    },
    warningTextContainer: {
        marginTop: Platform.OS === 'ios' ? 0 : -3,
        marginLeft:14
    },
    warningText: {
        color: "red",
        fontSize: 12
    }
});
export default InputSign;