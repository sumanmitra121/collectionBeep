import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import { Button, TextInput, useTheme, Divider } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import LoginByMobile from '../Components/LoginByMobile';
import LoginByStudentID from '../Components/LoginByStudentID';
import * as yup from 'yup';
import { Formik, useFormikContext } from 'formik';


// const validationSchema = yup.object().shape({
//    isMobile:yup.boolean().default(true),
//    step:yup.number().default(1),
//   //  mobileObj:yup.object().when('isMobile', {
//   //     is:true,
//   //     then:yup.object({
//   //         mobile:yup.string()
//   //         .required('Mobile number is required')
//   //         .length(10, 'Mobile number must be 10 digits')
//   //         .matches(/^[0-9]+$/, 'Mobile number must be digits only'),
//   //     })
//   //  }),
//    studentId:yup.object().when('isMobile',{

//    })
// })

const validationSchema = yup.object().shape({
  isMobile: yup.boolean().default(true),
  step: yup.number().default(1),
  mobile: yup.string().when("isMobile", {
    is: (value) => value == true,
    then: () => yup.string().when('step', {
      is: (value) => {
        return value == 1
      },
      then: () => yup.string().required().required('Mobile number is required')
        .length(10, 'Mobile number must be 10 digits')
        .matches(/^[0-9]+$/, 'Mobile number must be digits only'),
      otherwise: () => yup.string().notRequired(),
    }),
    otherwise: () => yup.string().notRequired(),
  }),
  otp: yup.string().when("isMobile", {
    is: (value) => value == true,
    then: () => yup.string().when('step', {
      is: (value) => { return value == 2 },
      then: () => yup.string().required('OTP is required')
        .length(6, 'OTP must be 6 digits')
        .matches(/^[0-9]+$/, 'OTP must be digits only'),
      otherwise: () => yup.string().notRequired(),
    }),
    otherwise: () => yup.string().notRequired(),
  }),
  student_id: yup.string().when("isMobile", {
    is: (value) => value == false,
    then: () => yup.string().when('step', {
      is: (value) => { return value == 1 },
      then: () => yup.string().required('*Student Id is required'),
      otherwise: () => yup.string().notRequired(),
    }),
    otherwise: () => yup.string().notRequired(),
  }),
  password: yup.string().when("isMobile", {
    is: (value) => value == false,
    then: () => yup.string().when('step', {
      is: (value) => { return value == 1 },
      then: () => yup.string().required('*Password is required'),
      otherwise: () => yup.string().notRequired(),
    }),
    otherwise: () => yup.string().notRequired(),
  }),
  school: yup.string().when(['isMobile', 'step'], {
    is: (isMobile, step) => (isMobile && step === 3) || (!isMobile && step === 2),
    then: () => yup.string().required('*Please select school'),
    otherwise: () => yup.string().notRequired(),
  }),
  // school: yup.string().when('step', {
  //   is: value => { return value > 2 },
  //   then: () => yup.string().required('*Please select school')
  // }),
});

