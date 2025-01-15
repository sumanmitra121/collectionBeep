import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLayOut from '../Auth/AuthLayOut';
import MainLayout from '../Main/MainLayout';
import Loader from '../Components/Loader';
import { AuthGuardContext } from './AuthGuardContext';

const Stack = createNativeStackNavigator();

const AuthGuardRoutes = () => {
  const { isAuthenticated, loading } = useContext(AuthGuardContext);
  console.log(isAuthenticated,'isAuthenticated')

  if (loading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainLayout} />
      ) : (
        <Stack.Screen name="Auth" component={AuthLayOut} />
      )}
    </Stack.Navigator>
  );
};

export default AuthGuardRoutes;
