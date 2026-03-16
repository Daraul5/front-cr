// src/navigation/MainTab.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Register" // Lo ponemos de inicio para que lo veas apenas cargue
      screenOptions={{
        headerStyle: { backgroundColor: '#000000' },
        headerTintColor: '#ffffff',
        tabBarStyle: { 
          backgroundColor: '#000000', 
          borderTopColor: '#333333' 
        },
        tabBarActiveTintColor: '#4da6ff',
        tabBarInactiveTintColor: '#888888',
      }}
    >
      {/* Pestaña 1: La solicitud para los nuevos */}
      <Tab.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ title: 'Registro' }} 
      />

      {/* Pestaña 2: El acceso para los ya aceptados */}
      <Tab.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Acceso' }} 
      />

      {/* Pestaña 3: Los eventos del club */}
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Eventos' }} 
      />
      
      {/* Pestaña 4: El chat de miembros */}
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ title: 'Chat' }} 
      />
    </Tab.Navigator>
  );
}