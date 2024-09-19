import React from 'react';
// import { Text} from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, Image, View,ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Wave from '../Components/WaveComponent';
const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const theme = useTheme();
  useFocusEffect(
    React.useCallback(()=>{
      console.log('sasdasd')
    },[])
  )
  return (
    // <View style={{flex:1}}>
    // <View style={Style.grid}>
    //        <Card style={[{borderRadius:5,...Style.parentTile}]}>
    //         <Card.Content>
    //           <Image
    //             style={Style.iconImage}
    //             source={require('./assets/message.png')}
    //           /> 
    //           <Text variant="bodySmall" 
    //           style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Circular</Text>
    //         </Card.Content>
    //       </Card>

    //       <Card style={[{borderRadius:5,...Style.parentTile}]}>
    //         <Card.Content>
    //           <Image
    //             style={Style.iconImage}
    //             source={require('./assets/calendar.png')}
    //           /> 
    //           <Text variant="bodySmall" 
    //           style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Live Class</Text>
    //         </Card.Content>
    //     </Card>
    //       <Card style={[{borderRadius:5,...Style.parentTile}]}>
    //         <Card.Content>
    //           <Image
    //             style={Style.iconImage}
    //             source={require('./assets/timetable.png')}
    //           /> 
    //           <Text variant="bodySmall" 
    //           style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Fee Summary</Text>
    //         </Card.Content>
    //     </Card>
        
    // </View>
    // <View style={Style.grid}>
    //        <Card style={[{borderRadius:5,...Style.parentTile}]}>
    //         <Card.Content>
    //           <Image
    //             style={Style.iconImage}
    //             source={require('./assets/attandance.png')}
    //           /> 
    //         </Card.Content>
    //       </Card>
    //       <Card style={[{borderRadius:5,...Style.parentTile}]}>
    //         <Card.Content>
    //           <Image
    //             style={Style.iconImage}
    //             source={require('./assets/fees.png')}
    //           /> 
    //           <Text variant="bodySmall" 
    //           style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Fees</Text>
    //         </Card.Content>
    //     </Card>
    //       <Card style={[{borderRadius:5,...Style.parentTile}]}>
    //         <Card.Content>
    //           <Image
    //             style={Style.iconImage}
    //             source={require('./assets/transport.png')}
    //           /> 
    //           <Text variant="bodySmall" 
    //           style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Transport</Text>
    //         </Card.Content>
    //     </Card>
        
    // </View>
    // <View style={Style.grid}>
    //        <Card style={[{borderRadius:5,...Style.parentTile}]}>
    //         <Card.Content>
    //           <Image
    //             style={Style.iconImage}
    //             source={require('./assets/homework.png')}
    //           /> 
    //           <Text variant="bodySmall" 
    //           style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>homework</Text>
    //         </Card.Content>
    //       </Card>
    //       <Card style={[{borderRadius:5,...Style.parentTile}]}>
    //         <Card.Content>
    //           <Image
    //             style={Style.iconImage}
    //             source={require('./assets/reportcard.png')}
    //           /> 
    //           <Text variant="bodySmall" 
    //           style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Report Card</Text>
    //         </Card.Content>
    //     </Card>
    //       <Card style={[{borderRadius:5,...Style.parentTile}]}>
    //         <Card.Content>
    //           <Image
    //             style={Style.iconImage}
    //             source={require('./assets/gallery.png')}
    //           /> 
    //           <Text variant="bodySmall" 
    //           style={{textAlign:'center',fontFamily:'Poppins-Medium',fontSize:11,color:theme.colors.primary}}>Gallery</Text>
    //         </Card.Content>
    //     </Card>
    // </View>
    // </View>
   <View >
              {/* <Wave style={{ height: 100 }} color={theme.colors.primary} />  */}


          <ScrollView contentContainerStyle={{ padding: 5,backgroundColor:theme.colors.background,height:'100%' }}>

    <View style={{height:90,justifyContent:'center'}}>
        <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={{ height:50,width:'95%',margin:10,elevation:5,backgroundColor:theme.colors.secondaryContainer}}
      mode="bar" 
      right={() => (
        <Ionicons
        name="mic"
        size={24}
        style={[Style.icon,
          {color: theme.colors.primary,}
        ]}

      />
      )}
      
      
    />
    </View>
    <View style={Style.grid}>
    <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/circular_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall" 
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Circular
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/liveClass_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Live class
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/feeSummary_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Fee Summary
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/feePaid_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Fee Paid Details
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/feeDue_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={{width:Dimensions.get('window')?.width / 5 - 15,}}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>      
      Fee Due Details
    </Text>
    </View>
  </View>
  
    </View>
    <View style={Style.grid}>
    <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/examSch_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall" 
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Exam Schedule
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/examRpt_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Exam Report
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/trans_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Transport
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/attendance_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Attendance
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/leaves_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={{width:Dimensions.get('window')?.width / 5 - 15,}}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>      
      Leaves
    </Text>
    </View>
  </View>
  
    </View>
    <View style={Style.grid}>
    <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/birthdays_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall" 
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Birthdays
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/profile_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      My Profile
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/msg_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Messages
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/sms_history_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      SMS History
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/notification_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={{width:Dimensions.get('window')?.width / 5 - 15,}}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>      
      My Notification
    </Text>
    </View>
  </View>
  
    </View>
    <View style={Style.grid}>
    <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/homework_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall" 
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Homework
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/project_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Project
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/activity_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Activity
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/question_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={Style.titleSection}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>
      Question Paper
    </Text>
    </View>
  </View>
  <View style={{ alignItems: 'center' }}> 
    <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
      <Card.Content>
        <Image
          style={Style.iconImage}
          source={require('./assets/diary_blue.png')}
        />
      </Card.Content>
    </Card>
    <View style={{width:Dimensions.get('window')?.width / 5 - 15,}}>
    <Text 
      variant="bodySmall"
      style={[Style.titleStyle,
        {color: theme.colors.primary,}
      ]}>      
      My Diary
    </Text>
    </View>
  </View>
  
    </View>
  </ScrollView>
  {/* <Wave style={{ height: 100 }} color={theme.colors.primary} flip /> */}

   </View>
  )
}

const Style = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  grid:{
      // flex:,
      padding:7,
      flexDirection:'row',
      justifyContent:'space-around',
  },
  iconImage: {
    width: 45,
    height: 45,
    // marginHorizontal:'auto',
    // marginVertical:5,
    // alignSelf:'center'
  },
  parentTile:{
    height:80,
    width:Dimensions.get('window')?.width / 5 - 15,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    // backgroundColor:'#fff',
    shadowColor:'#000',
    shadowOffset:{width:0,height:1},
    shadowOpacity:0.5,
    shadowRadius:10,
    elevation:5,
  },
  titleSection:{
    width:Dimensions.get('window')?.width / 5 - 15,
  },
  titleStyle:{
    textAlign: 'center', 
    fontFamily: 'Poppins-Medium', 
    fontSize: 12,
    marginTop: 5,
  },
})

export default HomeScreen;
