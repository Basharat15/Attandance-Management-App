import React  from 'react';
import {Text,TouchableOpacity,View,StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

const DoctorItemButton = props => {
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
    borderRadius:20,
    backgroundColor:Colors.accent, 
    alignItems:'center' 
},
buttonText:{
    fontSize:13,
    color:'white'
}
});
export default DoctorItemButton;
