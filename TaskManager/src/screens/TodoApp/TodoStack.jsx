import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useState, } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TodoList from './TodoList';
import AddTodo from './AddTodo';



const Stack = createNativeStackNavigator();

const data = [
  {
    id: 1,
    title: "faizan"
  },
  {
    id: 2,
    title: "faizan"
  }
]


const TodoStack = () => {

  
  const task = "ftftyt"

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='TodoList' component={TodoList} />
      <Stack.Screen name='AddTodo' component={AddTodo} />
    </Stack.Navigator>

  )
}

export default TodoStack


const styles = StyleSheet.create({})