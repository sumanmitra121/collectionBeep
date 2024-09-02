import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
  return <SafeAreaView style={{flex:1}}>
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
                                                        fontFamily:focused ? 'Poppins-Bold' : 'Poppins-Medium'
                                                }}
                                                >
                                                       {children}         
                                                </Text>
                                        ),
                                        tabBarStyle:Style.tabBarStyle,
                                        tabBarItemStyle:Style.tabBarItemStyle,
                                        tabBarActiveBackgroundColor:theme.colors.primaryContainer,
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
                //  backgroundColor:'#fefce8',
                 position:'absolute',
                 bottom:10,
                 left:20,
                 right:20,
                 borderRadius:30,
                 borderTopWidth:0,
                 shadowColor:'#000',
                 shadowOffset:{width:0,height:5},
                 shadowOpacity:0.5,
                 shadowRadius:5,
                 elevation:4
        },
        tabBarItemStyle:{
                // paddingVertical:5,
                marginVertical:9,
                marginHorizontal:5,
                borderRadius:40,

        }
})

export default MainLayout
