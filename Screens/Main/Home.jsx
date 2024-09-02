import React from 'react';
import { Text} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
const HomeScreen = () => {
  
  useFocusEffect(
    React.useCallback(()=>{
      console.log('sasdasd')
    },[])
  )
  return (
      <Text>
            {/* Home Works */}
    </Text>
    
  )
}

export default HomeScreen;
