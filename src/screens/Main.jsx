import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import Footer from '../components/Footer'
import List from './List'
import AddTask from './AddTask'
import Calender from './Calender'
import { useRoute } from '@react-navigation/native'

const Main = () => {
  // const route = useRoute();
  // const { button } = route.params;
  const [Selected, setSelected] = useState('')

  
  const handleData = (childData) => {
    setSelected(childData)
    console.log("main screen state update",childData)

  }
   const Updatehandle = (childData) => {
    setSelected(2)
    console.log("main screen state update",childData)

  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header/>
      {Selected == 1 && <List sendData={Updatehandle} /> }
      {Selected == 2 && <AddTask title={'Add Task'}  />}
      {Selected == 3 && <Calender title={'Log out'}  />}

      <Footer sendData={handleData} />
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({})