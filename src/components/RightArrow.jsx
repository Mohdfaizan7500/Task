import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { s, vs } from 'react-native-size-matters';


const RightArrow = ({sendData}) => {
    return (
        <Pressable style={styles.Right} onPress={()=>sendData()}>
            <Icon  name="arrow-right" size={50} color="#fff" />
        </Pressable>
    )
}

export default RightArrow

const styles = StyleSheet.create({
    Right: {
        position: "absolute",
        bottom: vs(30),
        right: s(20)
    }
})