import React, { useEffect, useState } from 'react';
// import { Text} from 'react-native';
import { Card, Text, useTheme, Menu, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, Image, View, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import Wave from '../Components/WaveComponent';
import { useNavigation } from '@react-navigation/native';
import AttendanceProgressBar from '../Components/AttendanceProgressBar';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Videodata from './jsonData/VideoData.json';
import { BASE_URL } from '../Config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoader } from '../Contexts/LoaderProvider';

const HomeScreen = () => {
  const { showLoader, hideLoader } = useLoader(); // Access loader methods
  const [studentDetails, setStudentDetails] = useState(null);

  const theme = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      console.log('sasdasd')
    }, [])
  )
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        showLoader('Fetching student details...');
        const token = await AsyncStorage.getItem('token');
        const studentId = await AsyncStorage.getItem('student_id');

        console.log(token, "token")
        console.log(studentId, "studentId")

        if (!token || !studentId) {
          console.error('Token or student ID not found in storage');
          return;
        }
        const response = await axios.post(
          `${BASE_URL}/api/StudentDetails/GetStudentDetailsById`,
          {
            SD_STUDENTID: studentId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data, "studentDetails")
        setStudentDetails(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
      finally {
        hideLoader();
      }
    };
    fetchStudentDetails();
  }, []);

  useEffect(() => {
    console.log(Videodata, 'Videodata')
  })
  const navigation = useNavigation();

  const [visibleMenu, setVisibleMenu] = useState(null);
  const openMenu = (id) => setVisibleMenu(id);
  const closeMenu = () => setVisibleMenu(null);

  const totalSchoolDays = 25;
  const absentDays = 2;
  const presentDays = totalSchoolDays - absentDays;

  const attendancePercentage = (presentDays / totalSchoolDays) * 100;

  const categories = [
    {
      id: '1',
      title: 'Academic',
      data: [
        { id: '1', title: 'Circular', icon: require('./assets/circular_icon.png'), route: 'Circular' },
        { id: '2', title: 'Homework', icon: require('./assets/homework_icon.png'), route: 'HomeworkScreen' },
        { id: '3', title: 'Project', icon: require('./assets/project_iconn.png'), route: 'ProjectScreen' },
        { id: '4', title: 'Syllabus', icon: require('./assets/syllabus_icon.png'), route: 'Syllabus' },
        { id: '5', title: 'Class Routine', icon: require('./assets/classRoutine_icon.png'), route: 'ClassRoutineScreen' },
        { id: '6', title: 'Live Class', icon: require('./assets/liveClass_icon.png'), route: 'LiveClasses' },
        { id: '7', title: 'Activity', icon: require('./assets/activity_icon.png'), route: 'ActivityScreen' },
        { id: '8', title: 'Attendance', icon: require('./assets/attendance_icon.png'), route: 'AttendanceScreen' },



      ],
    },
    {
      id: '2',
      title: 'Exams',
      data: [
        { id: '1', title: 'Question Paper', icon: require('./assets/questionpaper_icon.png'), route: 'QuestionPaperScreen' },
        { id: '1', title: 'Schedule', icon: require('./assets/examSchedule_icon.png'), route: 'ExamScheduleScreen' },
        { id: '2', title: 'Results', icon: require('./assets/examResult_icon.png'), route: 'ExamReport' },
      ],
    },
    {
      id: '3',
      title: 'Communication',
      data: [
        { id: '1', title: 'Message', icon: require('./assets/msg_icon.png'), route: 'Message' },
        { id: '1', title: 'SMS History', icon: require('./assets/sms_icon.png'), route: 'SmsHistory' },
        { id: '2', title: 'My Notification', icon: require('./assets/notification_icon.png'), route: 'Message' },
      ],
    },
    {
      id: '4',
      title: 'Personal',
      data: [
        { id: '1', title: 'My profile', icon: require('./assets/profile_icon.png'), route: 'Profile' },
        { id: '2', title: 'Birthdays', icon: require('./assets/birthday_icon.png'), route: 'Birthdays' },
        { id: '3', title: 'My Diary', icon: require('./assets/diary_icon.png'), route: 'Mydiary' },
      ],
    },
    {
      id: '5',
      title: 'Transportation',
      data: [
        { id: '1', title: 'Transport', icon: require('./assets/bus_icon.png'), route: 'TransportScreen' },
      ],
    },
    // {
    //   id: '3',
    //   title: 'Finance',
    //   data: [
    //     { id: '1', title: 'Fee Summary', icon: require('./path_to_fee_summary_icon.png'), route: 'FeeSummaryPage' },
    //     { id: '2', title: 'Fee Paid', icon: require('./path_to_fee_paid_icon.png'), route: 'FeePaidPage' },
    //   ],
    // },
    // Add more categories as needed
  ];

  // for card
  // const categoriesData = [
  //   { id: '1', title: 'Academic', submenuNo: '5', icon: require('./assets/academic.png'), menuItems: ['Circular', 'Live Class', 'Homework', 'Syllabus','Class Routine', 'Project', 'Activity'] },
  //   { id: '2', title: 'Exams', submenuNo: '3', icon: require('./assets/exam.png'), menuItems: ['Question Paper', 'Exam schedule', 'Exam Report'] },
  //   { id: '3', title: 'Finance', submenuNo: '3', icon: require('./assets/finance.png'), menuItems: ['Fee summary', 'Fee paid details', 'Fee due details'] },
  //   { id: '4', title: 'Transportation ', submenuNo: '1', icon: require('./assets/transport1.png'), menuItems: ['Transport'] },
  //   { id: '5', title: 'Communication', submenuNo: '3', icon: require('./assets/communication.png'), menuItems: ['Messages', 'SMS History', 'My notification'] },
  //   { id: '6', title: 'Personal ', submenuNo: '4', icon: require('./assets/myprofile.png'), menuItems: ['My profile', 'Birthdays','My diary'] },
  // ];
  // for card

  const handleNavigation = (menuItem) => {
    closeMenu();
    switch (menuItem) {
      case 'Circular':
        navigation.navigate('Circular');
        break;
      case 'Live Class':
        navigation.navigate('LiveClasses');
        break;
      case 'Syllabus':
        navigation.navigate('Syllabus');
        break;
      case 'Birthdays':
        navigation.navigate('Birthdays');
        break;
      case 'Exam Report':
        navigation.navigate('ExamReport');
        break;
      case 'Class Routine':
        navigation.navigate('ClassRoutineScreen')
        break
      default:
        Alert.alert(
          'Navigation Error',
          `Page for ${menuItem} not found.`,
          [{ text: 'OK' }]
        );
    }
  };

  const renderCategory = ({ item }) => (
    <View style={Style.categoryContainer}>
      <View style={Style.header}>
      <View style={Style.divider} />
      <View style={Style.titleBox}>
        <Text style={Style.headerText}> {item.title} </Text>
      </View>
        <View style={Style.divider} />

      </View>
      <FlatList
        data={item.data}
        renderItem={renderItem}
        keyExtractor={(icon) => icon.id}
        numColumns={4}
        contentContainerStyle={Style.grid}
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={Style.iconContainer}
      onPress={() => navigation.navigate(item.route)}
    >
      <View style={Style.circle}>
        <Image source={item.icon} style={Style.icon} />
      </View>
      <Text style={Style.iconText}>{item.title}</Text>
    </TouchableOpacity>
  );


  // for card\
  // const renderItem = ({ item }) => (
  //   <View style={Style.grid}>
  //     <Card mode='outlined' outlineColor={'#bfbfbf'} style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
  //       <Card.Content>
  //         <View style={{ height: '67%' }}>
  //           <Image style={Style.iconImage} source={item.icon} />
  //         </View>
  //         <View style={Style.bottomSection}>
  //           <View style={Style.titleSection}>
  //             <Text
  //               style={[Style.titleStyle, { color: theme.colors.primary }]}> {item.title}
  //               <Text style={Style.categoryNo}>{'\n'} {item.submenuNo} categories</Text>
  //             </Text>
  //             <View style={{ position: 'relative' }}>
  //               <Menu
  //                 mode='flat'
  //                 visible={visibleMenu === item.id}
  //                 onDismiss={closeMenu}
  //                 anchor={
  //                   <TouchableOpacity onPress={() => openMenu(item.id)}>
  //                     <Ionicons name="ellipsis-vertical" size={16} color={theme.colors.primary} />
  //                   </TouchableOpacity>}

  //                 style={{
  //                   position: 'absolute',
  //                   width: 150,
  //                 }}
  //                 theme={{
  //                   ...theme,
  //                   colors: {
  //                     ...theme.colors,
  //                     elevation: {
  //                       ...theme.colors.elevation,
  //                       level2: '#fff',
  //                     },
  //                   },
  //                 }}
  //               >
  //                 {item.menuItems.map((menuItem, index) => (
  //                   <Menu.Item key={index} onPress={() => handleNavigation(menuItem)} title={menuItem} />))}
  //                 {item.menuItems.length > 1 && <Divider />}
  //               </Menu>
  //             </View>
  //           </View>
  //         </View>
  //       </Card.Content>
  //     </Card>
  //   </View>
  // );
  // for card

  const videoItems = ({ item }) => {
    try {
      return (
        <View style={Style.shadowContainer}>
          <View style={Style.videoContainer}>
            <Video
              source={{ uri: item.url }}
              style={Style.video}
              controls={true}
              resizeMode="contain"
            />
          </View>
        </View>
      );
    } catch (error) {
      console.error("Error rendering video: ", error);
      return null;
    }
  };
  return (

    <View >
      {studentDetails ? (
        <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, }}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <View style={{ height: 220, width: '100%', backgroundColor: '#005faf', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 20, borderRadius: 10 }}>

              <View style={{ width: '60%' }}>
                <Text style={Style.text}>
                  Hello, {studentDetails.Data.SD_StudentName}
                  {'\n'}
                  {'\n'}<Text style={Style.tagline}>Engage, track, and support your child's success.</Text>
                </Text>
              </View>
              <View style={{ width: '40%', alignItems: 'flex-end' }}>
                <Image
                  source={require('./assets/teacherAvatar.png')}
                  style={{ height: 250, width: 120, borderRadius: 50 }}
                />
              </View>
            </View>
          </View>
          <View style={Style.categorySection}>
            <View style={Style.header}>
              {/* <Text style={Style.headerText}>Academic</Text> */}
              {/* <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} /> */}
            </View>
            <View style={Style.container}>
              <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(category) => category.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
            {/* card design */}
            {/* <FlatList
              data={categoriesData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            /> */}
            {/* card design */}
          </View>
          {/* <View style={Style.categorySection}>
            <View style={Style.header}>
              <Text style={Style.headerText}>Our Live classes</Text>
              <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} onPress={() => navigation.navigate('LiveClasses')} />
            </View>
            <FlatList
              data={Videodata.slice(0, 3)}
              renderItem={videoItems}
              keyExtractor={(item) => item.id}
              horizontal
              
              showsHorizontalScrollIndicator={false}
            />
          </View> */}
          {/* <View style={Style.attendanceSection}>
            <View style={Style.header}>
              <Text style={Style.headerText}>Attendance</Text>
              <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} onPress={() => navigation.navigate('AttendanceScreen')} />
            </View>
            <View style={Style.AttendanceCont}>
              <AttendanceProgressBar percentage={attendancePercentage.toFixed(2)} />
              <View style={Style.AttendanceDetails}>
                <Text style={[Style.AttendanceHeader, { color: theme.colors.primary }]} >Total School Days</Text>
                <Text style={Style.AttendanceNo}>25</Text>
                <Text style={[Style.AttendanceHeader, { color: theme.colors.primary }]}>Weekends</Text>
                <Text style={Style.AttendanceNo}>4</Text>
                <Text style={[Style.AttendanceHeader, { color: theme.colors.primary }]}>Official Leaves</Text>
                <Text style={Style.AttendanceNo}> 1</Text>
              </View>
            </View>
          </View> */}

        </ScrollView >) :
        (
          <Text>No student details available</Text>
        )}
    </View >
  )
}

