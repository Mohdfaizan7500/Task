import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { TodoProvider } from './TodoProvider';

const Stack = createNativeStackNavigator();

const TodoStack = () => {
  return (
    <TodoProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='TodoList' component={TodoList} />
        <Stack.Screen name='AddTodo' component={AddTodo} />
      </Stack.Navigator>
    </TodoProvider>
  );
};

export default TodoStack;

const styles = StyleSheet.create({});
