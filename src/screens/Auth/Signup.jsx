import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
// import { auth } from '../../../firebase/firebaseConfig';
import {  sendEmailVerification, signOut, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import Logo from '../../components/Logo';
import Heading from '../../components/Heading';
import SubTitle from '../../components/SubTitle';
import Button from '../../components/Button';
import SocialMediaPlatform from '../../components/SocialMediaPlatform';
import SocialContainer from '../../components/SocialContainer';
import { auth } from '../../firbaseConfig/firebaseConfig';

const Signup = ({ navigation }) => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
    };

    const handleSignup = async () => {
        if (!validateForm()) return;
        try {
            setLoading(true);
            setError('');
            const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
            await sendEmailVerification(userCredential.user);
            await signOut(auth);

            Alert.alert(
                'Account Created',
                'A verification email has been sent to your email address. Please verify your email before logging in.',
                [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );

            // Clear form fields
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.log("Error:", error);
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Logo />
            <Heading heading={"Let's get started"} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <SubTitle subheading={"EMAIL ADDRESS"} />
            <TextInput
                style={styles.InputField}
                value={Email}
                onChangeText={setEmail}
            />
            <SubTitle subheading={"PASSWORD"} marTop={s(3)} />
            <TextInput
                style={styles.InputField}
                value={Password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <SubTitle subheading={"CONFIRM PASSWORD"} marTop={s(3)} />
            <TextInput
                style={styles.InputField}
                value={ConfirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title={"Sign up"} onPress={handleSignup} loading={Loading} />
            <SocialMediaPlatform title={"Sign up"} />
            <SocialContainer />
            <Text style={styles.LoginLink}>
                Already have an account?
                <Text style={styles.LinkText} onPress={() => navigation.navigate('Login')}>
                    Log in
                </Text>
            </Text>
        </SafeAreaView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: vs(50),
        paddingHorizontal: s(40),
    },
    InputField: {
        width: "100%",
        height: vs(45),
        backgroundColor: "#f6f7fc",
        borderRadius: s(25),
        borderWidth: 0.5,
        borderColor: "gray",
        marginTop: vs(8),
        fontSize: 16,
        color: "black",
        paddingStart: s(25),
    },
    LoginLink: {
        alignSelf: "center",
        color: "gray",
        fontSize: s(14),
        marginTop: vs(35),
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
});
