import React, { useState } from 'react'
import { Dimensions, Text, View } from 'react-native';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';
import CustomDropdown from './CustomDropdown';
import DrawerComponent from './Drawer';
const height = Dimensions.get('window').height;
const NavComponent = () => {
  const theme = useTheme();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const sessions = ['2022-2023', '2023-2024', '2024-2025'];
  const handleSelect = (value) => {
    setSelectedSession(value);
  };


  const openDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <>
    <Appbar.Header
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.onPrimary,
        paddingHorizontal: 10,
       
      }}
      elevated={false}
    >
      {/* <Appbar.Action icon={'menu'} onPress={() => {}} size={20} color={theme.colors.onPrimary} /> */}
      <Appbar.Action
        icon="menu"
        onPress={openDrawer}
        size={20}
        color={theme.colors.primary} />
      <Appbar.Content title="Hi,SUMAN MITRA" subtitle='Subtitle' titleStyle={{
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: theme.colors.primary
      }} />
      <CustomDropdown
        items={sessions}
        selectedValue={selectedSession}
        onSelect={handleSelect} />
      {/* <Appbar.Action icon={'bell'} onPress={() => {}} size={20}  color={theme.colors.onPrimary} />
              <Avatar.Text label='SM' labelStyle={{
                  fontFamily:'Poppins-Regular',
                  fontSize:18,
                  fontWeight:'500'
              }} size={45}/> */}
    </Appbar.Header><DrawerComponent visible={drawerVisible} onClose={closeDrawer} /></>
  )
}

export default NavComponent
