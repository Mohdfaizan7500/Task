import { Alert, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { use, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../components/Logo'
import { s, vs } from 'react-native-size-matters'
import Button from '../components/Button'
import SocialContainer from '../components/SocialContainer'
import SocialMediaPlatform from '../components/SocialMediaPlatform'
import Heading from '../components/Heading'
import SubTitle from '../components/SubTitle'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signOut } from '@react-native-firebase/auth'

const SignUp = () => {
    const [loading, setloading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const navigation = useNavigation();


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
    const SignUpHandler = async () => {
        Keyboard.dismiss()
        if (validate()) {
            try {
                setloading(true)
                const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
                 const v = await sendEmailVerification(userCredential.user);
                 const Signout  = await signOut(getAuth());
                 console.log("SignOut ",Signout)
                 console.log("userCredential",userCredential);
                 console.log('v:',v)
                Alert.alert(
                    'Verification Email Sent',
                    `A verification email has been sent to ${email}. Please verify your email to continue.`
                );
                navigation.navigate('Login')
            }
            catch (error) {
                Alert.alert('Error', error.message);
            }
            finally {
                setloading(false)

            }
            // await createUserWithEmailAndPassword(getAuth(), email, password).then((userCredential) => {
            //     firebase.auth().currentUser.sendEmailVerification(userCredential.user)
            //     Alert.alert("Check Email"," Verfication Link Send on Email")
            //     const user = userCredential.user;
            //     Alert.alert("Siggned up as:", user.email)
            //     if (userCredential.doc != []) {
            //         Alert.alert("Sign up Sussessfully.")
            //         navigation.navigate("Login")
            //     }
            //     else {
            //         setloading(false)
            //     }
            // }).catch((error) => {
            //     setloading(false)
            //     const errorCode = error.code;
            //     const errorMessage = error.message;
            //     console.error("Sign in error:", errorCode, errorMessage);
            //     displayErrorMessage(errorCode, errorMessage);
            // })


        }
        else {
            setloading(false)
            Alert.alert("Please fill all required fileds")
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            {/* Logo */}
            <Logo />

            {/* Let's get started */}
            <Heading heading={"Let's get started"} />

            {/* EMAIL ADDRESS */}
            <SubTitle subheading={"EMAIL ADDRESS"} />

            {/* EMAIL ADDRESS Text Input */}
            <TextInput style={styles.InputField}
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />

            {/* password */}
            <SubTitle subheading={"PASSWORD"} />

            {/* PASSWORD INPUT */}
            <TextInput style={styles.InputField}
                value={password}
                onChangeText={(txt) => setpassword(txt)} />

            {/* SIGN UP BUTTON */}
            <Button title={"Sign up"} onPress={SignUpHandler} loading={loading} />


            {/* SING UP WITH PLATFORMA HEADING*/}
            <SocialMediaPlatform title={"Sign up"} />

            {/* SOCIAL MEADIA ICON CONTAINER */}
            <SocialContainer />

            {/* Already an account? TEXT */}
            <Text style={styles.LoginLink}>Already an account?
                <Text style={styles.LinkText}
                    onPress={() => (navigation.navigate('Login'))}>
                    Log in</Text>
            </Text>

        </SafeAreaView>
    )
}

export default SignUp

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
        marginTop: vs(35)

    },
    LinkText: {
        fontSize: s(12),
        color: "#686bf0",
        fontWeight: "500",

    }
})