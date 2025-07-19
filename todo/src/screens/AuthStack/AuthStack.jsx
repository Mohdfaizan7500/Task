import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ResetPasswordScreen from './ResetPasswordScreen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
