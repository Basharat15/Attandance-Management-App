import React  from 'react';
import {Text,TouchableOpacity,View,StyleSheet} from 'react-native';
import Color from '../../Constants/Colors'

const CustomButton = props => {
return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
    <View style={{...styles.button,...props.style}}>
     <Text style={styles.buttonText}>{props.children}</Text>
    </View>
    </TouchableOpacity>
);
};
const styles = StyleSheet.create({
button:{ 
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:25,
    backgroundColor:Color.primary, 
    alignItems:'center' 
},
buttonText:{
    fontSize:14,
    color:'white'
}
});
export default CustomButton;