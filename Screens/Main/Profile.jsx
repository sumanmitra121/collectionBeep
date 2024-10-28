import { React, useState, useEffect } from 'react'
import { Text, StyleSheet, ScrollView, View,Image} from 'react-native'
import NavComponent from '../Components/Nav'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../Config/config';
import { Card, Title, Paragraph,Divider  } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = () => {
    const [studentDetails, setStudentDetails] = useState(null);
    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const studentId = await AsyncStorage.getItem('student_id');
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
                // console.log(studentDetails,"studentDetails")
                // setLoading(false); 
            } catch (error) {
                console.error('Error fetching student details:', error);
                // setLoading(false);
            }
        };

        fetchStudentDetails();
    }, []);
    return (
        <><NavComponent />

            <ScrollView contentContainerStyle={Style.container}>
                
                <Card style={Style.card}>

                <View style={{ height: 220, width: '100%', backgroundColor: '#005faf', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 20, borderRadius: 10 }}>
                <View style={{ width: '50%', alignItems: 'flex-end' }}>
                        <Image
                            source={require('./assets/profileAvatar.png')}
                            style={{ height: 200, width: 150, borderRadius: 50 }}
                        />
                    </View>
                    <View style={{ width: '40%' }}>
                        <Text style={Style.text}>
                            {'\n'}<Text style={Style.tagline}>Student Details at a Glance...!</Text>
                        </Text>
                    </View>
                   
                </View>

                <Card.Content>
                        {studentDetails && (
                            <>
                            <View style={Style.content}>
                                <View style={Style.detailRow}>
                                    <Ionicons name="person-circle" size={24} color="#005faf" />
                                    <Paragraph style={Style.text}>
                                        <Text style={Style.label}>Name: </Text>{studentDetails.Data.SD_StudentName}
                                    </Paragraph>
                                </View>
                                <Divider style={Style.divider} />

                                <View style={Style.detailRow}>
                                    <Ionicons name="albums" size={24} color="#005faf" />
                                    <Paragraph style={Style.text}>
                                        <Text style={Style.label}>Section: </Text>{studentDetails.Data.SECM_SECTIONNAME}
                                    </Paragraph>
                                </View>
                                <Divider style={Style.divider} />

                                <View style={Style.detailRow}>
                                    <Ionicons name="list-circle" size={24} color="#005faf" />
                                    <Paragraph style={Style.text}>
                                        <Text style={Style.label}>Roll Number: </Text>{studentDetails.Data.SD_CurrentRoll}
                                    </Paragraph>
                                </View>
                                <Divider style={Style.divider} />

                                <View style={Style.detailRow}>
                                    <Ionicons name="card" size={24} color="#005faf" />
                                    <Paragraph style={Style.text}>
                                        <Text style={Style.label}>Student ID: </Text>{studentDetails.Data.SD_StudentId}
                                    </Paragraph>
                                </View>
                                <Divider style={Style.divider} />

                                <View style={Style.detailRow}>
                                    <Ionicons name="school" size={24} color="#005faf" />
                                    <Paragraph style={Style.text}>
                                        <Text style={Style.label}>School: </Text>{studentDetails.Data.SCM_SCHOOLNAME}
                                    </Paragraph>
                                </View>

                               

                               

                               
                                </View>
                            </>
                        )}
                    </Card.Content>
                </Card>
            </ScrollView>
        </>
    )
}

const Style = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        flexGrow: 1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        height: 220,
        width: '100%',
        backgroundColor: '#005faf',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    avatarContainer: {
        width: '50%',
        alignItems: 'flex-end',
    },
    avatar: {
        height: 200,
        width: 150,
        borderRadius: 50,
    },
    headerText: {
        width: '40%',
    },
    tagline: {
        color: '#cebbe3',
        fontSize: 22,
        fontFamily: 'Poppins-Regular',
    },
    content:{
        marginTop:30
    },
    text: {
        marginLeft:10,
        fontSize: 16,
        // marginBottom: 10,
        fontFamily: 'Poppins-Regular',
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
    },
    divider: {
        marginVertical: 15,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 5,
    },
});


export default Profile
