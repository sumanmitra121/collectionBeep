import React, { useEffect, useRef, useState, useContext } from 'react'
import { Dimensions, ImageBackground, ScrollView, Text, View, Image, KeyboardAvoidingView } from 'react-native'
import { StyleSheet } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper';
import * as yup from 'yup';
import { Formik, } from 'formik';
import { BASE_URL } from '../Config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoader } from '../Contexts/LoaderProvider';
import { AuthGuardContext } from '../Contexts/AuthGuardContext';

import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import OtpInput from '../Components/OtpInput';

// const validationSchema = yup.object().shape({
//   step: yup.number().default(1),
//   student_id: yup.string().when("isMobile", {
//     is: (value) => value == false,
//     then: () => yup.string().when('step', {
//       is: (value) => { return value == 1 },
//       then: () => yup.string().required('*Student Id is required')
//         .length(9, 'Student ID length should be 5')
//         .test('is-registered-id', 'Student ID mismatch',
//           (value) => value === '24BOL0256'
//         ),
//       otherwise: () => yup.string().notRequired(),
//     }),
//     otherwise: () => yup.string().notRequired(),
//   }),
//   password: yup.string().when("isMobile", {
//     is: (value) => value == false,
//     then: () => yup.string().when('step', {
//       is: (value) => { return value == 1 },
//       then: () => yup.string().required('*Password is required')
//         .length(9, 'Password length should be 9')
//         .test('is-valid-password', 'wrong password',
//           (value) => value === '24BOL0256'
//         ),
//       otherwise: () => yup.string().notRequired(),
//     }),
//     otherwise: () => yup.string().notRequired(),
//   }),
//   // school: yup.string().when(['isMobile', 'step'], {
//   //   // is: (isMobile, step) => (isMobile && step === 3) || (!isMobile && step === 2),
//   //   is: (isMobile, step) => (isMobile && step === 3),
//   //   then: () => yup.string().required('*Please select school'),
//   //   otherwise: () => yup.string().notRequired(),
//   // }),

//   // school: yup.string().when('step', {
//   //   is: value => { return value > 2 },
//   //   then: () => yup.string().required('*Please select school')
//   // }),
// });

