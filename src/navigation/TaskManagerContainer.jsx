import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import TodoStack from './TodoStack';
import Splash from '../screens/Auth/Splash';
import { AuthProvider, useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();
const TaskManagerContainer = () => {
    return (
        <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator  screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='Splash' component={Splash}/>
                        <Stack.Screen name='AppNavigator' component={AppNavigator}/>
                    </Stack.Navigator>
                </NavigationContainer>
        </AuthProvider>
    )
}

const AppNavigator = () => {
    const { user } = useAuth()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ?
                (<Stack.Screen name='TodoStack' component={TodoStack} />)
                :
                (<Stack.Screen name='Auth' component={AuthStack} />)

            }
        </Stack.Navigator>
    )
}

export default TaskManagerContainer
