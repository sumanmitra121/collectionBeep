import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLayOut from './Screens/Auth/AuthLayOut';
import MainLayout from './Screens/Main/MainLayout';
import Liveclasses from './Screens/Liveclasses';
import { LoaderProvider } from './Screens/Contexts/LoaderProvider';
import { GlobalLoader } from './Screens/services/DbIntrService';
import { AuthGuardProvider } from './Screens/Contexts/AuthGuardContext';
import AuthGuardRoutes from './Screens/Contexts/AuthGuardRoutes';

const Stack = createNativeStackNavigator();

export default function App(){
    return <AuthGuardProvider>
    <LoaderProvider>
    <GlobalLoader/>

    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthGuard" component={AuthGuardRoutes} />
    </Stack.Navigator>
    </NavigationContainer>
    </LoaderProvider>
    </AuthGuardProvider>
}
