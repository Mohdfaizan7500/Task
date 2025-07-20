import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useNavigation } from '@react-navigation/native'
import Logo from '../../../../src/components/Logo'
import { s, vs } from 'react-native-size-matters'
import ProcessingCircle from '../../../../src/components/ProcessingCircle'
import RightArrow from '../../../../src/components/RightArrow'
import Circle from '../../../../src/components/Circle'

const Splash = ({navigation}) => {

    const { user } = useAuth()

    // const navigation = useNavigation();
    useEffect(() => {

        const timer = setTimeout(() => {
            navigation.navigate("AppNavigator")

        }, 3000);

        return ()=> clearTimeout(timer);

    }, [])
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
            <Circle sendData={() => navigation.navigate("AppNavigator")} />
            <RightArrow sendData={() => navigation.navigate("AppNavigator")} />


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