import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthGuardContext = createContext();

export const AuthGuardProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AsyncStorage.getItem('token'))
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(token);
      setLoading(false);
    };
    console.log(isAuthenticated,'isAuthenticated checkAuth')
    checkAuth();
  }, []);
  

//   const login = async (token) => {
//     await AsyncStorage.getItem('token', token); 
//     setIsAuthenticated(true); 
//   };
//   const logout = async () => {
//     await AsyncStorage.removeItem('token'); 
//     setIsAuthenticated(false); 
//   };

  return (
    <AuthGuardContext.Provider value={{ isAuthenticated, loading,setIsAuthenticated }}>
      {children}
    </AuthGuardContext.Provider>
  );
};
