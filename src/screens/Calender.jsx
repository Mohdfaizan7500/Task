import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { getAuth } from '@react-native-firebase/auth'

const Calender = ({ title }) => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false)

  const logOutButton = async () => {
    Alert.alert('Log out Task')
  //  await signOut(getAuth());




  }
  return (
    <View style={styles.container}>
      {/* <Button title={title} sendData={logOut} loading={loading} /> */}
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