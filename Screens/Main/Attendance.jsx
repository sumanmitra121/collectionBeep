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
                <Text style={styles.categoryCount}>{attendanceData[category.key].length}</Text>
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
                />
                 <View style={styles.categoryWrapper}>
                    {renderCategoryContainers()}
                </View>
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
});

export default AttendanceScreen
