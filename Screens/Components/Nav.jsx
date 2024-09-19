import React, { useState } from 'react'
import { Dimensions, View,StyleSheet } from 'react-native';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import { Platform } from 'react-native';
import ListSectionComponent from './ListSectionComponent';
import Svg, { Path } from 'react-native-svg';
import CustomDropdown from './CustomDropdown';
import DrawerComponent from './Drawer';
const height = Dimensions.get('window').height;
const NavComponent = () => {
  const theme = useTheme();
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const sessions = ['2022-2023', '2023-2024', '2024-2025'];
  const [listVisible, setListVisible] = useState(false);  // State for showing the list

  const handleSelect = (value) => {
    setSelectedSession(value);
  };


  const openDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  const openList = () => {
    setListVisible(!listVisible); 
  };
  return (
    <>
    <Appbar.Header
      style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.onPrimary,
        paddingHorizontal: 10,
       
      }}
      elevated={true}
    >
      <Appbar.Action
        icon="menu"
        onPress={openDrawer}
        size={20}
        color={theme.colors.onPrimary} />
      {/* <Appbar.Content title="Hi,SUMAN MITRA" subtitle='Subtitle' titleStyle={{
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: theme.colors.primary
      }} /> */}
       <Appbar.Content
          style={{ alignItems:'flex-start' }}
          title={
            <CustomDropdown
              items={sessions}
              selectedValue={selectedSession}
              onSelect={handleSelect}
            />
          }
        />
      {/* <Appbar.Action icon={'bell'} onPress={() => {}} size={20}  color={theme.colors.onPrimary} />
              <Avatar.Text label='SM' labelStyle={{
                  fontFamily:'Poppins-Regular',
                  fontSize:18,
                  fontWeight:'500'
              }} size={45}/> */}
      <Appbar.Action icon={MORE_ICON} size={25} color={theme.colors.onPrimary} onPress={openList}
 />
    </Appbar.Header><DrawerComponent visible={drawerVisible} onClose={closeDrawer} />
    {listVisible && (  // Conditionally render the list
        <View  style={styles.listContainer}>
          <ListSectionComponent />  
        </View>)}
        </>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    position: 'absolute',
    top: 60,  
    right: 10,  
    width: 150,  
    height: 170,  
    backgroundColor: '#fff',  
    zIndex: 1000,  
    borderRadius: 8,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,  
  },
});

export default NavComponent
