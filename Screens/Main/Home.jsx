import React,{useState} from 'react';
// import { Text} from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, Image, View, ScrollView, FlatList,TouchableOpacity,Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { List, MD3Colors } from 'react-native-paper';

import Wave from '../Components/WaveComponent';
const HomeScreen = () => {
  const theme = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      console.log('sasdasd')
    }, [])
  )
  const [isListVisible, setIsListVisible] = useState(false);
  const [heightAnim] = useState(new Animated.Value(0)); // For animation


  // Function to toggle the list visibility
  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
    Animated.timing(heightAnim, {
      toValue: isListVisible ? 0 : 100, // Adjust height for open/close
      duration: 300, // Smooth transition
      useNativeDriver: false, // Needed for height animation
    }).start();
  };
  const categoriesData = [
    { id: '1', title: 'Academic', submenuNo:'6', icon: require('./assets/academic.png') },
    { id: '2', title: 'Exams',submenuNo:'3',  icon: require('./assets/exam.png') },
    { id: '3', title: 'Finance',submenuNo:'2', icon: require('./assets/finance.png') },
    { id: '4', title: 'Transportation ',submenuNo:'1', icon: require('./assets/transport1.png') },
    { id: '5', title: 'Communication',submenuNo:'2', icon: require('./assets/communication.png') },
    { id: '6', title: 'Personal ',submenuNo:'2', icon: require('./assets/myprofile.png') },
  ];

  const renderItem = ({ item }) => (
    <View style={Style.grid}>
      <Card mode='outlined' outlineColor={'#bfbfbf'} style={[{ backgroundColor: theme.colors.secondaryContainer, ...Style.parentTile }]}>
        <Card.Content>
          <View style={{ height: '70%' }}>
            <Image style={Style.iconImage} source={item.icon} />
          </View>
          <View style={Style.bottomSection}>
            <View style={Style.titleSection}>
              <Text
                style={[Style.titleStyle, { color: theme.colors.primary }]}> {item.title} ({item.submenuNo})
              </Text>
              <TouchableOpacity onPress={toggleListVisibility}>
              <Ionicons name="ellipsis-vertical" size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Card.Content>
      </Card>
      {isListVisible && (  <Animated.View
        style={{
          height: heightAnim, // Animate height change
          overflow: 'hidden', // Ensure content doesn't spill
          marginTop: 10, // Space between card and list
          borderColor: '#bfbfbf', // Border around the list for a nice look
          borderWidth: 1,
          borderRadius: 8,
          backgroundColor: theme.colors.surface, // Matching theme color
          padding: 10, // Add padding for breathing space
          shadowColor: "#000", // Shadow for a nice depth
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // Elevation for Android shadow
        }}>
        <List.Section>
          <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
          <List.Item
            title="Second Item"
            left={() => <List.Icon color={MD3Colors.tertiary70} icon="folder" />}
          />
        </List.Section>
      </Animated.View>)}
    </View>
  );
  return (
    <View >
      <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background }}>
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
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          {/* <Image source={require('./assets/wave.png')} style={{ width: Dimensions.get('window')?.width, height: Dimensions.get('window')?.height * 0.2 }} />
          <Text style={Style.text}>Hello,{'\n'}
            Eshita Dey</Text> */}
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
            <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
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
    padding: 10
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
    height: '30%',
  },
  titleSection: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    width: '100%',
  },
  titleStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
})

export default HomeScreen;
