import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import TaskListScreen from './Screens/TaskListScreen';
import AddTaskScreen from './Screens/AddTaskScreen';
import { TaskProvider } from './TaskProvider';
import TaskListScreen2 from './Screens/TaskListScreen';
import TaskListScreen3 from './Screens/TaskListScreen copy';

const Todo = () => {

  const Stack = createNativeStackNavigator();
  return (
    <TaskProvider>
      {/* <NavigationContainer> */}
        <Stack.Navigator>
          <Stack.Screen name='TaskListScreen' component={TaskListScreen3} options={{headerShown:false}} />
          <Stack.Screen name='AddTaskScreen' component={AddTaskScreen} />
        </Stack.Navigator>
      {/* </NavigationContainer> */}
    </TaskProvider>
  )
}

export default Todo

const styles = StyleSheet.create({})