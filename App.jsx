import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLayOut from './Screens/Auth/AuthLayOut';
import MainLayout from './Screens/Main/MainLayout';
const Stack = createNativeStackNavigator();

export default function App(){
    return <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown:false}}>
                    <Stack.Screen name="Auth" component={AuthLayOut}/>
                    <Stack.Screen name="Main" component={MainLayout}/>
                </Stack.Navigator>
    </NavigationContainer>
}