import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import Loader from './Loader'

const Button = ({ title, sendData, loading }) => {


    return (
        <TouchableOpacity style={styles.button} onPress={() => sendData()}>
            {
                loading ?
                    <Loader /> :
                    <Text style={styles.buttontext}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {

        backgroundColor: "#686bf0",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(40),
        alignSelf: "center",
        paddingHorizontal: s(40),
        paddingVertical: vs(15),
        width:s(230),
        height:vs(50),
        elevation:15,
        marginTop: vs(40),
    },
    buttontext: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff"
    }
})