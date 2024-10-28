import React from 'react'
import { Text,View,TouchableOpacity,StyleSheet,Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const FeesCollectionScreen = () => {

  const navigation = useNavigation(); 

  const menuItems = [
    { title: 'Fee Summary', icon: require('./assets/fee_summary_white.png'),screen: 'FeeSummary' },
    { title: 'Fee Paid Details',icon: require('./assets/fee_paid_white.png', ),screen: 'FeePaidDetails'  },
    { title: 'Fee Due Details', icon: require('./assets/fee_due_white.png'), screen: 'FeeDueDetails'  },
  ];
  return (
    <View style={Style.container}>
    {menuItems.map((item, index) => (
      
      <TouchableOpacity key={index} style={Style.menuContainer} onPress={() => navigation.navigate(item.screen)}
>
         <LinearGradient
            colors={['#005faf', '#00b4d8']}
            style={Style.menuItem}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
         <Image source={item.icon} style={Style.icon} />
        <Text style={Style.title}>{item.title}</Text>
        <Ionicons name="chevron-forward-circle-outline" size={30} color="#fff" style={Style.nextIcon} />
        </LinearGradient>

      </TouchableOpacity>
    ))}
  </View>
  )
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  menuContainer: {
    marginVertical: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 90, 
    borderRadius: 15,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
    resizeMode: 'contain',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-Regular',

  },
  nextIcon: {
    marginLeft: 'auto',
  },
});

export default FeesCollectionScreen
