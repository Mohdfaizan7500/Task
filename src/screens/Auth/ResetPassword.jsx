import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { sendPasswordResetEmail } from '@react-native-firebase/auth';
import { s, vs } from 'react-native-size-matters';
import { ColorPatel } from '../../constants/ColorPatel copy';
import { auth } from '../../firbaseConfig/firebaseConfig';

const ResetPassword = ({ navigation }) => {
    const [Email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const validateEmail = () => {
        if (!Email) {
            setError('Please enter your email address');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
            setError('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const handleSendResetEmail = async () => {
        if (!validateEmail()) return;
        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, Email);
            setSuccess(true);
            Alert.alert(
                'Password Reset Email Sent',
                'Please check your inbox for instructions to reset your password. If you don\'t see the email, check your spam folder.',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
            setEmail('');
        } catch (error) {
            let errorMessage = 'Failed to send reset email. Please try again.';
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email address.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Please enter a valid email address.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many attempts. Please try again later.';
                    break;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <BackIcon name="arrow-back-sharp" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                    Enter your email and we'll send you a link to reset your password
                </Text>
                {success && <Text style={styles.success}>Password reset email sent successfully!</Text>}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.InputField}
                        value={Email}
                        placeholder="Email Address"
                        placeholderTextColor="#888"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoCorrect={false}
                        onChangeText={(txt) => [setEmail(txt), setError('')]}
                    />
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {loading ? (
                    <ActivityIndicator size="large" color="#4A90E2" />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleSendResetEmail}>
                        <Text style={styles.buttonText}>Send Reset Link</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={styles.loginLink}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.loginText}>
                        Remember your password? <Text style={styles.loginLinkText}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
    },
    button: {
        height: 50,
        backgroundColor: ColorPatel.AppColor,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    error: {
        color: 'red',
        marginBottom: 0,
        textAlign: 'left',
        marginStart: s(20),
        fontSize: 12,
        marginTop: vs(5),
    },
    success: {
        color: 'green',
        marginBottom: 15,
        textAlign: 'center',
    },
    loginLink: {
        marginTop: 25,
        alignItems: 'center',
    },
    loginText: {
        color: '#666',
        fontSize: 16,
    },
    loginLinkText: {
        color: '#4A90E2',
        fontWeight: '600',
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
});
