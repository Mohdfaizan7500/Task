import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from '../src/screens/Auth/AuthStack';
import { AuthProvider, useAuth } from '../src/screens/Auth/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import TodoStack from '../src/screens/TodoApp/TodoStack';
import { TodoProvider } from '../src/screens/TodoApp/TodoProvider';
import Splash from '../src/screens/Auth/Splash';

const Stack = createNativeStackNavigator();

const TaskManagerContainer = () => {
    return (
        <AuthProvider>
            <TodoProvider>
                <NavigationContainer>
                    <Stack.Navigator  screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='Splash' component={Splash}/>
                        <Stack.Screen name='AppNavigator' component={AppNavigator}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </TodoProvider>
        </AuthProvider>
    )
}

const AppNavigator = () => {
    const { user } = useAuth()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name='TodoStack' component={TodoStack} /> */}
            {/* <Stack.Screen name='Auth' component={AuthStack} /> */}
            {user ?
                (<Stack.Screen name='TodoStack' component={TodoStack} />)
                :
                (<Stack.Screen name='Auth' component={AuthStack} />)

            }
        </Stack.Navigator>
    )
}

export default TaskManagerContainer
