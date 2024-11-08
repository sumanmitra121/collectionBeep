import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./Config/config";
import axios from "axios";
const PaymentDetailsPage = ({ navigation }) => {
    const [feePaymentData, setFeePaymentData] = useState([])
    const tableData = [
        { id: '1', description: 'Session Fee', due: '3300', paid: '3300' },
        { id: '2', description: 'Development Fee', due: '800', paid: '800' },
        { id: '3', description: 'Tuition Fee', due: '1300', paid: '1300' },
        { id: '4', description: 'MISC Fee', due: '2500', paid: '2500' },
    ];

    const renderRow = ({ item }) => (
        <View style={styles.tablerow}>
            <Text style={styles.slcell}>{item.id}</Text>
            <Text style={styles.cell}>{item.description}</Text>
            <Text style={styles.cell}>{item.due}</Text>
            <Text style={styles.cell}>{item.paid}</Text>
        </View>
    );

    useEffect(() => {
        const fetchGetSyllabus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                // const studentId = await AsyncStorage.getItem('student_id');
                const response = await axios.post(
                    `${BASE_URL}/api/StudentPaidReceipt/GetStudentPaidReceipt`,
                    {
                        FEESCOLLECTIONID: "5252"
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }

                );
                console.log(response.data.List, "Fee paid details receipt")
                setFeePaymentData(response.data.List)
            } catch (error) {
                console.error('Error fetching student details:', error);
                // setLoading(false);
            }
        };

        fetchGetSyllabus();
    }, []);
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle-outline" size={24} color="#ffffff" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                    <Ionicons name="download" size={24} color="#ffffff" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>

                {feePaymentData ? (<View style={styles.receiptContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/images/TIG-logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.logoText}>Techno India School
                            {/* SCM_SCHOOLNAME */}
                        </Text>
                    </View>
                    <View style={styles.feeReceiptHeader}>
                        <Text style={styles.feeReceiptText}> Fee Receipt for Session: 2024-2025</Text>
                    </View>
                    <View style={styles.feeReceiptDetails}>
                        <View style={styles.leftColumn}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Student Name : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData.length > 0 ? feePaymentData[0].SD_StudentName : 'NA'}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Class : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData.length > 0 ? feePaymentData[0].CM_CLASSNAME : 'NA'}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Installment : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData.length > 0 ? feePaymentData[0].INSTALLMENT : 'NA'}

                                </Text>
                            </View>

                        </View>
                        <View style={styles.rightColumn}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Receipt No : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData.length > 0 ? feePaymentData[0].RECIPTNO : 'NA'}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Adm No. : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData.length > 0 ? feePaymentData[0].ADMISSIONID : 'NA'}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Date : </Text>
                                <Text style={styles.value}>
                                {feePaymentData.length > 0 ? feePaymentData[0].FEESDATE.split(' ')[0] : 'NA'}
                                </Text>
                            </View>


                        </View>
                    </View>

                    {/*table */}

                    <View style={styles.tableheader}>
                        <Text style={styles.headerText}>Sl. No.</Text>
                        <Text style={styles.headerText}>Description</Text>
                        <Text style={styles.headerText}>Due</Text>
                        <Text style={styles.headerText}>Paid</Text>
                    </View>
                    <FlatList
                        data={tableData}
                        renderItem={renderRow}
                        keyExtractor={(item) => item.id}
                    />
                    {/* table */}

                    <View style={styles.feeReceiptHeader}>
                        <Text style={styles.feeReceiptText}> Pay Mode Information </Text>
                    </View>
                    <View style={styles.feeReceiptDetails}>
                        <View style={styles.leftColumn}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Pay Mode : </Text>
                                <Text style={styles.value}> 
                                {feePaymentData.length > 0 ? feePaymentData[0].PAYMODE : 'NA'}

                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Bank : </Text>
                                <Text style={styles.value}>
                                {feePaymentData.length > 0 ? feePaymentData[0].BANKNAME : 'NA'}

                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Cheque No. : </Text>
                                {feePaymentData.length > 0 ? feePaymentData[0].CHQNO : 'NA'}
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Total : </Text>
                                <Text style={styles.value}>
                                {feePaymentData.length > 0 ? feePaymentData[0].PAIDAMOUNT : 'NA'}

                                </Text>
                            </View>

                        </View>
                        <View style={styles.rightColumn}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Date : </Text>
                                <Text style={styles.value}>
                                {feePaymentData.length > 0 ? feePaymentData[0].FEESDATE.split('') [0] : 'NA'}
                                </Text>
                            </View>
                        </View>
                    </View>


                </View>)
                    :
                    (
                        <Text>No data</Text>
                    )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: { flex: 1, backgroundColor: 'white', padding: 5 },
    logoContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 },
    logo: { width: 110, height: 110 },
    logoText: { fontSize: 20, color: '#005faf', fontWeight: 'bold' },
    feeReceiptHeader: { backgroundColor: '#cce8ff', alignItems: 'center', padding: 7, },
    feeReceiptText: { fontSize: 16, color: '#005faf', fontWeight: 'bold' },
    feeReceiptDetails: { flexDirection: 'row', justifyContent: 'space-between', padding: 7 },
    leftColumn: { width: '45%' },
    rightColumn: { width: '45%' },
    row: { flexDirection: 'row', marginVertical: 8, },
    label: { fontWeight: 'bold', fontSize: 16, color: '#333' },
    value: { fontSize: 14, color: '#333' },
    header: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#005faf', padding: 5 },
    headerButton: { padding: 10, backgroundColor: '#005faf', borderRadius: 5 },
    buttonText: { color: 'white' },
    receiptContainer: { marginTop: 20 },
    receiptText: { fontSize: 16, marginVertical: 5 },

    tablecontainer: {
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    tableheader: {
        flexDirection: 'row',
        backgroundColor: '#cce8ff',
        padding: 10,
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        color: '#005faf',
        textAlign: 'center',
    },

    tablerow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
    },
    slcell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold'
    },
});

export default PaymentDetailsPage;