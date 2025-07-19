import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { sendPasswordResetEmail } from '@react-native-firebase/auth';
// import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../../firebase/firebaseConfig';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('Please enter your email address');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) return;

    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      await sendPasswordResetEmail(auth, email);

      setSuccess(true);
      Alert.alert(
        'Password Reset Email Sent',
        'Please check your inbox for instructions to reset your password. ' +
        'If you don\'t see the email, check your spam folder.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
      
      // Clear the form
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
            <Text>Back</Text>
          {/* <Ionicons name="arrow-back" size={24} color="#4A90E2" /> */}
        </TouchableOpacity>

        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll send you a link to reset your password
        </Text>
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success && <Text style={styles.success}>Password reset email sent successfully!</Text>}

        <View style={styles.inputContainer}>
          {/* <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} /> */}
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.loginLink} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>
            Remember your password? <Text style={styles.loginLinkText}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  button: {
    height: 50,
    backgroundColor: '#4A90E2',
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
    marginBottom: 15,
    textAlign: 'center',
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
});

export default ResetPasswordScreen;
