import { Pressable, StyleSheet,  } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import { ColorPatel } from '../constants/ColorPatel copy'

const Circle = ({onPress}) => {
    return (
        <Pressable style={styles.Container} onPress={onPress}>
           
        </Pressable>
    )
}

export default Circle

const styles = StyleSheet.create({
    Container: {
        width: s(250),
        height: s(250),
        backgroundColor: ColorPatel.AppColor,
        position: "absolute",
        bottom: -100,
        right: -100,
        borderRadius: s(300)
    },
   
})