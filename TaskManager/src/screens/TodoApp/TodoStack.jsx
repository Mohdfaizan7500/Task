import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useState, } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { TodoProvider } from './TodoProvider';



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
    <TodoProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='TodoList' component={TodoList} />
        <Stack.Screen name='AddTodo' component={AddTodo} />
      </Stack.Navigator>
    </TodoProvider>

  )
}

export default TodoStack


const styles = StyleSheet.create({})