const SignInScreen = ({ navigation }) => {
  // const formikProps = useFormikContext();
  const formikRef = useRef();
  const [text, setText] = React.useState("");
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = React.useState("");
  const [student, setStudent] = React.useState("");
  const [showStudentId, setShowStudentId] = useState(false);
  const [showNextStep, setShowNextStep] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [Otptyped, setOtptyped] = useState(false)
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
    console.log(step, 'step')
  };
  const handleSignin = () => {
    navigation.navigate('Main');
  };
  const toggleForm = (setFieldValue, isMobile) => {
    setFieldValue('isMobile', !isMobile);
  };

  // useEffect(()=>{
  //     console.log(formikRef)
  // },[formikRef])

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
        <Text style={{ fontFamily: 'Poppins-Regular', color: theme.colors.onBackground, fontSize: 18, textAlign: 'left' }}>
          Welcome To CollectionBeep
        </Text>
        {/* {<showStudentId> ? (
          <LoginByStudentID 
            student={student} 
            setStudent={setStudent} 
            password={password} 
            setPassword={setPassword} 
            navigation={navigation}
          />
        ) : (
          <LoginByMobile 
            mobile={mobile} 
            setMobile={setMobile} 
            otp={otp}
            setOtp={setOtp}
            navigation={navigation}
          />
        )} */}

        <Formik
          initialValues={{ mobile: '', otp: '', school: '', isMobile: true, step: 1, student_id: '', password: '' }}
          validationSchema={validationSchema}
          innerRef={formikRef}
          onSubmit={(values, { setSubmitting, setFieldValue, setValues }) => {
            let _step = values.step;
            // if(formikRef?.current?.values?.step <  2){
            // formikRef?.current?.setValues({
            //     ...values,
            //     step:_step + 1
            // });
            setFieldValue('step', (_step + 1))
            // }
            // else{
              // console.log('sasdasd');
              console.log(formikRef?.current?.values);
            // }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <>
            {values.isMobile ? (
        // Render the Mobile Number Login Fields
        <>
              {values.step == 2 && <View>
                <Text>
                  OTP successfully Sent to 1234567890{' '}
                  <Text
                    style={{ textDecorationLine: 'underline', color: theme.colors.primary, fontSize: 14 }}
                    onPress={() => {
                      let _step = values.step;
                      setFieldValue('step', _step - 1);
                    }
                    }
                  >
                    Edit
                  </Text>
                </Text>
              </View>}
             
                {values.step === 1 && (
                  <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                      Mobile<Text style={{ color: theme.colors.error }}> *</Text>
                    </Text>
                    <TextInput
                      outlineColor={'#dddddd'}
                      right={<TextInput.Icon icon="phone" size={20} color={theme.colors.primary} />}
                      keyboardType="phone-pad"
                      style={{ borderRadius: 5 }}
                      maxLength={10}
                      placeholder="Enter Mobile Number"
                      mode="outlined"
                      contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}
                      onBlur={handleBlur('mobile')}
                      onChangeText={handleChange('mobile')}
                      value={values.mobile}
                    />
                    {errors.mobile && touched.mobile && <Text style={{ color: theme.colors.error }}>{errors.mobile}</Text>}
                  </View>
                )}

                {values.step === 2 && (

                  <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                      OTP<Text style={{ color: theme.colors.error }}> *</Text>
                    </Text>
                    <TextInput
                      outlineColor={'#dddddd'}
                      right={<TextInput.Icon icon="phone" size={20} color={theme.colors.primary} />}
                      keyboardType="phone-pad"
                      style={{ borderRadius: 5 }}
                      maxLength={6}
                      placeholder="Enter OTP"
                      mode="outlined"
                      contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}
                      onBlur={handleBlur('otp')}
                      onChangeText={handleChange('otp')}
                      value={values.otp}
                    />
                    {errors.otp && touched.otp && <Text style={{ color: theme.colors.error }}>{errors.otp}</Text>}
                  </View>

                )}
  </>
      ) :  (<>
      {values.step === 1 && (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                Student ID<Text style={{ color: theme.colors.error }}> *</Text>
              </Text>
              <TextInput
                outlineColor={'#dddddd'}
                right={<TextInput.Icon icon="account" size={20} color={theme.colors.primary} />}
                style={{ borderRadius: 5 }}
                placeholder="Enter Student ID"
                mode="outlined"
                contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}
                onBlur={handleBlur('student_id')}
                onChangeText={handleChange('student_id')}
                value={values.student_id}
              />
              {errors.student_id && touched.student_id && <Text style={{ color: theme.colors.error }}>{errors.student_id}</Text>}
            </View>
          )}
           {values.step === 1 && (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                Password<Text style={{ color: theme.colors.error }}> *</Text>
              </Text>
              <TextInput
                outlineColor={'#dddddd'}
                secureTextEntry
                right={<TextInput.Icon icon="eye" size={20} color={theme.colors.primary} />}
                style={{ borderRadius: 5 }}
                placeholder="Enter Password"
                mode="outlined"
                contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                value={values.password}
              />
              {errors.password && touched.password && <Text style={{ color: theme.colors.error }}>{errors.password}</Text>}
            </View>
          )}
           {values.step === 2 && (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                Select School
              </Text>
              <DropDownPicker
      open={showDropdown}
      value={values.school}
      items={schools}
      setOpen={setShowDropdown}
      setValue={(value) => setFieldValue('school', value)} 
      setItems={setSchools}
      style={{ marginVertical: 10, borderRadius: 5 }}
      placeholder="Select your school"
      dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
    />
    {errors?.school && touched?.school && <Text style={{ color: theme.colors.error }}>{errors.school}</Text>}
            </View>
          )}
    </>
  )}
               
               
               
               
               
               
                <Button
                  mode="contained-tonal"
                  style={{ borderRadius: 10, backgroundColor: theme.colors.primary, padding: 5, marginTop: 5 }}
                  labelStyle={{ fontFamily: 'Poppins-Regular', color: theme.colors.background }}
                  uppercase
                  icon="login"

                  onPress={handleSubmit}
                >
                  Next
                </Button>

                <Button onPress={() => toggleForm(setFieldValue, values.isMobile)}>
                  {values.isMobile ? 'Sign in with Student ID' : 'Sign in with Mobile Number'}
                </Button>
             
            </>

          )}
        </Formik>



        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <View style={{ flex: 1, height: 0.8, backgroundColor: 'black' }} />
          <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={toggleForm}>
          <Text style={{
            fontFamily: 'Poppins-Regular',
            color: theme.colors.primary,
            fontSize: 14,
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}>
            {formik.values.isMobile ? 'Sign in with Student ID' : 'Sign in with Mobile Number'}
          </Text>
        </TouchableOpacity>
          <View style={{ flex: 1, height: 0.8, backgroundColor: 'black' }} />
        </View> */}

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