const validationSchema = yup.object().shape({
  isFaculty: yup.boolean().default(false), // Toggle between student & faculty login
  student_id: yup.string().when("isFaculty", {
    is: false,
    then: () =>
      yup.string().required("*Student ID is required")
        .length(9, "Student ID length should be 9"),
    otherwise: () => yup.string().notRequired(),
  }),
  password: yup.string().when("isFaculty", {
    is: false,
    then: () =>
      yup.string().required("*Password is required")
        .length(9, "Password length should be 9"),
    otherwise: () => yup.string().notRequired(),
  }),
  faculty_id: yup.string().when("isFaculty", {
    is: true,
    then: () =>
      yup.string().required("*Faculty ID is required"),
        // .length(9, "Faculty ID length should be 9"),
    otherwise: () => yup.string().notRequired(),
  }),
  faculty_password: yup.string().when("isFaculty", {
    is: true,
    then: () =>
      yup.string().required("*Password is required"),
        // .length(9, "Password length should be 9"),
    otherwise: () => yup.string().notRequired(),
  }),
});
const SignInScreen = ({ navigation }) => {
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthGuardContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  useEffect(() => {
    console.log('IS AUTHENTICATED - useeffect', isAuthenticated);  // Now you'll see the updated value of `isAuthenticated`
  }, [isAuthenticated]);
  const { showLoader, hideLoader } = useLoader();
  const [showDropdown, setShowDropdown] = useState(false);
  const theme = useTheme();
  const [statusBarColor, setStatusBarColor] = useState('#2a7ddb45')
  const [schools, setSchools] = useState([
    { label: 'School 1', value: 's1' },
    { label: 'School 2', value: 's2' },
    { label: 'School 3', value: 's3' },
  ]);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          // backgroundColor: theme.colors.background
        }}
      >
        <ImageBackground
          source={require('../../assets/images/waveBg.png')}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <View style={[Style.topContainer, { height: Dimensions.get('window')?.height * 0.5 }]}>
            <Image
              source={require('../../assets/images/TIG-logo.png')}
              style={Style.logo}
              resizeMode="contain"
            />
          </View>
          {/* <StatusBar
        backgroundColor={statusBarColor}
        barStyle={'dark-content'}
        animated={true}
      /> */}
          {/* <View style={Style.SignIn_TopImageHolder}>
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
      </View> */}
          <View style={[Style.bottomContainer, { height: Dimensions.get('window')?.height * 0.5 }]}>
            <Formik
              initialValues={{
                isFaculty: false,
                student_id: "",
                password: "",
                faculty_id: "",
                faculty_password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                console.log('Form values:', values);

                if (values.isFaculty) {
                  console.log("Signing in as faculty");
                  const login_by_faculty = {
                    FP_FacultyCode: values.faculty_id,
                    FP_Password: values.faculty_password
                  };
                  console.log(login_by_faculty,'login_by_faculty')
                  try {
                    showLoader('Logging..');
                    const response = await axios.post(`${BASE_URL}/api/FacultyLogin/GetFacultyLoginById`, login_by_faculty);
                    const result = response.data;
  
                    if (result.IsValid === true) {
                      await AsyncStorage.setItem('token', result.Data.token);
                      await AsyncStorage.setItem('user_type', 'F'); 
                      console.log('Login successful', result);
                      setIsAuthenticated(await AsyncStorage.getItem(`token`))
                      navigation.navigate('Main');
                    } else {
                      console.error('Login failed', result);
                      alert(result.message || 'Login failed. Please try again.');
                    }
                  } catch (error) {
                    console.error('API call error', error.response ? error.response.data : error.message);
                    alert(error.response ? error.response.data.message || 'Login failed' : 'An error occurred. Please check your connection and try again.');
                  }
                  finally {
                    hideLoader()
                  }
                
                }
                else{
                  console.log("Signing in as Student");
                const login_by_std = {
                  SD_STUDENTID: values.student_id,
                  // 24SLG0004
                  SD_PASSWORD: values.password
                };

                try {
                  showLoader('Logging..');
                  const response = await axios.post(`${BASE_URL}/api/StudentLogin/GetStudentLoginById`, login_by_std);
                  const result = response.data;

                  if (result.IsValid === true) {
                    await AsyncStorage.setItem('token', result.Data.token);
                    await AsyncStorage.setItem('student_id', result.Data.SD_StudentId);
                    await AsyncStorage.setItem('class_id', result.Data.SD_CurrentClassId.toString());
                    await AsyncStorage.setItem('current_session', result.Data.SD_CurrentSessionId.toString());
                    await AsyncStorage.setItem('school_name', result.Data.SCM_SCHOOLNAME);
                    await AsyncStorage.setItem('user_type', 'S');

                    console.log('Login successful', result);
                    setIsAuthenticated(await AsyncStorage.getItem(`token`))
                    navigation.navigate('Main');
                  } else {
                    console.error('Login failed', result);
                    alert(result.message || 'Login failed. Please try again.');
                  }
                } catch (error) {
                  console.error('API call error', error.response ? error.response.data : error.message);
                  alert(error.response ? error.response.data.message || 'Login failed' : 'An error occurred. Please check your connection and try again.');
                }
                finally {
                  hideLoader()
                }
              }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <>
                  <>
                    {!values.isFaculty ? (
                      <>
                        <View style={{ marginVertical: 10 }}>
                          <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                            Student ID<Text style={{ color: theme.colors.error }}> *</Text>
                          </Text>
                          <TextInput
                            left={<TextInput.Icon icon="account" size={20} color={theme.colors.primary} />}
                            style={{ backgroundColor: 'none' }}
                            placeholder="Enter Student ID"
                            mode="flat"
                            contentStyle={{
                              fontFamily: 'Poppins-Regular', fontSize: 14, fontWeight: 600, color: theme.colors.primary,
                              paddingLeft: 15
                            }}
                            onBlur={handleBlur('student_id')}
                            onChangeText={handleChange('student_id')}
                            value={values.student_id} />
                          {errors.student_id && touched.student_id && <Text style={{ color: theme.colors.error }}>{errors.student_id}</Text>}
                        </View>
                        <View style={{ marginVertical: 10 }}>
                          <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                            Password<Text style={{ color: theme.colors.error }}> *</Text>
                          </Text>
                          <TextInput
                            secureTextEntry={!isPasswordVisible}
                            left={<TextInput.Icon
                              icon={isPasswordVisible ? 'eye' : 'eye-off'}
                              size={20}
                              color={theme.colors.primary}
                              onPress={() => setIsPasswordVisible(!isPasswordVisible)} />}
                            style={{ backgroundColor: 'none' }}
                            placeholder="Enter Password"
                            mode="flat"
                            contentStyle={{
                              fontFamily: 'Poppins-Regular', fontSize: 14, fontWeight: 600, color: theme.colors.primary,
                              paddingLeft: 15
                            }}
                            onBlur={handleBlur('password')}
                            onChangeText={handleChange('password')}
                            value={values.password} />
                          {errors.password && touched.password && <Text style={{ color: theme.colors.error }}>{errors.password}</Text>}
                        </View></>
                    )
                      :
                      <><View style={{ marginVertical: 10 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                          Faculty  ID<Text style={{ color: theme.colors.error }}> *</Text>
                        </Text>
                        <TextInput
                          left={<TextInput.Icon icon="account" size={20} color={theme.colors.primary} />}
                          style={{ backgroundColor: 'none' }}
                          placeholder="Enter Faculty ID"
                          mode="flat"
                          contentStyle={{
                            fontFamily: 'Poppins-Regular', fontSize: 14, fontWeight: 600, color: theme.colors.primary,
                            paddingLeft: 15
                          }}
                          onBlur={handleBlur("faculty_id")}
                          onChangeText={handleChange("faculty_id")}
                          value={values.faculty_id} />
                        {errors.faculty_id && touched.faculty_id && <Text style={{ color: theme.colors.error }}>{errors.faculty_id}</Text>}
                      </View><View style={{ marginVertical: 10 }}>
                          <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                            Password faculty_password<Text style={{ color: theme.colors.error }}> *</Text>
                          </Text>
                          <TextInput
                            secureTextEntry={!isPasswordVisible}
                            left={<TextInput.Icon
                              icon={isPasswordVisible ? 'eye' : 'eye-off'}
                              size={20}
                              color={theme.colors.primary}
                              onPress={() => setIsPasswordVisible(!isPasswordVisible)} />}
                            style={{ backgroundColor: 'none' }}
                            placeholder="Enter Password"
                            mode="flat"
                            contentStyle={{
                              fontFamily: 'Poppins-Regular', fontSize: 14, fontWeight: 600, color: theme.colors.primary,
                              paddingLeft: 15
                            }}
                            onBlur={handleBlur('faculty_password')}
                            onChangeText={handleChange('faculty_password')}
                            value={values.faculty_password} />
                          {errors.faculty_password && touched.faculty_password && <Text style={{ color: theme.colors.error }}>{errors.faculty_password}</Text>}
                        </View></>
                    }
                    <Button
                      mode="contained-tonal"
                      style={{ borderRadius: 10, backgroundColor: theme.colors.primary, padding: 5, marginTop: 5 }}
                      labelStyle={{ fontFamily: 'Poppins-Regular', color: theme.colors.background }}
                      uppercase
                      icon="login"
                      onPress={handleSubmit}
                    >
                      Sign In
                    </Button>
                  </>
                  <Button onPress={() => setFieldValue("isFaculty", !values.isFaculty)}>
                    {values.isFaculty ? "Sign in with Student ID" : "Sign in as Faculty"}
                  </Button>
                </>

              )}
            </Formik>
          </View>

        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
const Style = StyleSheet.create({
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window')?.width,
  },
  logo: {
    width: 130,
    height: 130,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  SignIn_TopImageHolder: {
    height: Dimensions.get('window')?.width * 1.0,
    width: Dimensions.get('window')?.width,
  },
  lottie: {
    width: Dimensions.get('window')?.width * 0.6,
    aspectRatio: 1
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
})
export default SignInScreen
