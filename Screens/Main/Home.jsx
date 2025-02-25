import React, { useEffect, useState } from 'react';
// import { Text} from 'react-native';
import { Card, Text, useTheme, Menu, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, Image, View, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../Config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoader } from '../Contexts/LoaderProvider';
const HomeScreen = () => {
  const [userType, setUserType] = useState(null);
  const { showLoader, hideLoader } = useLoader(); // Access loader methods
  const [studentDetails, setStudentDetails] = useState(null);
  const theme = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      console.log('sasdasd')
    }, [])
  )
  useEffect(() => {
    const getUserType = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem('user_type');
        console.log(storedUserType, 'storedUserType')
        setUserType(storedUserType);
      } catch (error) {
        console.error('Error retrieving user type:', error);
      } finally {
        // setLoading(false);
      }
    };

    getUserType();
  }, []);
  useEffect(() => {

    const fetchStudentDetails = async () => {
      const userType = await AsyncStorage.getItem('user_type');
      console.log(userType, 'userType')
      try {
        showLoader('Fetching student details...');
        const token = await AsyncStorage.getItem('token');
        const studentId = await AsyncStorage.getItem('student_id');

        console.log(token, "token in GetStudentDetailsById ")
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

    const fetchFacultyDetails = async () => {
      try {
        showLoader('Fetching faculty details...');
        const token = await AsyncStorage.getItem('token');
        const facultyId = await AsyncStorage.getItem('faculty_id');
        console.log(facultyId, "facultyId")

        const response = await axios.post(
          `${BASE_URL}/api/FacultyLogin/GetFacultyLoginById`,
          {
            FP_FacultyCode: facultyId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data, "faculty Details")
      } catch (error) {
        console.error('Error fetching faculty details:', error);
      }
      finally {
        hideLoader();
      }
    };
    fetchFacultyDetails();
  }, []);
  const navigation = useNavigation();


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
  ];

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
  return (
    userType === 'S' ?
      <View >
        {studentDetails ? (
          <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
              <View style={{ height: 220, width: '100%', backgroundColor: '#005faf', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 20, borderRadius: 10 }}>

                <View style={{ width: '60%' }}>
                  <Text style={Style.text}>
                    Hello, {studentDetails.Data?.SD_StudentName}
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
              </View>
              <View style={Style.container}>
                <FlatList
                  data={categories}
                  renderItem={renderCategory}
                  keyExtractor={(category) => category.id}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </ScrollView >) :
          (
            <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, }}>
              <Text>No student details available</Text>
            </ScrollView>
          )}
      </View >
      :
      <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, }}>
        <Text>View for faculty</Text>
      </ScrollView>
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
    color: '#fff',
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
    fontWeight: 'bold',
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
    marginVertical: 5

  },
})
export default HomeScreen;
