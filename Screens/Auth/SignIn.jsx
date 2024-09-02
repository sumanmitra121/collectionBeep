import React, { useState } from 'react'
import { Dimensions, ImageBackground, ScrollView, StatusBar, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
const SignInScreen = ({navigation}) => {
  
    const [text, setText] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const theme = useTheme();
    const [statusBarColor,setStatusBarColor] = useState('#2a7ddb45')

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={Style.SignIn__Container}
    contentContainerStyle={{
        // justifyContent:'center',
        // flex:1,
        backgroundColor:theme.colors.background,
        // padding:8
    }}
    >
        <StatusBar
        backgroundColor={statusBarColor}
        barStyle={'dark-content'}
        animated={true}
        />
        <View style={Style.SignIn_TopImageHolder}>
            <Swiper loadMinimal={true} 
                height={Dimensions.get('window').width * 0.9}
                loadMinimalSize={1} 
                autoplay={false}
                bounces={true}
                loop={false}
                showsPagination={false}
                style={Style.wrapper}
                autoplayTimeout={3.5} 
                onIndexChanged={(e) => {
                    console.log(e)
                    setStatusBarColor(e > 0 ? '#e7e7e7' : '#2a7ddb45')
                }}
                dot={
                <View style={{backgroundColor:'#fff', width: 4, height: 
                    4,borderRadius: 4, marginLeft: 3, marginRight: 3, 
                    marginTop: Dimensions.get('window')?.width * 1.1, marginBottom: 1
                }} 
                    />
                }
                activeDot={
                    <View style={{backgroundColor:'#fff', width:8, height: 
                    8,borderRadius: 8, marginLeft: 3, marginRight: 3,
                    marginTop: Dimensions.get('window')?.width * 1.1, marginBottom: 1,}} 
                    />
                }
                showsButtons={false} >

                                <View style={[{...Style.slide1,backgroundColor:'#2a7ddb45'}]}>
                                        <LottieView 
                                        style={{...Style.lottie}}
                                        source={require('../../assets/animation/lottie_1.json')} autoPlay loop/>
                                        <Text style={{
                                            fontFamily:'Poppins-Medium',
                                            fontSize:10,
                                            textAlign:'center'
                                        }}>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                                        Culpa cupiditate quia, nemo quo ab rerum?
                                    </Text>
                                </View>
                                <View style={[{...Style.slide1,backgroundColor:'#e7e7e7'}]}>
                                        <LottieView 
                                        style={{...Style.lottie}}
                                        source={require('../../assets/animation/lottie_2.json')} autoPlay loop/>
                                        <Text style={{
                                            fontFamily:'Poppins-Medium',
                                            fontSize:10,
                                            textAlign:'center'
                                        }}>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                                        Culpa cupiditate quia, nemo quo ab rerum?
                                    </Text> 
                                </View>
                    </Swiper>
            </View>

            <View style={{padding:10,marginTop:30}}>
                  <Text style={{fontFamily:'Poppins-Regular',
                  color:theme.colors.onBackground,
                  fontSize:18,textAlign:'center'}}
                  
                  >
                    Welcome Back!!  
                  </Text>  
                  <Text style={{fontFamily:'Poppins-Regular',
                  color:theme.colors.inverseSurface,
                  fontSize:12,textAlign:'center'}}
                  
                  >
                   Please signin with registered Mobile Number & Student Id
                  </Text>   
                  <View style={{marginTop:20}}>
                  <Text style={{fontFamily:'Poppins-Medium',color:theme.colors.primary, fontSize:14}}>
                    Student ID
                    <Text style={{
                        color:theme.colors.error
                    }}>
                        *
                    </Text>
                    
                    </Text>
                     <TextInput
                    outlineColor={'#dddddd'}
                     
                     right={<TextInput.Icon icon="account"  size={20} color={theme.colors.primary}/>}
                     style={{height: 50,borderRadius:5}}
                     placeholder='Enter Student Id'
                        mode='outlined'
                        contentStyle={{
                            fontFamily:'Poppins-Regular',
                            fontSize:14
                        }}
                    value={text}
                    onChangeText={text => setText(text)}
                    />
                     </View>      

                     <View  style={{marginVertical:10}}>
                     <Text style={{fontFamily:'Poppins-Medium',color:theme.colors.primary, fontSize:14}}>Mobile
                     <Text style={{
                        color:theme.colors.error
                    }}>
                        *
                    </Text>

                     </Text>
                    <TextInput
                    outlineColor={'#dddddd'}
                      right={<TextInput.Icon icon="phone" size={20} color={theme.colors.primary}/>}
                    keyboardType='phone-pad'
                    secureTextEntry={true}
                    style={{height: 50,borderRadius:5}}
                    maxLength={10}
                    placeholder='Enter Mobile Number'
                    mode='outlined'
                    contentStyle={{
                        fontFamily:'Poppins-Regular',
                        fontSize:14
                    }}
                    value={mobile}
                    onChangeText={text => setMobile(text)}
                    />
                     </View>  
                     <View style={{
                        marginVertical:10
                     }}>
                           <Button mode="elevated" 
                           style={{ borderRadius: 5,backgroundColor:theme.colors.primary }}
                           labelStyle={{
                            fontFamily:'Poppins-Regular',
                            color:theme.colors.background
                           }}
                           icon={"login"}
                           onPress={() => {
                            navigation.navigate('Main');
                           }}>
                            SignIn
                        </Button>
                        </View>    
                  

            </View>
    </ScrollView>
  )
}

const Style = StyleSheet.create({
    SignIn__Container:{
            flexGrow:1,
            backgroundColor:'#fff',
            
    },
    wrapper: {},
    SignIn_TopImageHolder:{
           height:Dimensions.get('window')?.width * 0.8,
           width:Dimensions.get('window')?.width,
    },
    lottie:{
        // height:width,
        width: Dimensions.get('window')?.width * 0.6,
        aspectRatio:1
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#4600a9',
        padding:5
      },

})

export default SignInScreen
