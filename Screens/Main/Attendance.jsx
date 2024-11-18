import React from 'react'
import { Text,View,StyleSheet } from 'react-native'
import NavComponent from '../Components/Nav'
import { Calendar } from 'react-native-calendars';

const AttendanceScreen = () => {
    const attendanceData = {
        present: ['2024-11-15', '2024-11-16', '2024-11-18'],
        halfDay: ['2024-11-12', '2024-11-13'],
        absent: ['2024-11-10', '2024-11-11'],
        leave: ['2024-11-08', '2024-11-09'],
        holiday: ['2024-11-04', '2024-11-05'],
        noExam: ['2024-11-02', '2024-11-03'],
    };

    // const generateMarkedDates = () => {
    //     const markedDates = {};

    //     // Assign colors to each category
    //     const categoryColors = {
    //         present: '#00FF00', // Green
    //         halfDay: '#FFFF00', // Yellow
    //         absent: '#FF0000', // Red
    //         leave: '#FFA500', // Orange
    //         holiday: '#0000FF', // Blue
    //         noExam: '#800080', // Purple
    //     };

    //     // Mark dates based on categories
    //     Object.entries(attendanceData).forEach(([category, dates]) => {
    //         dates.forEach(date => {
    //             markedDates[date] = {
    //                 marked: true,
    //                 dotColor: categoryColors[category],
    //             };
    //         });
    //     });

    //     return markedDates;
    // };
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
        Object.entries(attendanceData).forEach(([category, dates]) => {
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
    return (
        
        <>
            <NavComponent />
            <View style={styles.container}>
                <Text style={styles.title}>Attendance Calendar</Text>
                <Calendar
                    markedDates={markedDates}
                    markingType="dot"
                />
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
    },
});

export default AttendanceScreen
