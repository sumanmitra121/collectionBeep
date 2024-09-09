import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import FeesCollectionScreen from './FeesCollection';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReportCardsScreen from './ReportCards';
import { Menus } from '../../Contstant/Menus';
import { useTheme } from 'react-native-paper';
import NavComponent from '../Components/Nav';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainLayout = () => {
        console.log('sss');
        const theme = useTheme();
  return <SafeAreaView style={{flex:1}}>
             <StatusBar
              backgroundColor={theme.colors.primary}
              animated={true}
              barStyle={'light-content'}
             />   
            <Stack.Navigator initialRouteName='Outlet' screenOptions={{headerShown:false}}>
                    <Stack.Screen name="Outlet" component={AppTabNavigation}/>
            </Stack.Navigator>
    </SafeAreaView>
  
}

const AppTabNavigation = () =>{
        const theme = useTheme();
        return <Tab.Navigator initialRouteName='Home'
                
                screenOptions={
                        ({route}) => ({
                                        tabBarIcon: ({color,size,focused}) => {
                                                    let iconName;
                                                    switch(route.name){
                                                        case 'Home': iconName = focused ? 'home' : 'home-outline';break;
                                                        case 'Fees': iconName = focused ? 'scan-circle' : 'scan-circle-outline';break;
                                                        case 'Reports': iconName = focused ? 'bar-chart' : 'bar-chart-outline';break;
                                                    }
                                                return <Ionicons
                                                 name={iconName} size={size}
                                                 color={focused ? theme.colors.primary : color}
                                                />
                                        },
                                        tabBarLabel:({children,color,focused}) =>  (
                                                <Text 
                                                style={{
                                                        fontFamily:focused ? 'Poppins-Medium' : 'Poppins-Regular',
                                                        fontSize: 10,
                                                        color: focused ? theme.colors.primary : '',
                                                        fontWeight: focused ? 'Bold' : 'normal',
                                                        fontFamily:focused ? 'Poppins-Bold' : 'Poppins-Medium',
                                                }}
                                                >
                                                       {children}         
                                                </Text>
                                        ),
                                        tabBarStyle:Style.tabBarStyle,
                                        tabBarItemStyle:Style.tabBarItemStyle,
                                        tabBarActiveBackgroundColor:theme.colors.background,
                                        header:(props) => <NavComponent {...props}/>
                                }
                        )
                }
        >
                {
                        Menus.map(el =>{
                               return <Tab.Screen 
                                        key={el.id}
                                        name={el.path}
                                        options={{
                                                title:el.title
                                        }}
                                       children={el.component}/>
                                
                        })
                }
        </Tab.Navigator>
}

const Style = StyleSheet.create({
        tabBarStyle:{
                 height:70,
                 position:'absolute',
                 bottom:10,
                 left:20,
                 right:20,
                 borderRadius:10,
                 borderTopWidth:0,
                 shadowColor:'#000',
                 shadowOffset:{width:0,height:1},
                 shadowOpacity:0.5,
                 shadowRadius:5,
                 elevation:2
        },
        tabBarItemStyle:{
                marginVertical:9,
                marginHorizontal:20,
                borderRadius:50
        }
})

export default MainLayout
