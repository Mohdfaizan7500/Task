import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Calender = ({ title }) => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false)

  const logOut = async () => {
    setloading(true)
    await AsyncStorage.clear();
    navigation.navigate("Login")
    setloading(false)
    Alert.alert("Logout");


  }
  return (
    <View style={styles.container}>
      <Button title={title} sendData={logOut} loading={loading} />
    </View>
  )
}

export default Calender

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
})