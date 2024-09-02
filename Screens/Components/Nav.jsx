import React from 'react'
import { Dimensions, Text, View } from 'react-native';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import IonicIcons from 'react-native-vector-icons/Ionicons';
const height = Dimensions.get('window').height;
const NavComponent = () => {
  const theme = useTheme();
  return (
    <Appbar.Header mode='small'
    style={{
        // backgroundColor:'transparent',
        paddingHorizontal:7,
    }}
    elevated={true}
    >
            <Appbar.Action icon={'menu'} onPress={() => {}} size={25} color={theme.colors.primary} />
            <Appbar.Content title="Welcome, SUMAN MITRA" subtitle='Subtitle' titleStyle={{
                fontFamily:'Poppins-Medium',
                fontSize:14
            }} />
            <Appbar.Action icon={'bell'} onPress={() => {}} size={25}  color={theme.colors.primary} />
                <Avatar.Text label='SM' labelStyle={{
                    fontFamily:'Poppins-Regular',
                    fontSize:18,
                    fontWeight:'500'
                }} size={45}/>

    </Appbar.Header>
  )
}

export default NavComponent
