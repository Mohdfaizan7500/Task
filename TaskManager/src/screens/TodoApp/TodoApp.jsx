import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TodoList from './TodoList';
import AddTodo from './AddTodo';

const Stack = createNativeStackNavigator();

const TodoApp = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='TodoList' component={TodoList} />
      <Stack.Screen name='AddTodo' component={AddTodo} />
    </Stack.Navigator>
  )
}

export default TodoApp

const styles = StyleSheet.create({})