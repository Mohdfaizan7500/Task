import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Login';
import ResetPassword from './ResetPassword';
import Signup from './Signup';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Signup' component={Signup}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='ResetPassword' component={ResetPassword}/>
    </Stack.Navigator>
    
  )
}

export default AuthStack

const styles = StyleSheet.create({})