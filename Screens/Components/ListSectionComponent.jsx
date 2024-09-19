import * as React from 'react';
import { StyleSheet } from 'react-native';
import { List, MD3Colors,useTheme } from 'react-native-paper';


const ListSectionComponent = () => {
  const theme = useTheme();
  
  
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
    <List.Item
      title="Profile"
      left={() => <List.Icon icon="account" color={theme.colors.primary}/>}
      titleStyle={{color:theme.colors.primary}}

    />
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
