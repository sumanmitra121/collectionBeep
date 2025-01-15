import React,{useState,useEffect} from 'react'
import { Text,View,StyleSheet } from 'react-native'
import NavComponent from '../Components/Nav'
import { Calendar } from 'react-native-calendars';
import {  Tooltip } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from '../Config/config';
import CallApi from '../services/DbIntrService';
const AttendanceScreen = () => {

    const [attendanceData, setAttendanceData] = useState({
        present: [],
        halfDay: [],
        absent: [],
        leave: [],
        holiday: {},
        noExam: [],
    });

    const [currentMonth, setCurrentMonth] = useState(() => {
        const currentDate = new Date();
        return (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2-digit format
    });

    const handleMonthChange = (monthObject) => {
        const newMonth = monthObject.month.toString().padStart(2, '0'); // Ensure 2-digit format
        setCurrentMonth(newMonth);
        console.log(currentMonth,'currentMonth')
    };

    useEffect(() => {
        // const fetchAttendanceDetails = async (month) => {     
        //     try {
        //         const token = await AsyncStorage.getItem('token');
        //         const studentId = await AsyncStorage.getItem('student_id');

        //         console.log(studentId,'studentId')
        //         console.log(token,'token')
        //         const response = await axios.post(`${BASE_URL}/api/Attendence/GetStudentWiseAttendanceData`,
        //             {
        //                 SD_StudentId: studentId,
        //                 Year:2024,
        //                 Month:parseInt(month),
        //             },
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`,
        //                 },
        //             }

        //         );
        //         console.log(response.data.Data, "attendance data")
        //         const responsedata = response.data.Data 
        //         console.log(responsedata.Present,'Present')
        //         setAttendanceData({
        //             present: responsedata.Present || [],
        //             halfDay: responsedata.HalfDay || [],
        //             absent: responsedata.Absent || [],
        //             leave: responsedata.Leave || [],
        //             holiday: responsedata.Holiday || {},
        //             noExam: responsedata.NoExam || [],
        //         });
        //     } catch (error) {
        //         console.error('Error fetching attendance details:', error);
        //         // setLoading(false);
        //     }
        // };

        const fetchAttendanceDetails = async (month) =>{
            const studentId = await AsyncStorage.getItem('student_id');
            const payLoad = {SD_STUDENTID:studentId,Year:2025,Month:parseInt(month)}
            const apiRes = await CallApi(1,'/api/Attendence/GetStudentWiseAttendanceData',payLoad);
            const responsedata = apiRes.data.Data 
            setAttendanceData({
                    present: responsedata.Present || [],
                    halfDay: responsedata.HalfDay || [],
                    absent: responsedata.Absent || [],
                    leave: responsedata.Leave || [],
                    holiday: responsedata.Holiday || {},
                    noExam: responsedata.NoExam || [],
                });
        console.log('Attendance Response', apiRes.data.Data)
        }

        // fetchAttendanceDetails();
            fetchAttendanceDetails(currentMonth);
    }, [currentMonth]);
    
    const [selectedHoliday, setSelectedHoliday] = useState(null);


    const generateMarkedDates = () => {
        const markedDates = {};

        const categoryColors = {
            present: '#008000', // Green
            halfDay: '#993333', // Brown
            absent: '#e60000', // Red
            leave: '#FFA500', // Orange
            holiday: '#0099cc', // Blue
            noExam: '#800080', // Purple
        };
        Object.entries(attendanceData.holiday).forEach(([date, name]) => {
            markedDates[date] = {
                selected: true,
                selectedColor: categoryColors.holiday,
                selectedTextColor: '#FFFFFF',
            };
        });

        Object.entries(attendanceData).forEach(([category, dates]) => {
            if (category === 'holiday') return; 
            dates.forEach(date => {
                markedDates[date] = {
                    selected: true,
                    selectedColor: categoryColors[category],
                    selectedTextColor: '#FFFFFF',
                };
            });
        });
        return markedDates;
    };

    const markedDates = generateMarkedDates();

    const handleDatePress = date => {
        const holidayName = attendanceData.holiday[date];
        if (holidayName) {
            setSelectedHoliday({ date, name: holidayName });
        } else {
            setSelectedHoliday(null);
        }
    };

    const renderCategoryContainers = () => {
        const categories = [
            { label: 'Present', key: 'present', color: '#008000' },
            { label: 'Half Day', key: 'halfDay', color: '#993333' },
            { label: 'Absent', key: 'absent', color: '#e60000' },
            { label: 'Leave', key: 'leave', color: '#FFA500' },
            { label: 'Holiday', key: 'holiday', color: '#0099cc' },
            { label: 'No Exam', key: 'noExam', color: '#800080' },
        ];

        return categories.map(category => (
            <View
                key={category.key}
                style={[styles.categoryContainer, { backgroundColor: category.color }]}
            >
                <Text style={styles.categoryLabel}>{category.label}</Text>
                <Text style={styles.categoryCount}>
                    { category.key === 'holiday'
                        ? Object.keys(attendanceData.holiday).length
                        : attendanceData[category.key]?.length || 0
                    }
                </Text>
            </View>
        ));
    };

    return (
        
        <>
            <NavComponent />
            <View style={styles.container}>
                <Text style={styles.title}>Attendance Calendar</Text>
                <Calendar
                    markedDates={markedDates}
                    markingType="dot"
                    onDayPress={day => handleDatePress(day.dateString)}
                    onMonthChange={handleMonthChange}
                />
                 <View style={styles.categoryWrapper}>
                    {renderCategoryContainers()}
                </View>
                {selectedHoliday && (
                    <Tooltip
                        visible={!!selectedHoliday}
                        onDismiss={() => setSelectedHoliday(null)}
                        contentStyle={styles.tooltipContent}
                    >
                        <View style={styles.tooltip}>
                            <Text style={styles.tooltipText}>
                                {`Holiday: ${selectedHoliday.name}`}
                            </Text>
                        </View>
                    </Tooltip>
                )}
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color:'#005faf'
    },
    categoryWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    categoryContainer: {
        width: '48%', // Two containers per row
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    categoryLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    categoryCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    tooltip: {
        // bottom: 50,
        // left: '50%',
        // transform: [{ translateX: -50 }],
        padding: 8,
        backgroundColor: '#ffffff',
        borderRadius: 4,
    },
    tooltipContent: {
        backgroundColor: '#FFFFFF',
    },
    tooltipText: {
        color: '#000000',
        fontWeight: 'bold',
    },
});

export default AttendanceScreen
