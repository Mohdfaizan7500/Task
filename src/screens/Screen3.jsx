import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styleContainer from '../assets/styleSheet'
import Header from '../components/Header'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signOut } from '@react-native-firebase/auth'


const Screen3 = () => {
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();


    const ConfirmLogout = async () => {
        try {
            setLoading(true);
            const auth = getAuth(); // Use existing auth instance if available
            await signOut(auth); // Sign out the user
            console.log("User  signed out successfully");
            // Consider adding any additional cleanup here if needed
            navigation.navigate('Signup'); // Or perhaps 'Login' instead of 'Signup'?
        } catch (error) {
            console.error("Sign out error:", error);
        } finally {
            setLoading(false);
        }
    }
    const LogOutHandle = () => {
        Alert.alert("Log out Task",
            'Are you sure, want to Logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', onPress: () => ConfirmLogout() }
            ]

        );

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