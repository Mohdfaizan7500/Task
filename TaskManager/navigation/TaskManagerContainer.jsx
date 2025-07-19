import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TodoApp from '../src/screens/TodoApp/TodoApp';
import AuthStack from '../src/screens/Auth/AuthStack';
import { AuthProvider, useAuth } from '../src/screens/Auth/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const TaskManagerContainer = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AuthProvider>
    )
}

const AppNavigator = () => {
    const { user } = useAuth()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ?
                (<Stack.Screen name='TodoApp' component={TodoApp} />)
                :
                (<Stack.Screen name='Auth' component={AuthStack} />)

            }
        </Stack.Navigator>
    )
}

export default TaskManagerContainer
