import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Splash from './Splash';
import SignUp from './signup';
import Login from './Login';
import Main from './Main';

const Navigation = () => {

    const Stack = createNativeStackNavigator();
  return (
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name='Signup' component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Main' component={Main} options={{headerShown:false}}/>


    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})