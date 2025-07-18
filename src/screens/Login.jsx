import { Alert, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../components/Logo'
import { s, vs } from 'react-native-size-matters'
import Button from '../components/Button'
import SocialContainer from '../components/SocialContainer'
import SocialMediaPlatform from '../components/SocialMediaPlatform'
import Heading from '../components/Heading'
import SubTitle from '../components/SubTitle'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getAuth, signInWithEmailAndPassword ,signOut} from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../../App'

const Login = () => {

    const [loading, setloading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const navigation = useNavigation();

    const { fachData } = useContext(AppContext)

    function displayErrorMessage(errorCode, errorMessage) {
        switch (errorCode) {
            case "auth/invalid-email":
                Alert.alert("Invalid email address.");
                break;
            case "auth/user-not-found":
                Alert.alert("User not found. Please check your email address.");
                break;
            case "auth/wrong-password":
                Alert.alert("Incorrect password. Please try again.");
                break;
            case "auth/email-already-in-use":
                Alert.alert("Email address already in use. Please try another email address.");
                break;
            case "auth/weak-password":
                Alert.alert("Password is too weak. Please use a stronger password.");
                break;
            default:
                Alert.alert(errorMessage);
        }
    }

    const LoginButton = async () => {
        setloading(true)
        Keyboard.dismiss()
        if (validate()) {
            await signInWithEmailAndPassword(getAuth(), email, password)
                .then(async(userCredential) => {
                    if (userCredential.user.emailVerified) {
                        navigation.navigate("Home");
                        setloading(false)
                        setEmail('');
                        setpassword('')

                    }
                    else{
                        Alert.alert('Alert',
                            'Please verfiy your email.'
                        )
                        await sendEmailVerification(userCredential.user);
                        await signOut(getAuth())
                        setloading(false)
                        setEmail('');
                        setpassword('')
                    }

                    // const user = userCredential.user;
                    // if (userCredential.doc != []) {
                    //     goToNext(user.uid)
                    // }
                    // else {
                    //     setloading(false)
                    // }

                }).catch((error) => {
                    setloading(false)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Sign in error:", errorCode, errorMessage);
                    displayErrorMessage(errorCode, errorMessage);
                })
        }
        else {
            setloading(false)
            Alert.alert("Please fill all required fileds")
        }

    }

    const goToNext = async (uid) => {
        await AsyncStorage.setItem('UID', uid);
        fachData()
        setloading(false)
        navigation.navigate("Home");
        Alert.alert("Log in Successfully.");
    }
    const validate = () => {
        let isValid = true
        if (email == '') {
            isValid = false
        }

        if (password == '') {
            isValid = false
        }
        return isValid;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Logo />
            <Heading heading={"Welcome back!"} />
            <SubTitle subheading={"EMAIL ADDRESS"} />
            <TextInput style={styles.InputField}
                value={email}
                onChangeText={(txt) => setEmail(txt)} />
            <SubTitle subheading={"PASSWORD"} Forget={true} />
            <TextInput style={styles.InputField}
                value={password}
                onChangeText={(txt) => setpassword(txt)} />
            <Button title={"Log in"} onPress={LoginButton} loading={loading} />
            <SocialMediaPlatform title={"Log in"} />
            <SocialContainer />
            <Text style={styles.LoginLink}>Don't have an account?
                <Text style={styles.LinkText}
                    onPress={() => navigation.navigate("Signup")}
                >
                    Get started!</Text></Text>

        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: vs(50),
        paddingHorizontal: s(40)
    },
    InputField: {
        width: "100%",
        height: vs(45),
        backgroundColor: "#f6f7fc",
        borderRadius: s(25),
        borderWidth: .5,
        borderColor: "gray",
        marginTop: vs(8),
        fontSize: 16,
        color: "black",
        paddingStart: s(25)
    },
    LoginLink: {
        alignSelf: "center",
        color: "gray",
        fontSize: s(14),
        // position: "absolute",
        // bottom: vs(25)
        marginTop: vs(35)


    },
    LinkText: {
        fontSize: s(12),
        color: "#686bf0",
        fontWeight: "500",

    }
})