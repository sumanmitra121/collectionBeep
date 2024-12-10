import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity,Share } from 'react-native'
import NavComponent from '../Components/Nav'
import axios from 'axios'
import { BASE_URL } from '../Config/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns'; 
import apiService from '../services/apiService'
import { useLoader } from '../Contexts/LoaderProvider'
import CallApi from '../services/DbIntrService'

const CircularScreen = () => {
    const [notices, setNotices] = useState([]);
    const { showLoader, hideLoader } = useLoader(); 

    useEffect(() => {
        //using apiService Start
        // const fetchStudentDetails = async () => {
        //     try {
        //         showLoader()
        //         const token = await AsyncStorage.getItem('token');
        //         const studentId = await AsyncStorage.getItem('student_id');
        //         const response = await apiService.post(
        //             `/api/Notice/GetNotice`,
        //             {
        //                 SD_STUDENTID: studentId,
        //                 SD_CurrentSessionId: '115'
        //             },
        //         );
        //         console.log('Notice Response1',response)
        //         setNotices(response.List || []);
        //     } catch (error) {
        //         console.error('Error fetching student details:', error);
        //     }
        //     finally{
        //         hideLoader()
        //     }
        // };
        //using apiService End
        //using callApi Start
        const fetchRoutine = async () => {
            const studentId = await AsyncStorage.getItem('student_id');
            const payLoad = {"SD_STUDENTID":studentId,"SD_CurrentSessionId":'115'}
            const apiRes = await CallApi(1,'/api/Notice/GetNotice',payLoad);
            setNotices(apiRes?.data?.List || [])
            console.log('Notice Response', apiRes.data.List)
        }
        //using callApi End

        fetchRoutine();
    }, []);

    const renderItem = ({ item }) => {
        const formattedDate = format(new Date(item.NM_ENTRYDATE), 'yyyy-MM-dd HH:mm');

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.circularText}>CIRCULAR</Text>
                    <Text style={styles.dateText}>{formattedDate}</Text>

                </View>
                <Text style={styles.title}>{item.NM_TITLE}</Text>
                <Text style={styles.notice}>{item.NM_NOTICE}</Text>
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
              message: `${item.NM_TITLE}\n\n${item.NM_NOTICE}\n\nShared from the School App.`,
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
