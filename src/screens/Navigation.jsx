import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Splash from './Splash';
import SignUp from './signup';
import Login from './Login';
import Main from './Main';
import Home from './Home';
import AddTask from './AddTask';
import { getAuth } from '@react-native-firebase/auth';
import Todo from '../../scr2/Todo';
const Stack = createNativeStackNavigator();


const Navigation = () => {
  // const [isUserLogin, setisUserLogin] = useState(false)


  // getAuth().onAuthStateChanged(user => {
  //   if (user !== null) {
  //     setisUserLogin(true)
  //   }
  // })

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name='Signup' component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Todo' component={Todo} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})