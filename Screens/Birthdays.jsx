import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import NavComponent from './Components/Nav'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./Config/config";
import axios from "axios";
import moment from 'moment';

const BirthdaysScreen = () => {
    // const [birthdayList, setBirthdayList] = useState([])
    const [todayBirthdays, setTodayBirthdays] = useState([]);
    const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);

    useEffect(() => {
        const fetchGetSyllabus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                // const studentId = await AsyncStorage.getItem('student_id');
                const response = await axios.post(
                    `${BASE_URL}/api/ClassWiseBirthday/GetClassWiseBirthday`,
                    {
                        SD_ClassId: "77"
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }

                );
                console.log(response.data.List, "Birthdays")
                const birthdayList = response.data.List
                const today = moment()
                const todayDayMonth = today.format('DD/MM')
                console.log(todayDayMonth, 'todayDayMonth');

                const todayBirthdayDate = birthdayList.filter(item =>
                    moment(item.DOB, 'DD/MM/YYYY HH:mm:ss').format('DD/MM') === todayDayMonth
                );
                console.log(todayBirthdayDate, 'todayBirthdayDate')
                const upcomingBirthdayDate = birthdayList.filter(item =>
                    moment(item.DOB,'DD/MM/YYYY HH:mm:ss').format('DD/MM') !== todayDayMonth
                );
                console.log(upcomingBirthdayDate, 'upcomingBirthdayDate');

                setTodayBirthdays(todayBirthdayDate);
                setUpcomingBirthdays(upcomingBirthdayDate);

            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchGetSyllabus();
    }, []);

    const renderBirthdayItem = ({ item }, isToday) => {
        const hasPhoto = item.PHOTO && item.PHOTO.length > 0
        console.log(hasPhoto,'hasPhoto')
        return(
        <View style={Style.menuContainer2}>
            <LinearGradient
                colors={isToday ? ['#80c6ff', '#b3f2ff'] : ['#e1bee7', '#eedaf1']}
                style={Style.listContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <View style={[
                    Style.imageCont,
                    { backgroundColor: isToday ? '#4dafff' : '#cb8fd6' } 
                ]}>
                    {hasPhoto ? (
                    <Image source={{ uri: item.PHOTO }} style={Style.icon} />
                    ) :
                    ( <Text style={Style.iconText}>
                        {item.STUDENTNAME.charAt(0).toUpperCase()}
                    </Text> )
                    }
                </View>
                <View style={Style.textContainer}>
                <Text style={Style.birthdayDetailsName}>{item.STUDENTNAME}</Text>
                <Text style={Style.dobText}>{item.DOB}</Text>
                </View>
            </LinearGradient>
        </View>
        )
    }
    return (
        <>
            <NavComponent />
            <ScrollView style={Style.scrollView}>
                <View style={Style.menuContainer}>
                    {/* <Text style={Style.date}>08 November,Friday</Text> */}
                    <LinearGradient
                        colors={['#005faf', '#00b4d8']}
                        style={Style.menuItem}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Image source={require('./Main/assets/balloon.png')} style={Style.icon} />
                        <Text style={Style.title}> Today's Birthdays </Text>
                        <Text style={Style.title2}> Cheers to {todayBirthdays.length} Birthdays Today!" </Text>
                    </LinearGradient>
                </View>

                {/* <View style={Style.listSection}>
                    <FlatList
                        data={todayBirthdays}
                        keyExtractor={(item) => item.SD_StudentId}
                        renderItem={({ item }) => (
                            <View style={Style.menuContainer2}>
                                <LinearGradient
                                    colors={['#80c6ff', '#b3f2ff']}
                                    style={Style.listContainer}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <View style={Style.imageCont}>
                                        <Image
                                            source={{ uri: item.SD_Photo }}
                                            style={Style.icon}
                                        />
                                    </View>
                                    <Text style={Style.birthdayDetailsName}>{item.SD_StudentName}</Text>
                                </LinearGradient>
                            </View>
                        )}
                    />
                </View> */}

                {todayBirthdays.length > 0 && (
                    <>
                        <Text style={Style.headerText}>
                            {moment().format('DD MMMM YYYY')}
                        </Text>
                        <FlatList
                            data={todayBirthdays}
                            renderItem={(item) => renderBirthdayItem(item, true)}
                            keyExtractor={(item) => item.STUDENTID}
                        />
                    </>
                )}
                {upcomingBirthdays.length > 0 && (
                    <>
                        <Text style={Style.headerText}>Upcoming Birthdays</Text>
                        <FlatList
                            data={upcomingBirthdays}
                            renderItem={(item) => renderBirthdayItem(item, false)}
                            keyExtractor={(item) => item.STUDENTID}
                        />
                    </>
                )}
            </ScrollView>
        </>
    )
}

const Style = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Poppins-Regular',
        paddingLeft: 10
    },
    menuContainer: {
        padding: 10
    },
    menuContainer2: {
        padding: 10,
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        borderRadius: 15,
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 25,
    },
    iconText: {
        fontSize: 20,
        color: '#fff',              
        textAlign: 'center',
        lineHeight: 50,              
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Poppins-Regular',
    },
    title2: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },

    listSection: {
        flex: 1,
        padding: 5,
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 90,
        borderRadius: 15,
        backgroundColor: '#b3ddff'
    },
    imageCont: {
        marginLeft: 5,
        height: 60,
        width: 60,
        backgroundColor: '#005faf',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    birthdayDetailsName: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
        fontFamily: 'Poppins-Regular',
    },
    dobText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#555',  
        fontFamily: 'Poppins-Regular',
        marginTop: 5, 
    },
    headerText:{
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        paddingLeft:10
    },
    textContainer: {
        paddingLeft:10
    },
})
export default BirthdaysScreen
