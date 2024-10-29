import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import NavComponent from '../Components/Nav'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeeDetailsModal from '../Components/FeeDetailsModal';
import { useNavigation } from '@react-navigation/native';

const FeePaidScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <>
            <NavComponent />
            <ScrollView style={styles.scrollView}>
                <View style={styles.feeDetailsContainer}>
                    <View style={styles.monthHighlight}>
                        <Text style={styles.monthHeading}>April</Text>
                        <Text style={styles.dateText}>15/04/2024</Text>

                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Receipt No :</Text>
                        <Text style={styles.amount}> 2480</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Amount :</Text>
                        <Text style={styles.amount}>₹7900</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Pay mode :</Text>
                        <Text style={styles.amount}>Cash</Text>
                    </View>

                    <View style={styles.bottomSec}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaymentDetails')} >
                                <Ionicons name="print-outline" size={20} color="#ffffff" style={styles.icon} />
                                <Text style={styles.buttonText}>Print</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={()=> setModalVisible(true)}>
                                <Ionicons name="list-outline" size={20} color="#ffffff" style={styles.icon} />
                                <Text style={styles.buttonText}>Details</Text>
                            </TouchableOpacity>
                        <FeeDetailsModal visible={modalVisible} onClose={() => setModalVisible(false)}/>
                        </View>
                    </View>
                </View>

                <View style={styles.feeDetailsContainer}>
                    <View style={styles.monthHighlight}>
                        <Text style={styles.monthHeading}>May-March</Text>
                        <Text style={styles.dateText}>10/05/2024</Text>

                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Receipt No :</Text>
                        <Text style={styles.amount}> 4872</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Amount :</Text>
                        <Text style={styles.amount}>₹18400</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Pay mode :</Text>
                        <Text style={styles.amount}>Cash</Text>
                    </View>

                    <View style={styles.bottomSec}>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} >
                                <Ionicons name="print-outline" size={20} color="#ffffff" style={styles.icon} />
                                <Text style={styles.buttonText}>Print</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} >
                                <Ionicons name="list-outline" size={20} color="#ffffff" style={styles.icon} />
                                <Text style={styles.buttonText}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    feeDetailsContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation: 2,
        paddingVertical: 10,
    },
    monthHighlight: {
        backgroundColor: '#005faf',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    monthHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    dateText: {
        fontSize: 16,
        color: 'white',
    },
    feeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,

    },
    feeLabel: {
        fontSize: 16,
        color: '#333',
    },
    amount: {
        fontWeight: 'bold',
        color: '#005faf',
    },

    bottomSec: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#cce8ff',
        borderRadius: 5,
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#005faf',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },

})

export default FeePaidScreen
