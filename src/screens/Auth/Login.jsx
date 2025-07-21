import React, { useState } from 'react';
import { Alert, Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { sendEmailVerification, signInWithEmailAndPassword, signOut } from '@react-native-firebase/auth';
// import { auth } from '../../../firebase/firebaseConfig';
import OpenEyeIcon from 'react-native-vector-icons/Octicons';
import CloseEyeIcon from 'react-native-vector-icons/Octicons';
import Logo from '../../components/Logo';
import Heading from '../../components/Heading';
import SubTitle from '../../components/SubTitle';
import Button from '../../components/Button';
import SocialMediaPlatform from '../../components/SocialMediaPlatform';
import SocialContainer from '../../components/SocialContainer';
import { auth } from '../../firbaseConfig/firebaseConfig';

const Login = ({ navigation }) => {
  const [Loading, setLoading] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [PassVisible, setPassVisible] = useState(true);

  const validateForm = () => {
    if (!Email) {
      setError("Email is required");
      return false;
    }
    if (!Password) {
      setError("Password is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');

      const userCredential = await signInWithEmailAndPassword(auth, Email, Password);
      if (userCredential.user.emailVerified) {
        setLoading(false);
        setEmail('');
        setPassword('');
        Alert.alert('Alert', 'Login Successfully.');
      } else {
        Alert.alert('Alert', 'Please verify your email.');
        await sendEmailVerification(userCredential.user);
        await signOut(auth);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error:", error.code);
      let errorMessage = 'Login failed. Please try again.';

      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
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
      <Heading heading={"Welcome back!"} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <SubTitle subheading={"EMAIL ADDRESS"} />
      <TextInput
        style={styles.InputField}
        value={Email}
        onChangeText={(txt) => [setEmail(txt), setError('')]}
      />
      <SubTitle subheading={"PASSWORD"} Forget={true} onPress={() => navigation.navigate("ResetPassword")} />
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: vs(5) }}>
        <TextInput
          secureTextEntry={PassVisible}
          style={[styles.InputField, { marginTop: 0 }]}
          value={Password}
          onChangeText={(txt) => [setPassword(txt), setError('')]}
        />
        <View style={{ position: "absolute", right: 15 }}>
          <Pressable onPress={() => setPassVisible(!PassVisible)}>
            {PassVisible ? (
              <CloseEyeIcon name="eye-closed" size={20} color="#000" />
            ) : (
              <OpenEyeIcon name="eye" size={20} color="#000" />
            )}
          </Pressable>
        </View>
      </View>
      <Button title={"Log in"} onPress={handleLogin} loading={Loading} />
      <SocialMediaPlatform title={"Log in"} />
      <SocialContainer />
      <Text style={styles.LoginLink}>
        Don't have an account?
        <Text style={styles.LinkText} onPress={() => navigation.goBack()}>
          Get started!
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Login;

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
