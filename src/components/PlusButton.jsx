import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s } from 'react-native-size-matters'
import { vs } from 'react-native-size-matters'
import BackIcon from 'react-native-vector-icons/Entypo';
import { ColorPatel } from '../constants/ColorPatel copy';
// import { ColorPatel } from '../assets/ColorPatel';


const PlusButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.Container} onPress={onPress}>
        <BackIcon name="plus" size={60} color="#fff" />
    </TouchableOpacity>
  )
}

export default PlusButton

const styles = StyleSheet.create({
    Container:{
        width:s(60),
        height:s(60),
        backgroundColor:ColorPatel.AppColor,
        borderRadius:s(100),
        position:"absolute",
        bottom:vs(25),
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
    }
})