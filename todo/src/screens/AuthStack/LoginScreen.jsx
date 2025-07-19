import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError('');
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user.emailVerified) {
                setLoading(false)
                setEmail('');
                setPassword('')
            }
            else {
                Alert.alert('Alert',
                    'Please verfiy your email.'
                )
                await sendEmailVerification(userCredential.user);
                await signOut(auth)
                setLoading(false)
                // setEmail('');
                // setpassword('')

            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"gray"}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={"gray"}

                secureTextEntry
            />
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <Button title="Login" onPress={handleLogin} />
            )}
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
};


export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: "black"
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    todoText: {
        fontSize: 16,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    deleteButton: {
        color: 'red',
        fontSize: 24,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    link: {
        color: 'blue',
        marginTop: 15,
        textAlign: 'center',
    },
});
