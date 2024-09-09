import React from 'react'
import { Dimensions, Text, View } from 'react-native';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import IonicIcons from 'react-native-vector-icons/Ionicons';
const height = Dimensions.get('window').height;
const NavComponent = () => {
  const theme = useTheme();
  return (
    <Appbar.Header 
    
    style={{
        backgroundColor:theme.colors.primary,
        color:theme.colors.onPrimary,
      // backgroundColor:'transparent',
        paddingHorizontal:7,
        
    }}
    elevated={true}
    >
            {/* <Appbar.Action icon={'menu'} onPress={() => {}} size={20} color={theme.colors.onPrimary} /> */}
            <Appbar.Content title="Welcome, SUMAN MITRA" subtitle='Subtitle' titleStyle={{
                fontFamily:'Poppins-Medium',
                fontSize:14,
                color:theme.colors.onPrimary
            }} />
            <Appbar.Action icon={'bell'} onPress={() => {}} size={20}  color={theme.colors.onPrimary} />
                <Avatar.Text label='SM' labelStyle={{
                    fontFamily:'Poppins-Regular',
                    fontSize:18,
                    fontWeight:'500'
                }} size={45}/>

    </Appbar.Header>
  )
}

export default NavComponent
