import React, { useState } from 'react';
// import { Text} from 'react-native';
import { Card, Text, useTheme, Menu, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, Image, View, ScrollView, FlatList, TouchableOpacity, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import Wave from '../Components/WaveComponent';
import AttendanceProgressBar from '../Components/AttendanceProgressBar';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeScreen = () => {
  const theme = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      console.log('sasdasd')
    }, [])
  )
  const [visibleMenu, setVisibleMenu] = useState(null);

  const openMenu = (id) => setVisibleMenu(id);
  const closeMenu = () => setVisibleMenu(null);

  const totalSchoolDays = 25;
  const absentDays = 2;
  const presentDays = totalSchoolDays - absentDays;

  const attendancePercentage = (presentDays / totalSchoolDays) * 100;

  const categoriesData = [
    { id: '1', title: 'Academic', submenuNo: '5', icon: require('./assets/academic.png'), menuItems: ['Circular', 'Live Class', 'Homework', 'Project', 'Activity'] },
    { id: '2', title: 'Exams', submenuNo: '3', icon: require('./assets/exam.png'), menuItems: ['Question Paper', 'Exam schedule', 'Exam report'] },
    { id: '3', title: 'Finance', submenuNo: '3', icon: require('./assets/finance.png'), menuItems: ['Fee summary', 'Fee paid details', 'Fee due details'] },
    { id: '4', title: 'Transportation ', submenuNo: '1', icon: require('./assets/transport1.png'), menuItems: ['Transport'] },
    { id: '5', title: 'Communication', submenuNo: '3', icon: require('./assets/communication.png'), menuItems: ['Messages', 'SMS History', 'My notification'] },
    { id: '6', title: 'Personal ', submenuNo: '4', icon: require('./assets/myprofile.png'), menuItems: ['My profile', 'Birthdays', 'My diary'] },
  ];

  const renderItem = ({ item }) => (
    <View style={Style.grid}>
      <Card mode='outlined' outlineColor={'#bfbfbf'} style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
        <Card.Content>
          <View style={{ height: '67%' }}>
            <Image style={Style.iconImage} source={item.icon} />
          </View>
          <View style={Style.bottomSection}>
            <View style={Style.titleSection}>
              <Text
                style={[Style.titleStyle, { color: theme.colors.primary }]}> {item.title}
                 <Text style={Style.categoryNo}>{'\n'} {item.submenuNo} categories</Text>
              </Text>
              <View style={{ position: 'relative' }}>
                <Menu
                mode='flat'
                  visible={visibleMenu === item.id}
                  onDismiss={closeMenu}
                  anchor={
                    <TouchableOpacity onPress={() => openMenu(item.id)}>
                      <Ionicons name="ellipsis-vertical" size={16} color={theme.colors.primary} />
                    </TouchableOpacity>}

                  style={{
                    position: 'absolute',
                    width: 150,
                  }}
                  theme={{
                    ...theme,
                    colors: {
                      ...theme.colors,
                      elevation: {
                        ...theme.colors.elevation,
                        level2: '#fff', 
                      },
                    },
                  }}
                  >
                  {item.menuItems.map((menuItem, index) => (
                    <Menu.Item key={index} onPress={() => { }} title={menuItem} />))}
                  {item.menuItems.length > 1 && <Divider />}
                </Menu>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
  const videoData = [
    { id: '2', source: require('./assets/vid2.mp4') },
    { id: '1', source: require('./assets/vid1.mp4') },

  ];

  const videoItems = ({ item }) => {
    try {
      return (
        <View style={Style.shadowContainer}>  
        <View style={Style.videoContainer}>
          <Video
            source={item.source}
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
      <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, }}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <View style={{ height: 220, width: '100%', backgroundColor: '#005faf', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 20, borderRadius: 10 }}>

            <View style={{ width: '60%' }}>
              <Text style={Style.text}>
                Hello, Eshita Dey
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
            <Text style={Style.headerText}>Categories</Text>
            {/* <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} /> */}
          </View>
          <FlatList
            data={categoriesData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          // contentContainerStyle={Style.flatListContainer}
          />
        </View>
        <View style={Style.categorySection}>
          <View style={Style.header}>
            <Text style={Style.headerText}>Our Live classes</Text>
            {/* <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} /> */}
          </View>
          <FlatList
            data={videoData}
            renderItem={videoItems}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={Style.attendanceSection}>
          <View style={Style.header}>
            <Text style={Style.headerText}>Attendance</Text>
            {/* <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} /> */}
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
        </View>

      </ScrollView >
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
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  categorySection: {
    padding: 10,
  },
  attendanceSection: {
    padding: 10,
    marginBottom: 50
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
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
    // borderWidth:1,
    // borderColor:'#bfbfbf'
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    // elevation: 5,
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
  categoryNo:{
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color:'gray'
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
  }
})

export default HomeScreen;
