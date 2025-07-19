import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import PlusButton from '../../components/PlusButton'

const TodoList = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <Header/>
      <PlusButton onPress={()=>navigation.navigate('AddTodo')}/>
    </SafeAreaView>
  )
}

export default TodoList

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#f5f5f5",
        flex:1
    }
})