import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Logo from '../components/Logo'
import Circle from '../components/Circle'
import RightArrow from '../components/RightArrow'
import { s, vs } from 'react-native-size-matters'
import ProcessingCircle from '../components/ProcessingCircle'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuth } from '@react-native-firebase/auth'

const Splash = () => {
    const navigation = useNavigation();


    const checkLogin = async () => {
         getAuth().onAuthStateChanged(user => {
            if (user !== null) {
              navigation.navigate("Home")
            }
            else
            {
                navigation.navigate("Signup")
            }
          })
        // const id = await AsyncStorage.getItem("UID");
        // if (id !== null) {
        //     navigation.navigate("Home");
        // }
        // else {
        //     navigation.navigate('Signup')
        // }
    }
    return (
        <View style={styles.container}>
            <Logo />
            <View style={{ marginTop: 70 }}>
                <Text style={styles.heading}>Get things done.</Text>
                <Text style={styles.subtitle}>{`just a click away from \nplanning your task`}</Text>
            </View>
            <View style={styles.ProcessingBar}>
                <ProcessingCircle color={"gray"} />
                <ProcessingCircle color={"gray"} />
                <ProcessingCircle color={"#686bf0"} />
            </View>
            <Circle sendData={checkLogin} />
            <RightArrow sendData={checkLogin} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    heading: {
        fontSize: s(24),
        fontWeight: '800',
        fontStyle: "normal",
        paddingStart: 40
    },
    subtitle: {
        marginTop: vs(15),
        fontSize: s(14),
        color: "gray",
        fontWeight: "400",
        letterSpacing: 1.5,
        paddingStart: 40

    },
    ProcessingBar: {
        flexDirection: "row",
        gap: s(15),
        marginStart: s(40),
        marginTop: vs(15)

    }
})