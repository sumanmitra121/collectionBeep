import React, { useState } from 'react'
import { Dimensions, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import { Button, TextInput, useTheme, Divider } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
const SignInScreen = ({ navigation }) => {

    const [text, setText] = React.useState("");
    const [step, setStep] = useState(1); 
    const [mobile, setMobile] = React.useState("");
    const [student, setStudent] = React.useState("");
    const [showStudentId, setShowStudentId] = useState(false);
    const [showNextStep, setShowNextStep] = useState(false); 
    const [hideText, setHideText] = useState(false); 
    const [otpval, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [Otptyped,setOtptyped] = useState(false)
    const [school, setSchool] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false); 
    const theme = useTheme();
    const [statusBarColor, setStatusBarColor] = useState('#2a7ddb45')
    const [schools, setSchools] = useState([
        { label: 'School 1', value: 'school1' },
        { label: 'School 2', value: 'school2' },
        { label: 'School 3', value: 'school3' },
      ]); 

    const handleNext = () => {
        setShowNextStep(true); 
        setHideText(true)
        if (step <= 3) {
            setStep(step + 1);
          }
          console.log(step,'step')
      };
      const handleSignin = () => {
        navigation.navigate('Main');
      };
    //   const handleInputChange = (value, type) => {
    //     if (type === 'otp') {
    //       setOtptyped(true)
    //       setOtp(value);
    //     } else if (type === 'password') {
    //       setOtptyped(true)
    //       setPassword(value);
    //     }
    //   };
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={Style.SignIn__Container}
            contentContainerStyle={{
                // justifyContent:'center',
                flexGrow: 1,
                backgroundColor: theme.colors.background,
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
                        <View style={{
                            backgroundColor: '#fff', width: 4, height:
                                4, borderRadius: 4, marginLeft: 3, marginRight: 3,
                            marginTop: Dimensions.get('window')?.width * 1.1, marginBottom: 1
                        }}
                        />
                    }
                    activeDot={
                        <View style={{
                            backgroundColor: '#fff', width: 8, height:
                                8, borderRadius: 8, marginLeft: 3, marginRight: 3,
                            marginTop: Dimensions.get('window')?.width * 1.1, marginBottom: 1,
                        }}
                        />
                    }
                    showsButtons={false} >

                    <View style={[{ ...Style.slide1, backgroundColor: '#2a7ddb45' }]}>


                        <LottieView
                            style={{ ...Style.lottie }}
                            source={require('../../assets/animation/lottie_1.json')} autoPlay loop />
                        <Text
                            style={{
                                fontFamily: 'Poppins-Regular',
                                fontSize: 12,
                                // fontWeight:'800',
                                textAlign: 'center',
                                paddingHorizontal: 15,
                            }}>
                            Education is a shared commitment between dedicated teachers, motivated students and enthusiastic parents with high expectations.

                        </Text>
                    </View>
                    <View style={[{ ...Style.slide1, backgroundColor: '#e7e7e7' }]}>
                        <LottieView
                            style={{ ...Style.lottie }}
                            source={require('../../assets/animation/lottie_2.json')} autoPlay loop />
                        <Text style={{
                            fontFamily: 'Poppins-Medium',
                            fontSize: 10,
                            textAlign: 'center'
                        }}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Culpa cupiditate quia, nemo quo ab rerum?
                        </Text>
                    </View>
                </Swiper>
            </View>

            <View style={Style.bottomContainer}>
                <Text style={{
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.onBackground,
                    fontSize: 18, textAlign: 'left'
                }}
                >
                    Welcome To CollectionBeep
                </Text>


                
                {step === 1 ? (
        showStudentId ? (
         
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
              Student ID
              <Text style={{ color: theme.colors.error }}> *</Text>
            </Text>
            <TextInput
              outlineColor={'#dddddd'}
              right={<TextInput.Icon icon="id-card" size={20} color={theme.colors.primary} />}
              keyboardType='default'
              style={{ borderRadius: 5 }}
              placeholder='Enter The Student ID'
              mode='outlined'
              contentStyle={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
              }}
              value={student}
              onChangeText={text => setStudent(text)}
            />
          </View>
        ) : (
          // Mobile Input
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
              Mobile
              <Text style={{ color: theme.colors.error }}> *</Text>
            </Text>
            <TextInput
              outlineColor={'#dddddd'}
              right={<TextInput.Icon icon="phone" size={20} color={theme.colors.primary} />}
              keyboardType='phone-pad'
              style={{ borderRadius: 5 }}
              maxLength={10}
              placeholder='Enter Mobile Number'
              mode='outlined'
              contentStyle={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
              }}
              value={mobile}
              onChangeText={text => setMobile(text)}
            />
          </View>
        )
      ) : (
        showStudentId && step === 2? (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
              Password
              <Text style={{ color: theme.colors.error }}> *</Text>
            </Text>
            <TextInput
              secureTextEntry={true}
              style={{ borderRadius: 5 }}
              placeholder='Enter Password'
              mode='outlined'
              contentStyle={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
              }}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
        ) : step === 2 && (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
              OTP
              <Text style={{ color: theme.colors.error }}> *</Text>
            </Text>
            <TextInput
              keyboardType='number-pad'
              style={{ borderRadius: 5 }}
              maxLength={6}
              placeholder='Enter OTP'
              mode='outlined'
              contentStyle={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
              }}
              value={otpval}
              onChangeText={text => setOtp(text)
            }
            />
          </View>
        )
      )}

                {step <= 2 &&<View style={{
                    marginVertical: 10
                }}>
                    <Button mode="contained-tonal"
                        style={{ borderRadius: 10, backgroundColor: theme.colors.primary, padding: 5, marginTop: 5 }}
                        labelStyle={{
                            fontFamily: 'Poppins-Regular',
                            color: theme.colors.background
                        }}

                        uppercase
                        icon={"login"}
                        onPress={handleNext}
                        >
                        next
                    </Button>
                </View>}
                {step === 3 &&
                <View style={{ marginVertical: 10 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                  Select School
                </Text>
                <DropDownPicker
                  open={showDropdown}
                  value={school}
                  items={schools}
                  setOpen={setShowDropdown}
                  setValue={setSchool}
                  setItems={setSchools}
                  style={{ marginVertical: 10, borderRadius: 5 }}
                  placeholder="Select your school"
                  dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
                />
                </View>
                }
                {step === 3 &&<View style={{
                    marginVertical: 10
                }}>
                    <Button mode="contained-tonal"
                        style={{ borderRadius: 10, backgroundColor: theme.colors.primary, padding: 5, marginTop: 5 }}
                        labelStyle={{
                            fontFamily: 'Poppins-Regular',
                            color: theme.colors.background
                        }}

                        uppercase
                        icon={"login"}
                        onPress={handleSignin}
                        >
                        Signin
                    </Button>
                </View>}
               
                {!hideText &&<View style={{ flexDirection: 'row', alignItems: 'center', marginTop:20}}>
                    <View style={{ flex: 1, height: 0.8, backgroundColor: 'black' }} />
                    <TouchableOpacity style={Style.dividersection}  onPress={() => setShowStudentId(!showStudentId)}>
                    <Text style={{
                       fontFamily: 'Poppins-Regular', color:theme.colors.primary, fontSize: 14,
                        textAlign: 'center', textDecorationLine: 'underline',
                    }}> {showStudentId ? 'Signin with Mobile Number' : 'Signin with Student Id'}</Text>
                </TouchableOpacity>
                    <View style={{ flex: 1, height: 0.8, backgroundColor: 'black' }} />
                </View>}

            </View>
        </ScrollView>
    )
}

const Style = StyleSheet.create({
    SignIn__Container: {
        flexGrow: 1,
        backgroundColor: '#fff',

    },
    bottomContainer: {
        padding: 10,
        marginTop: 40
    },
    wrapper: {},
    SignIn_TopImageHolder: {
        height: Dimensions.get('window')?.width * 1.0,
        width: Dimensions.get('window')?.width,
    },
    lottie: {
        // height:width,
        width: Dimensions.get('window')?.width * 0.6,
        aspectRatio: 1
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#4600a9',
        padding: 5
    },
    dividersection: {

    }

})

export default SignInScreen
