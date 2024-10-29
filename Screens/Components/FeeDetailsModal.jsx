import React from "react";
import { Text, View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const FeeDetailsModal = ({ visible, onClose }) => {
    const fees = [
        { head: 'Development Fee', amount: 800 },
        { head: 'Session Fee', amount: 3300 },
        { head: 'Tuition Fee', amount: 1300 },
        { head: 'Tuition Fee', amount: 1300 },
        { head: 'Tuition Fee', amount: 1300 },
        { head: 'Tuition Fee', amount: 1300 },
        { head: 'Tuition Fee', amount: 1300 },
        { head: 'Tuition Fee', amount: 1300 },
        { head: 'Tuition Fee', amount: 1300 },
        { head: 'Tuition Fee', amount: 1300 },
        { head: 'Tuition Fee', amount: 1300 },
        { head: 'Tuition Fee', amount: 1300 },
        { head: 'Tuition Fee', amount: 1300 },




    ]
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide">
            <View style={styles.modalOverlay}>

                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close-circle" size={30} color="#005faf" />
                    </TouchableOpacity>

                    <View style={styles.headerRow}>
                        <Text style={styles.headerText}>Head</Text>
                        <Text style={styles.headerText}>Amount</Text>
                    </View>
                    {fees.map((fee, index) => (
                        <View key={index} style={styles.feeRow}>
                            <Text style={styles.feeText}>{fee.head}</Text>
                            <Text style={styles.feeText}>{fee.amount}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#005faf',
    },
    feeRow: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 5,
    },
    feeText: {
        fontSize: 16,
        color: '#333',
    },
});

export default FeeDetailsModal
