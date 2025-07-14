import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { s } from 'react-native-size-matters'

const ProcessingCircle = ({color}) => {
    const [Active, setActive] = useState('')

    return (
        <View style={[styles.smallCircle,{backgroundColor:color}]}>

        </View>
    )
}

export default ProcessingCircle

const styles = StyleSheet.create({
    smallCircle: {
        width: s(10),
        height: s(10),
        backgroundColor: '#686bf0',
        borderRadius: 10
    }
})