import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { s, vs } from 'react-native-size-matters'
// import Logo from '../../../../src/components/Logo'
// import Heading from '../../../../src/components/Heading'
// import SubTitle from '../../../../src/components/SubTitle'
// import Button from '../../../../src/components/Button'
// import SocialMediaPlatform from '../../../../src/components/SocialMediaPlatform'
// import SocialContainer from '../../../../src/components/SocialContainer'
import { auth } from '../../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signOut } from '@react-native-firebase/auth'
import Logo from '../../components/Logo'
import Heading from '../../components/Heading'
import SubTitle from '../../components/SubTitle'
import Button from '../../components/Button'
import SocialMediaPlatform from '../../components/SocialMediaPlatform';
import SocialContainer from '../../components/SocialContainer';
const Signup = ({ navigation }) => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    const validateForm = () => {
        if (!Email || !Password || !ConfirmPassword) {
            setError('All fields are required');
            return false;
        }
        if (Password !== ConfirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (Password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
            setError('Please enter a valid email address');
            return false;
        }
        return true;

    }

    const handleSignup = async () => {
        if (!validateForm()) return;
        try {
            setLoading(true)
            setError('')
            // createuser with email and password
            const usercredential = await createUserWithEmailAndPassword(auth, Email, Password);

            //send verfication email
            await sendEmailVerification(usercredential.user)
            await signOut(auth);

            Alert.alert(
                'Account Created',
                'A verification email has been sent to your email address. ' +
                'Please verify your email before logging in.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Login')
                    }
                ]
            );
            // Clear form fields
            setEmail('');
            setPassword('');
            setConfirmPassword('');


        }
        catch (error) {
            console.log("eroor is :", error)
            let errorMessage = 'Signup failed. Please try again.';

            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'This email is already in use.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Please enter a valid email address.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password should be at least 6 characters.';
                    break;
            }

            setError(errorMessage);
        }
        finally {
            setLoading(false)
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            {/* Logo */}
            <Logo />

            {/* Let's get started */}
            <Heading heading={"Let's get started"} />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {/* EMAIL ADDRESS */}
            <SubTitle subheading={"EMAIL ADDRESS"} />
            <TextInput style={styles.InputField}
                value={Email}
                onChangeText={(txt) => setEmail(txt)}
            />

            {/* password */}
            <SubTitle subheading={"PASSWORD"} marTop={s(3)} />

            {/* PASSWORD INPUT */}
            <TextInput style={styles.InputField}
                value={Password}
                onChangeText={(txt) => setPassword(txt)} />


            {/* Confirm password */}
            <SubTitle subheading={"CONFIRM PASSWORD"} marTop={s(3)} />

            {/*Confirm PASSWORD INPUT */}
            <TextInput style={styles.InputField}
                value={ConfirmPassword}
                onChangeText={(txt) => setConfirmPassword(txt)} />

            {/* SIGN UP BUTTON */}
            <Button title={"Sign up"} onPress={handleSignup} loading={Loading} />

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

export default Signup

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

    },
    error: {
        color: 'red',
        marginBottom: 0,
        textAlign: 'center',
        fontSize: 14,
    },

})