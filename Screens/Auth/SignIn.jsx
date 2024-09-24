import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, ImageBackground, ScrollView, StatusBar, Text, View,Image,KeyboardAvoidingView} from 'react-native'
import { StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import { Button, TextInput, useTheme, Divider } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import LoginByMobile from '../Components/LoginByMobile';
import LoginByStudentID from '../Components/LoginByStudentID';
import * as yup from 'yup';
import { Formik, useFormikContext } from 'formik';
import OtpInput from '../Components/OtpInput';
import SearchDropdown from '../Components/SearchDropdown';


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
        .matches(/^[0-9]+$/, 'Mobile number must be digits only')
        .test('is-registered-mobile', 'Invalid input, please type registered mobile number', 
          (value) => value === '1122334455'
        ),
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
        .matches(/^[0-9]+$/, 'OTP must be digits only')
        .test('is-Invalid-OTP', 'Invalid Otp',
          (value) => value === '123456'
        ),
      otherwise: () => yup.string().notRequired(),
    }),
    otherwise: () => yup.string().notRequired(),
  }),
  student_id: yup.string().when("isMobile", {
    is: (value) => value == false,
    then: () => yup.string().when('step', {
      is: (value) => { return value == 1 },
      then: () => yup.string().required('*Student Id is required')
      .length(5, 'Student ID length should be 5')
      .test('is-registered-id','Student ID mismatch', 
        (value) => value === '12345'
      ),
      otherwise: () => yup.string().notRequired(),
    }),
    otherwise: () => yup.string().notRequired(),
  }),
  password: yup.string().when("isMobile", {
    is: (value) => value == false,
    then: () => yup.string().when('step', {
      is: (value) => { return value == 1 },
      then: () => yup.string().required('*Password is required')
      .length(8, 'Password length should be 8')
      .test('is-valid-password','wrong password', 
        (value) => value === '12345678'
      ),
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

  const [showDropdown, setShowDropdown] = useState(false);
  const theme = useTheme();
  const [statusBarColor, setStatusBarColor] = useState('#2a7ddb45')
  const [schools, setSchools] = useState([
    { label: 'School 1', value: 's1' },
    { label: 'School 2', value: 's2' },
    { label: 'School 3', value: 's3' },
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
    console.log(step, 'step')
    setFieldValue('isMobile', !isMobile);
    setFieldValue('step', 1);
  };
  const handleValueChange = (setFieldValue, value) => {
    console.log('Selected school:', value);
    setFieldValue('school', value);
  };

  // useEffect(()=>{
  //     console.log(formikRef)
  // },[formikRef])

  return (
    <KeyboardAvoidingView  style={{ flex: 1 }}>
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
       <View style={[Style.topContainer,{ height: Dimensions.get('window')?.height * 0.5 }]}>
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
        {/* <Text style={{ fontFamily: 'Poppins-Regular', color: theme.colors.onBackground, fontSize: 18, textAlign: 'left' }}>
          Welcome To CollectionBeep
        </Text> */}
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
          // onSubmit={(values, { setSubmitting, setFieldValue, setValues }) => {
          //   let _step = values.step;
          //   setFieldValue('step', (_step + 1))
          //     console.log(formikRef?.current?.values);
          // }}
          onSubmit={(values, { setSubmitting, setFieldValue, setValues }) => {
            console.log('Form values:', values);
            let _step = values.step;
            if (values.isMobile && _step === 3) {
              console.log('Sign in with mobile');
              navigation.navigate('Main');
            } else if (!values.isMobile && _step === 2) {
              console.log('Sign in with student ID');
              navigation.navigate('Main');
            } else {
              setFieldValue('step', _step + 1);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <>
              {values.isMobile ? (

                <>
                  {values.step == 2 && <View>
                    <Text>
                      OTP successfully Sent to {values.mobile}&nbsp;
                      <Text
                        style={{ textDecorationLine: 'underline', color: theme.colors.primary, fontSize: 14, }}
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
                      style={{backgroundColor:'#fff'}}
                        left={<TextInput.Icon icon="phone" size={20} color={theme.colors.primary} />}
                        keyboardType="phone-pad"
                        maxLength={10}
                        placeholder="Enter Mobile Number"
                        mode='flat'
                        underlineStyle={{borderRadius:50}}
                        contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14,fontWeight:600, color:theme.colors.primary,
                          paddingLeft:15
                         }}
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
                      <OtpInput
                        length={6}
                        maxLength={6}
                        onChangeOtp={(otp) => handleChange('otp')(otp)}
                        
                      />
                      {errors.otp && touched.otp && <Text style={{ color: theme.colors.error }}>{errors.otp}</Text>}
                    </View>

                  )}
                  {values.step === 3 && (
                    <View style={{ marginVertical: 10 }}>
                      <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                        School
                      </Text>
                      <SearchDropdown
                      items={schools}
                      selectedValue={values.school}
                      onSelect={(item) => {
                        console.log(item);
                        setFieldValue('school', item.label);
                      }}
                      placeholder="Select your school"
                    />
                      {errors?.school && touched?.school && <Text style={{ color: theme.colors.error }}>{errors.school}</Text>}
                    </View>
                  )}
                  {values.step === 3 ? (
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
                  ) : (
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
                  )}

                </>
              ) : (<>
                {values.step === 1 && (
                  <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                      Student ID<Text style={{ color: theme.colors.error }}> *</Text>
                    </Text>
                    <TextInput
                      left={<TextInput.Icon icon="account" size={20} color={theme.colors.primary} />}
                      style={{ backgroundColor:'none' }}
                      placeholder="Enter Student ID"
                      mode="flat"
                      contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14,fontWeight:600, color:theme.colors.primary,
                        paddingLeft:15
                       }}
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
                      secureTextEntry
                      left={<TextInput.Icon icon="eye" size={20} color={theme.colors.primary} />}
                      style={{ backgroundColor:'none' }}
                      placeholder="Enter Password"
                      mode="flat"
                      contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14,fontWeight:600, color:theme.colors.primary,
                        paddingLeft:15
                       }}
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
                    {/* <DropDownPicker
                      open={showDropdown}
                      value={values.school}
                      items={schools}
                      setOpen={setShowDropdown}
                      searchable
                      searchPlaceholder="Search..."
                      // setValue={(value) => {
                      //   console.log('Selected value:', value);
                      //   setFieldValue('school', value);
                      // }}
                      onSelectItem={(item) => {
                        console.log(item);
                        setFieldValue('school', item.value);
                      }}
                      setItems={setSchools}
                      style={{ marginVertical: 10, borderRadius: 5 }}
                      placeholder="Select your school"
                      dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
                    /> */}
                    <SearchDropdown
                      items={schools}
                      selectedValue={values.school}
                      onSelect={(item) => {
                        console.log(item);
                        setFieldValue('school', item.label);
                      }}
                      placeholder="Select your school"
                    />
                    {errors?.school && touched?.school && <Text style={{ color: theme.colors.error }}>{errors.school}</Text>}
                  </View>
                )}
                {values.step === 2 ? (
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
                ) : (
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
                )}
              </>
              )}






              {/* <Button
                  mode="contained-tonal"
                  style={{ borderRadius: 10, backgroundColor: theme.colors.primary, padding: 5, marginTop: 5 }}
                  labelStyle={{ fontFamily: 'Poppins-Regular', color: theme.colors.background }}
                  uppercase
                  icon="login"

                  onPress={handleSubmit}
                >
                  Next
                </Button> */}

              <Button onPress={() =>
                toggleForm(setFieldValue, values.isMobile)}>
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
    
      </ImageBackground>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

const Style = StyleSheet.create({
  // SignIn__Container: {
  //   flexGrow: 1,
  //   backgroundColor: '#fff',

  // },

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
    // padding: 10,
    // marginTop: 40
    // justifyContent: 'center',
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
