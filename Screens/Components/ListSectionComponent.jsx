import  React, { useState } from 'react';
import { StyleSheet,TouchableOpacity, } from 'react-native';
import { List, MD3Colors,useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LogOutComponent from './LogoutAlert';

const ListSectionComponent = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false)

  const handlePress = () => {
    navigation.navigate('Profile'); 
  };
  return(
  
  <List.Section style={styles.container}>
    {/* <List.Subheader>Menu</List.Subheader> */}
    <List.Item
      title="Notification"
      titleStyle={{color:theme.colors.primary}}
      left={() => <List.Icon icon="bell" color={theme.colors.primary} />}
    />
    <List.Item
      title="Setting"
      left={() => <List.Icon icon="cog" color={theme.colors.primary}/>}
      titleStyle={{color:theme.colors.primary}}
    />
    <TouchableOpacity onPress={handlePress}>
    <List.Item
      title="Profile"
      left={() => <List.Icon icon="account" color={theme.colors.primary}/>}
      titleStyle={{color:theme.colors.primary}}
    />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setModalVisible(true)}>
     <List.Item
      title="Log Out"
      left={() => <List.Icon icon="logout" color={theme.colors.primary}/>}
      titleStyle={{color:theme.colors.primary}}
    />
    <LogOutComponent visible={modalVisible} onClose={() => setModalVisible(false)}/>
    </TouchableOpacity>
  </List.Section>
)
}

const styles = StyleSheet.create({
  container: {
  alignItems:'flex-start',
  margin:10
  },
});



export default ListSectionComponent;
