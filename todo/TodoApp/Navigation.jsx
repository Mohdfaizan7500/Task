// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoApp from '../src/screens/TodoApp/TodoApp';
import AuthStack from '../src/screens/AuthStack/AuthStack';
import { AuthProvider, useAuth } from '../firebase/AuthContext';

const Stack = createNativeStackNavigator();

const TodoAppContainer = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="TodoApp" component={TodoApp} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default TodoAppContainer;
