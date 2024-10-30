import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity,Share } from 'react-native'
import NavComponent from '../Components/Nav'
import axios from 'axios'
import { BASE_URL } from '../Config/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns'; 

const CircularScreen = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                // const studentId = await AsyncStorage.getItem('student_id');
                // if (!token || !studentId) {
                //   console.error('Token or student ID not found in storage');
                //   return;
                // }
                const response = await axios.post(
                    `${BASE_URL}/api/Notice/GetNotice`,
                    {
                        SD_STUDENTID: '24BOL0174',
                        SD_CurrentSessionId: '115'
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }

                );
                console.log(response.data, "notice")
                setNotices(response.data.List || []);

                // console.log(studentDetails,"studentDetails")
                // setLoading(false); 
            } catch (error) {
                console.error('Error fetching student details:', error);
                // setLoading(false);
            }
        };

        fetchStudentDetails();
    }, []);

    const renderItem = ({ item }) => {
        const formattedDate = format(new Date(item.NM_EntryDate), 'yyyy-MM-dd HH:mm');

        return (
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.cardHeader}>
                    <Text style={styles.circularText}>CIRCULAR</Text>
                    {/* <Text style={styles.dateText}>{item.NM_EntryDate}</Text> */}
                    <Text style={styles.dateText}>{formattedDate}</Text>

                </View>

                {/* Title */}
                <Text style={styles.title}>{item.NM_Title}</Text>

                {/* Notice */}
                <Text style={styles.notice}>{item.NM_Notice}</Text>

                {/* Footer with Share Button */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => handleShare(item)}>
                        <Ionicons name="share-social" size={24} color="#005faf" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const handleShare = async (item) => {
        try {
            await Share.share({
              message: `${item.NM_Title}\n\n${item.NM_Notice}\n\nShared from the School App.`,
            });
          } catch (error) {
            Alert.alert('Error', 'Unable to share the notice.');
            console.error('Error sharing notice:', error);
          }
    };
    return (
        <>
            <NavComponent />
            <View style={styles.sortFilterSection}>
                <View style={styles.sortContainer}>
                    <Ionicons name="swap-vertical-outline" size={22} color="#005faf" />
                    <Text style={styles.sortText}>Sort</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.filterContainer}>
                    <Text style={styles.filterText}>Filter</Text>
                    <Ionicons name="filter-outline" size={22} color="#005faf" />
                </View>
            </View>

            <FlatList
                data={notices}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

        </>
    )
}

const styles = StyleSheet.create({

    sortFilterSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#cce8ff',
        padding: 10,
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#005faf'

    },
    divider: {
        width: 2,
        height: 20,
        backgroundColor: '#005faf',
        marginHorizontal: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterText: {
        marginRight: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#005faf'
    },

    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        padding: 10
    },
    circularText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    dateText: {
        fontSize: 14,
        color: '#888',
        fontWeight: 'bold',

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: 'center',
        padding: 20
    },
    notice: {
        fontSize: 16,
        color: '#555',
        padding: 8
    },
    footer: {
        alignItems: 'flex-start',paddingVertical:15
    },
})

export default CircularScreen
