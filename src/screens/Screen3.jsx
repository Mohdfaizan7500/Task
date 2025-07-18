import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styleContainer from '../assets/styleSheet'
import Header from '../components/Header'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'


const Screen3 = () => {
    const [loading, setloading] = useState(false)

    const navigation = useNavigation();
    const LogOutHandle = async () => {
        setloading(true)
        await AsyncStorage.clear();
        navigation.navigate("Login")
        setloading(false)
        Alert.alert("Log out");
    }
    return (
        <View style={styleContainer.container}>
            <Header />
            <Button title={"Log Out"} onPress={LogOutHandle} loading={loading} />
        </View>
    )
}

export default Screen3

const styles = StyleSheet.create({})