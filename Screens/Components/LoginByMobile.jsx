import React, { useState,useEffect } from 'react';
import { Button, TextInput, useTheme, Divider } from 'react-native-paper';
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  mobile: yup.string()
        .required('Mobile number is required')
        .length(10, 'Mobile number must be 10 digits')
        .matches(/^[0-9]+$/, 'Mobile number must be digits only'), 
  otp: yup.string()
    .required('OTP is required')
    .length(6, 'OTP must be 6 digits')
    .matches(/^[0-9]+$/, 'OTP must be digits only'),
  school: yup.string()
    .required('School selection is required'),
});




const LoginByMobile = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [school, setSchool] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [schools, setSchools] = useState([
        { label: 'School 1', value: 'school1' },
        { label: 'School 2', value: 'school2' },
        { label: 'School 3', value: 'school3' },
    ]);
    //   useEffect(() => {
    //     console.log(`Current Step: ${step}`);
    //   }, [step]);
    
      const handleNext = (formData) => {
        console.log('handleNext pressed')
        console.log(formData, 'formData next');
        if (step < 3) {
          setStep(step + 1);
        }
      };

    const theme = useTheme();
    const handleSignin = (formData) => {
        console.log(formData,'formData')
        navigation.navigate('Main');
    };
    return (
      <Formik
      initialValues={{ mobile: '', otp: '', school: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);

        // step === 3 ? handleSignin(values) : handleNext(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          {step === 1 && (
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

          {step === 2 && (
            <>
              <View>
                <Text>
                  OTP successfully Sent to 1234567890{' '}
                  <Text
                    style={{ textDecorationLine: 'underline', color: theme.colors.primary, fontSize: 14 }}
                    onPress={() => setStep(1)}
                  >
                    Edit
                  </Text>
                </Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                  OTP<Text style={{ color: theme.colors.error }}> *</Text>
                </Text>
                <TextInput
                  keyboardType="number-pad"
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
            </>
          )}

          {step === 3 && (
            <>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                  Select School
                </Text>
                <DropDownPicker
                  open={showDropdown}
                  value={values.school}
                  items={schools}
                  setOpen={setShowDropdown}
                  setValue={handleChange('school')}
                  setItems={setSchools}
                  style={{ marginVertical: 10, borderRadius: 5 }}
                  placeholder="Select your school"
                  dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
                />
                {errors.school && touched.school && <Text style={{ color: theme.colors.error }}>{errors.school}</Text>}
              </View>
              <View style={{ marginVertical: 10 }}>
                <Button
                  mode="contained-tonal"
                  style={{ borderRadius: 10, backgroundColor: theme.colors.primary, padding: 5, marginTop: 5 }}
                  labelStyle={{ fontFamily: 'Poppins-Regular', color: theme.colors.background }}
                  uppercase
                  icon="login"
                  onPress={handleSubmit}
                >
                  Sign in
                </Button>
              </View>
            </>
          )}

          {step <= 2 && (
            <View style={{ marginVertical: 10 }}>
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
            </View>
          )}
        </View>
      )}
    </Formik>
       
    )
}

export default LoginByMobile;