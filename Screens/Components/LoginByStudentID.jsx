import React from 'react';
import { TextInput as PaperInput } from 'react-native-paper';
import { Button, TextInput, useTheme, Divider } from 'react-native-paper';
import {Text, View } from 'react-native'



const LoginByStudentID = ({ student, setStudent, password, setPassword }) => {
    const theme = useTheme();
    return (
  <>
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
        Student ID<Text style={{ color: theme.colors.error }}> *</Text>
      </Text>
      <PaperInput
        outlineColor={'#dddddd'}
        right={<TextInput.Icon icon="id-card" size={20} color={theme.colors.primary} />}
        keyboardType='default'
        style={{ borderRadius: 5 }}
        placeholder='Enter The Student ID'
        mode='outlined'
        contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}
        value={student}
        onChangeText={text => setStudent(text)}
      />
    </View>
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontFamily: 'Poppins-Medium', color: theme.colors.primary, fontSize: 14 }}>
        Password<Text style={{ color: theme.colors.error }}> *</Text>
      </Text>
      <PaperInput
        secureTextEntry={true}
        style={{ borderRadius: 5 }}
        placeholder='Enter Password'
        mode='outlined'
        contentStyle={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}
        value={password}
        onChangeText={text => setPassword(text)}
      />
    </View>
  </>)
}
export default LoginByStudentID;