import React from 'react';
import {Platform} from 'react-native'
import {HeaderButton} from 'react-navigation-header-buttons'
import {Ionicons,Feather} from '@expo/vector-icons'
import Color from '../../Constants/Colors';

const CustomButton = props =>{
    return(
        <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={23}
        color={Platform.OS==='android'?'white':Color.primary} 
        />
    )
}
export default CustomButton;
