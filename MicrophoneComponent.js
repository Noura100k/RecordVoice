import React from "react";
import {StyleSheet,TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/Feather';


function onButtonPress(){
    console.warn("Record")

 }

export default function MicrophoneComponent({onPress,button_text, name, color,})
{
  return(

   <TouchableOpacity
   style={styles.microphone}
   onPress={onPress}
   >
    <FontAwesome5 name={name}  size={80} color={color} />

   </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    microphone:{
    width:80,
    height:80,
    alignItems:'center',
    justifyContent:'center',  
   }
  
});