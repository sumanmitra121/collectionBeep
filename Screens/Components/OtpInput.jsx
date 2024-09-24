import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper'; 

const OtpInput = ({ length = 6, onChangeOtp }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(-1); 
  const inputs = useRef([]);
  const theme = useTheme(); 

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp);
    onChangeOtp(newOtp.join(''));

    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(input) => (inputs.current[index] = input)}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="numeric"
          maxLength={1}
          style={[
            styles.otpInput,
            focusedIndex === index && { borderColor: theme.colors.primary }, 
          ]}
          selectionColor={theme.colors.primary} 
          onFocus={() => setFocusedIndex(index)} 
          onBlur={() => setFocusedIndex(-1)}    
          secureTextEntry={true} 

        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    margin:10
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#005faf',
    borderRadius: 5,
    width: 45,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    // backgroundColor:'#e6f4ff',
    color:'#005faf'
  },
});

export default OtpInput;
