import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import NavComponent from './Components/Nav'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./Config/config";
import axios from "axios";
import moment from 'moment';

const BirthdaysScreen = () => {
    const [birthdayList, setBirthdayList] = useState([])
    const today = moment().format('DD/MM/YYYY');
    const todaysBirthdays = birthdayList.filter(item =>
        moment(item.SD_DOB, 'DD/MM/YYYY').format('DD/MM/YYYY') === today
    );
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
                setBirthdayList(response.data.List)
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchGetSyllabus();
    }, []);
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
                        <Text style={Style.title}> Today Birthdays </Text>
                        <Text style={Style.title2}> 10 Birthday today </Text>
                    </LinearGradient>
                </View>

                {/* <View style={Style.listSection}>
                    <View style={Style.menuContainer}>
                        <LinearGradient
                            colors={['#80c6ff', '#b3f2ff']}
                            style={Style.listContainer}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={Style.imageCont}>
                                <Image source={require('./Main/assets/student1.jpg')} style={Style.icon} />
                            </View>
                            <Text style={Style.birthdayDetailsName}>Ditipriya Saha</Text>
                        </LinearGradient>
                    </View>
                </View> */}

                <View style={Style.listSection}>
                    <FlatList
                        data={todaysBirthdays}
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
                </View>
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
    menuContainer2:{
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
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 30,
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
        height: 70,
        width: 70,
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
})
export default BirthdaysScreen