const Style = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  tagline: {
    color: '#dbe7bb',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 16,
    color:'#fff',
    fontFamily: 'Poppins-Regular',
  },
  categorySection: {
    padding: 10,
  },
  attendanceSection: {
    padding: 10,
    marginBottom: 50
  },
  iconImage: {
    width: 55,
    height: 55,
    paddingLeft: 10
  },
  parentTile: {
    height: 120,
    // width: Dimensions.get('window')?.width / 5 - 10,
    width: 160,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 15,
    backgroundColor: '#fff',
    borderColor: '#bfbfbf'
  },
  bottomSection: {
    flexDirection: 'row',
    height: '40%',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  categoryNo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'gray'
  },
  shadowContainer: {
    width: 280,
    height: 158,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 10,
  },
  videoContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#808080',
  },
  video: {
    width: '100%',
    height: '100%',

  },
  AttendanceCont: {
    flexDirection: 'row',
  },
  AttendanceDetails: {
    paddingLeft: 20,
    padding: 5
  },
  AttendanceHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14
  },
  AttendanceNo: {
    fontFamily: 'Poppins-Regular'
  },




  container: {
    flex: 1,
    padding: 5,
  },
  categoryContainer: {
    marginBottom: 30,
  },

  grid: {
    alignItems: 'center',
  },
  iconContainer: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  iconText: {
    fontWeight:'bold',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#005faf', 
  },
  titleBox: {
    backgroundColor: '#005faf', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5, 
    marginHorizontal: 10, 
    marginVertical:5

  },
})

export default HomeScreen;
