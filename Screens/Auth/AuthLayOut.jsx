import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { KeyboardAvoidingView,  Platform,  SafeAreaView } from 'react-native';
import SignInScreen from './SignIn';
import LoginByMobile from '../Components/LoginByMobile';


const Stack = createNativeStackNavigator(); 

const AuthLayOut = () => {
  return <SafeAreaView style={{flex:1}}>
           <KeyboardAvoidingView style={{flex:1}} enabled behavior={Platform.OS == 'ios' ? 'padding' : null}>
            <Stack.Navigator screenOptions={{
                headerShown:false
            }}>
                    <Stack.Screen name='SignIn' component={SignInScreen}/>
            </Stack.Navigator>
            </KeyboardAvoidingView>
    </SafeAreaView>
}

export default AuthLayOut
