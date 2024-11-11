import React, { useEffect, useState, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./Config/config";
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import axios from "axios";
const PaymentDetailsPage = ({ navigation }) => {
    const containerRef = useRef(null);

    const [feePaymentData, setFeePaymentData] = useState([])

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
                console.log(response.data.Data, "Fee paid details receipt")
                setFeePaymentData(response.data.Data)
            } catch (error) {
                console.error('Error fetching student details:', error);
                // setLoading(false);
            }
        };

        fetchGetSyllabus();
    }, []);

    const tableData = feePaymentData?.StudentPaidReceiptFeesHeadList
    ? feePaymentData.StudentPaidReceiptFeesHeadList.map((item, index) => ({
        id: (index + 1).toString(),
        description: item.FEM_FEESNAME,
        due: item.INSTALMENTAMOUNT ? item.INSTALMENTAMOUNT.toString() : 'NA',
        paid: item.PYMENTAMOUNT ? item.PYMENTAMOUNT.toString() : 'NA'
    }))
    : []; // Return an empty array if undefined
    const renderRow = ({ item }) => (
        <View style={styles.tablerow}>
            <Text style={styles.slcell}>{item.id}</Text>
            <Text style={styles.cell}>{item.description}</Text>
            <Text style={styles.cell}>{item.due}</Text>
            <Text style={styles.cell}>{item.paid}</Text>
        </View>
    );

    const handleDownload = async () => {
        if (containerRef.current) {
            // Capture the container section as an image
            const uri = await containerRef.current.capture();
            const filePath = `${RNFS.DownloadDirectoryPath}/container_screenshot.png`;

            try {
                // Save the image to the device's download directory
                await RNFS.moveFile(uri, filePath);
                alert('Download completed! Check your Downloads folder.');
            } catch (error) {
                console.error('Error saving file:', error);
                alert('Failed to download file.');
            }
        }
    };
    return (
        // <Text>abc</Text>
        <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle-outline" size={24} color="#ffffff" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton} onPress={handleDownload}>
                    <Ionicons name="download" size={24} color="#ffffff" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <ViewShot ref={containerRef} options={{ format: 'png', quality: 0.9 }}>
            <View style={styles.container}>

                {feePaymentData ? (<View style={styles.receiptContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/images/TIG-logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.logoText}>
                            {feePaymentData && feePaymentData.SCM_SCHOOLNAME ? feePaymentData.SCM_SCHOOLNAME : 'NA'}
                        </Text>
                        {/*  */}

                    </View>
                    <View style={styles.feeReceiptHeader}>
                        <Text style={styles.feeReceiptText}> Fee Receipt for Session:
                            {feePaymentData.SM_SESSIONNAME ? feePaymentData.SM_SESSIONNAME : "NA"}</Text>
                    </View>
                    <View style={styles.feeReceiptDetails}>
                        <View style={styles.leftColumn}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Student Name : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData.STUDENT_NAME ? feePaymentData.STUDENT_NAME : 'NA'}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Class : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData && feePaymentData.CM_CLASSNAME ? feePaymentData.CM_CLASSNAME : 'NA'}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Installment : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData && feePaymentData.INSTALLMENT ? feePaymentData.INSTALLMENT : 'NA'}

                                </Text>
                            </View>

                        </View>
                        <View style={styles.rightColumn}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Receipt No : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData && feePaymentData.RECIPTNO ? feePaymentData.RECIPTNO : 'NA'}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Adm No. : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData && feePaymentData.ADMISSIONID ? feePaymentData.ADMISSIONID : 'NA'}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Date : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData && feePaymentData.FEESDATE ? feePaymentData.FEESDATE.split(' ')[0] : 'NA'}
                                </Text>
                            </View>


                        </View>
                    </View>
                    {/* table */}
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
                                    {feePaymentData && feePaymentData.PAYMODE ? feePaymentData.PAYMODE : 'NA'}

                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Bank : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData && feePaymentData.BANKNAME ? feePaymentData.BANKNAME : 'NA'}

                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Cheque No. : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData && feePaymentData.CHQNO ? feePaymentData.CHQNO : 'NA'}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Total : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData && feePaymentData.TOTALFEESDUEAMOUNT ? feePaymentData.TOTALFEESDUEAMOUNT : 'NA'}
                                </Text>
                            </View>

                        </View>
                        <View style={styles.rightColumn}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Date : </Text>
                                <Text style={styles.value}>
                                    {feePaymentData && feePaymentData.FEESDATE ? feePaymentData.FEESDATE.split(' ')[0] : 'NA'}
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
            </ViewShot>
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