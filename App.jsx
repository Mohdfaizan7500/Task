import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Splash from './src/screens/Splash'
import SignUp from './src/screens/signup'
import Login from './src/screens/Login'
import Navigation from './src/screens/Navigation'

const App = () => {
  return (
    <Navigation/>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
   flex:1
  }
})