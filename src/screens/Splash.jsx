import { Alert, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../components/Logo'
import Circle from '../components/Circle'
import RightArrow from '../components/RightArrow'
import { beginAsyncEvent } from 'react-native/Libraries/Performance/Systrace'
import { s, vs } from 'react-native-size-matters'
import ProcessingCircle from '../components/ProcessingCircle'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = () => {
    const navigation = useNavigation();
    const [Active, setActive] = useState('')

    
    useEffect(()=>{
        checkLogin();

    },[])

    const checkLogin = async()=>{
    const id = await AsyncStorage.getItem("UID");
    if (id !== null) {
     navigation.navigate("Main");

    }
    else {
      navigation.navigate('Signup')

    }
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
            <Circle sendData={checkLogin}/>
            <RightArrow sendData={checkLogin}/>
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
        gap: 15,
        marginStart: s(40),
        marginTop: vs(15)

    }
})