import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6';
const ArrowIcon = ({onPress}) => {
    return (
        <Pressable style={styles.Arrow} onPress={onPress}>
            <Icon name="arrow-right-long" size={40} color="#fff" />
        </Pressable>
    )
}
export default ArrowIcon

const styles = StyleSheet.create({
    Arrow:{
        position:"absolute",
        bottom:30,
        right:30,
    }
})