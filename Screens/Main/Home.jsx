import React from 'react';
// import { Text} from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, Image, View } from 'react-native';
import { StyleSheet } from 'react-native';

const HomeScreen = () => {
  const theme = useTheme();
  useFocusEffect(
    React.useCallback(()=>{
      console.log('sasdasd')
    },[])
  )
  return (
    <View style={{flex:1}}>

    <View style={{
      // flex:1,
      justifyContent:'center',
      height:Dimensions.get('window').height / 4,
      backgroundColor:theme.colors.primary,
      width:Dimensions.get('screen').width}}>
        <Text style={{textAlign:'center',
        fontSize:20,
          fontFamily:'Poppins-Regular',color:theme.colors.background}}>
           Good Afternoon, Suman Mitra
        </Text>
        <Text style={{textAlign:'center',
        fontSize:15,
          fontFamily:'Poppins-Regular',color:theme.colors.background}}>
           Total Collection - ₹15215.00
        </Text>
        
    </View> 

    <View style={Style.grid}>
           <Card style={[{borderRadius:5,...Style.parentTile}]}>
            <Card.Content>
              <Image
                style={Style.iconImage}
                source={require('./assets/message.png')}
              /> 
              <Text variant="bodySmall" 
              style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Message</Text>
            </Card.Content>
          </Card>

          <Card style={[{borderRadius:5,...Style.parentTile}]}>
            <Card.Content>
              <Image
                style={Style.iconImage}
                source={require('./assets/calendar.png')}
              /> 
              <Text variant="bodySmall" 
              style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Calendar</Text>
            </Card.Content>
        </Card>
          <Card style={[{borderRadius:5,...Style.parentTile}]}>
            <Card.Content>
              <Image
                style={Style.iconImage}
                source={require('./assets/timetable.png')}
              /> 
              <Text variant="bodySmall" 
              style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>TimeTable</Text>
            </Card.Content>
        </Card>
    </View>
    <View style={Style.grid}>
           <Card style={[{borderRadius:5,...Style.parentTile}]}>
            <Card.Content>
              <Image
                style={Style.iconImage}
                source={require('./assets/attandance.png')}
              /> 
              <Text variant="bodySmall" 
              style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Attandance</Text>
            </Card.Content>
          </Card>
          <Card style={[{borderRadius:5,...Style.parentTile}]}>
            <Card.Content>
              <Image
                style={Style.iconImage}
                source={require('./assets/fees.png')}
              /> 
              <Text variant="bodySmall" 
              style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Fees</Text>
            </Card.Content>
        </Card>
          <Card style={[{borderRadius:5,...Style.parentTile}]}>
            <Card.Content>
              <Image
                style={Style.iconImage}
                source={require('./assets/transport.png')}
              /> 
              <Text variant="bodySmall" 
              style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Transport</Text>
            </Card.Content>
        </Card>
    </View>
    <View style={Style.grid}>
           <Card style={[{borderRadius:5,...Style.parentTile}]}>
            <Card.Content>
              <Image
                style={Style.iconImage}
                source={require('./assets/homework.png')}
              /> 
              <Text variant="bodySmall" 
              style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>homework</Text>
            </Card.Content>
          </Card>
          <Card style={[{borderRadius:5,...Style.parentTile}]}>
            <Card.Content>
              <Image
                style={Style.iconImage}
                source={require('./assets/reportcard.png')}
              /> 
              <Text variant="bodySmall" 
              style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Report Card</Text>
            </Card.Content>
        </Card>
          <Card style={[{borderRadius:5,...Style.parentTile}]}>
            <Card.Content>
              <Image
                style={Style.iconImage}
                source={require('./assets/gallery.png')}
              /> 
              <Text variant="bodySmall" 
              style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Gallery</Text>
            </Card.Content>
        </Card>
    </View>
    </View>

  )
}

const Style = StyleSheet.create({
  grid:{
      // flex:,
      padding:10,
      flexDirection:'row',
      justifyContent:'space-between'
  },
  iconImage: {
    width: 47,
    height: 47,
    marginHorizontal:'auto',
    marginVertical:5
  },
  parentTile:{
    width:Dimensions.get('window')?.width / 3 - 15,
    borderRadius:5,
    borderTopWidth:0,
    backgroundColor:'#fff',
    shadowColor:'#000',
    shadowOffset:{width:0,height:1},
    shadowOpacity:0.5,
    shadowRadius:10,
    elevation:5
  }
})

export default HomeScreen;
