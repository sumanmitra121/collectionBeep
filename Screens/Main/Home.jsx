import React from 'react';
// import { Text} from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, Image, View, ScrollView,FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Wave from '../Components/WaveComponent';
const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const theme = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      console.log('sasdasd')
    }, [])
  )
  const categoriesData = [
    { id: '1', title: 'Circular', icon: require('./assets/circular_blue.png') },
    { id: '2', title: 'Live class', icon: require('./assets/liveClass_blue.png') },
    { id: '3', title: 'Homework', icon: require('./assets/homework_blue.png') },
    { id: '4', title: 'Project', icon: require('./assets/project_blue.png') },
    { id: '5', title: 'Question Paper', icon: require('./assets/question_blue.png') },
    { id: '6', title: 'Activity', icon: require('./assets/activity_blue.png') },
  ];
  const examsData = [
    { id: '1', title: 'Exam schedule', icon: require('./assets/examSch_blue.png') },
    { id: '2', title: 'Exam report', icon: require('./assets/examRpt_blue.png') },
  ];
  const financeData = [
    { id: '1', title: 'Fee summary', icon: require('./assets/feeSummary_blue.png') },
    { id: '2', title: 'Fee paid details', icon: require('./assets/feePaid_blue.png') },
    { id: '2', title: 'Fee due details', icon: require('./assets/feeDue_blue.png') },
  ];
  const renderItem = ({ item }) => (
    <View style={Style.grid}> 
      <View style={{ alignItems: 'center' }}> 
        <Card style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
          <Card.Content>
            <Image style={Style.iconImage} source={item.icon} />
          </Card.Content>
        </Card>
        <View style={Style.titleSection}>
          <Text
            variant="bodySmall"
            style={[Style.titleStyle, { color: theme.colors.primary }]}
          >
            {item.title}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View >
      <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, }}>

        <View>
          {/* <Searchbar
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
    /> */}

          <Image source={require('./assets/wave.png')} style={{ width: Dimensions.get('window')?.width, height: Dimensions.get('window')?.height * 0.2 }} />
          <Text style={Style.text}>Hello,{'\n'}
            Eshita Dey</Text>
            {/* <Text>You're viewing ABC's dashboard,</Text> */}
          
        </View>
        <View style={Style.categorySection}>
        <View style={Style.header}>
        <Text style={Style.headerText}>Academic</Text>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
        </View>
        <FlatList
        data={categoriesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={Style.flatListContainer}
      />
       <View style={Style.header}>
        <Text style={Style.headerText}>Finance</Text>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
        </View>
        <FlatList
        data={financeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={Style.flatListContainer}
      />
       <View style={Style.header}>
        <Text style={Style.headerText}>Exams</Text>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
        </View>
        <FlatList
        data={examsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={Style.flatListContainer}
      />
      

          
         
        </View>



        {/* old */}

        {/* <View style={Style.grid}>
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

  
    </View> */}
        {/* <View style={Style.grid}>
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
  
    </View> */}
      </ScrollView >
    </View >
  )
}

const Style = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  text: {
    position: 'absolute',
    padding: 20,
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  categorySection:{
    padding:10
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
  },
  iconImage: {
    width: 45,
    height: 45,
    alignSelf: 'center'
    // marginHorizontal:'auto',
    // marginVertical:5,
    // alignSelf:'center'
  },
  parentTile: {
    height: 100,
    // width: Dimensions.get('window')?.width / 5 - 10,
    width:100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  titleSection: {
    // width: Dimensions.get('window')?.width / 5 - 10,
    width:100
  },
  titleStyle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginTop: 5,
  },
})

export default HomeScreen;
