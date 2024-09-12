import React, { useState,useEffect } from 'react';
import { Button, TextInput, useTheme, Divider } from 'react-native-paper';
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import * as yup from 'yup';
import {useForm,Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';


const validationSchema = yup.object().shape({
    mobile: yup.string().required('Mobile number is required').length(10, 'Mobile number must be 10 digits').matches(/^[0-9]+$/, 'Mobile number must be digits only'),
    otp: yup.string().required('OTP is required').length(6, 'OTP must be 6 digits').matches(/^[0-9]+$/, 'OTP must be digits only'),
    school: yup.string().required('School selection is required'),
    })

const LoginByMobile = ({ mobile, setMobile, navigation }) => {
    const [step, setStep] = useState(1);
    const [school, setSchool] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [schools, setSchools] = useState([
        { label: 'School 1', value: 'school1' },
        { label: 'School 2', value: 'school2' },
        { label: 'School 3', value: 'school3' },
    ]);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
          mobile: '',
          otp: '',
          school: '',
        },
      });
    //   useEffect(() => {
    //     console.log(`Current Step: ${step}`);
    //   }, [step]);
    
      const handleNext = (formData) => {
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
        <View>
        {step === 1 ? (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
              Mobile<Text style={{ color: theme.colors.error }}> *</Text>
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="mobile"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  outlineColor={'#dddddd'}
                  right={<TextInput.Icon icon="phone" size={20} color={theme.colors.primary} />}
                  keyboardType='phone-pad'
                  style={{ borderRadius: 5 }}
                  maxLength={10}
                  placeholder='Enter Mobile Number'
                  mode='outlined'
                  contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.mobile && <Text style={{ color: theme.colors.error }}>{errors.mobile.message}</Text>}
          </View>
        ) : step === 2 && (
          <>
            <View>
              <Text>OTP successfully Sent to 1234567890 <Text style={{ textDecorationStyle: 'solid', textDecorationLine: 'underline',color: theme.colors.primary, fontSize: 14 }} onPress={() => setStep(1)}>Edit</Text></Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                OTP<Text style={{ color: theme.colors.error }}> *</Text>
              </Text>
              <Controller
                control={control}
                rules={{
                    required: true,
                  }}
                name="otp"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    keyboardType='number-pad'
                    style={{ borderRadius: 5 }}
                    maxLength={6}
                    placeholder='Enter OTP'
                    mode='outlined'
                    contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.otp && <Text style={{ color: theme.colors.error }}>{errors.otp.message}</Text>}
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
              icon={"login"}
              onPress={handleNext}
            >
              Next
            </Button>
          </View>
        )}
        
        {step === 3 && (
          <>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
                Select School
              </Text>
              <Controller
                control={control}
                rules={{
                    required: true,
                  }}
                name="school"
                render={({ field: { onChange, onBlur, value } }) => (
                  <DropDownPicker
                    open={showDropdown}
                    value={value}
                    items={schools}
                    setOpen={setShowDropdown}
                    setValue={onChange}
                    setItems={setSchools}
                    style={{ marginVertical: 10, borderRadius: 5 }}
                    placeholder="Select your school"
                    dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
                  />
                )}
              />
              {errors.school && <Text style={{ color: theme.colors.error }}>{errors.school.message}</Text>}
            </View>
            <View style={{ marginVertical: 10 }}>
              <Button
                mode="contained-tonal"
                style={{ borderRadius: 10, backgroundColor: theme.colors.primary, padding: 5, marginTop: 5 }}
                labelStyle={{ fontFamily: 'Poppins-Regular', color: theme.colors.background }}
                uppercase
                icon={"login"}
                onPress={handleSubmit(handleSignin)}
              >
                Signin
              </Button>
            </View>
          </>
        )}
      </View>
        // <>
        //     {step === 1 ? <View style={{ marginVertical: 10 }}>
        //         <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
        //             Mobile<Text style={{ color: theme.colors.error }}> *</Text>
        //         </Text>
        //         <TextInput
        //             outlineColor={'#dddddd'}
        //             right={<TextInput.Icon icon="phone" size={20} color={theme.colors.primary} />}
        //             keyboardType='phone-pad'
        //             style={{ borderRadius: 5 }}
        //             maxLength={10}
        //             placeholder='Enter Mobile Number'
        //             mode='outlined'
        //             contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}
        //             value={mobile}
        //             onChangeText={text => setMobile(text)}
        //         />
        //     </View> : (
        //         step === 2 &&
        //         <><View>
        //             <Text>OTP succesfully Sent to 1234567890  <Text style={{ textDecorationStyle: 'solid', textDecorationLine: 'underline' }} onPress={handleEditClick}>Edit</Text>
        //             </Text>

        //         </View><View style={{ marginVertical: 10 }}>
        //                 <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
        //                     OTP
        //                     <Text style={{ color: theme.colors.error }}> *</Text>
        //                 </Text>
        //                 <TextInput
        //                     keyboardType='number-pad'
        //                     style={{ borderRadius: 5 }}
        //                     maxLength={6}
        //                     placeholder='Enter OTP'
        //                     mode='outlined'
        //                     contentStyle={{
        //                         fontFamily: 'Poppins-Regular',
        //                         fontSize: 14,
        //                     }}
        //                     value={otpval}
        //                     onChangeText={text => setOtp(text)} />
        //             </View></>
        //     )}

        //     {step <= 2 && <View style={{
        //         marginVertical: 10
        //     }}>
        //         <Button mode="contained-tonal"
        //             style={{ borderRadius: 10, backgroundColor: theme.colors.primary, padding: 5, marginTop: 5 }}
        //             labelStyle={{
        //                 fontFamily: 'Poppins-Regular',
        //                 color: theme.colors.background
        //             }}

        //             uppercase
        //             icon={"login"}
        //             onPress={handleNext}
        //         >
        //             next
        //         </Button>
        //     </View>}
        //     {step === 3 &&
        //         <><View style={{ marginVertical: 10 }}>
        //             <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
        //                 Select School
        //             </Text>
        //             <DropDownPicker
        //                 open={showDropdown}
        //                 value={school}
        //                 items={schools}
        //                 setOpen={setShowDropdown}
        //                 setValue={setSchool}
        //                 setItems={setSchools}
        //                 style={{ marginVertical: 10, borderRadius: 5 }}
        //                 placeholder="Select your school"
        //                 dropDownContainerStyle={{ backgroundColor: '#fafafa' }} />
        //         </View><View style={{
        //             marginVertical: 10
        //         }}>
        //                 <Button mode="contained-tonal"
        //                     style={{ borderRadius: 10, backgroundColor: theme.colors.primary, padding: 5, marginTop: 5 }}
        //                     labelStyle={{
        //                         fontFamily: 'Poppins-Regular',
        //                         color: theme.colors.background
        //                     }}

        //                     uppercase
        //                     icon={"login"}
        //                     onPress={handleSignin}
        //                 >
        //                     Signin
        //                 </Button>
        //             </View></>
        //     }
        //     {step === 3 && <View style={{
        //   marginVertical: 10
        // }}>
        //   <Button mode="contained-tonal"
        //     style={{ borderRadius: 10, backgroundColor: theme.colors.primary, padding: 5, marginTop: 5 }}
        //     labelStyle={{
        //       fontFamily: 'Poppins-Regular',
        //       color: theme.colors.background
        //     }}

        //     uppercase
        //     icon={"login"}
        //     onPress={handleSignin}
        //   >
        //     Signin
        //   </Button>
        // </View>}


        // </>

    )
}

export default LoginByMobile;