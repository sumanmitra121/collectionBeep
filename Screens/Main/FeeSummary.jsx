import React, { useRef } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import NavComponent from '../Components/Nav'
import Ionicons from 'react-native-vector-icons/Ionicons';

const FeeSummaryScreen = () => {
    const scrollViewRef = useRef(null);
    const scrollToBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };
    const dueAmount = 26300
    const paidAmount = 26300

    const balance = dueAmount - paidAmount;
    return (
        <><NavComponent />
            <ScrollView ref={scrollViewRef} style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Ionicons name="alert-circle" size={24} color="red" />
                        <Text style={styles.label}>Due</Text>
                        <Text style={styles.amount}>₹{dueAmount}</Text>
                    </View>
                    <Text style={styles.operator}>-</Text>
                    <View style={styles.item}>
                        <Ionicons name="checkmark-circle" size={24} color="green" />
                        <Text style={styles.label}>Paid</Text>
                        <Text style={styles.amount}>₹{paidAmount}</Text>
                    </View>
                    <Text style={styles.operator}>=</Text>
                    <View style={styles.item}>
                        <Ionicons name="wallet" size={24} color="#005faf" />
                        <Text style={styles.label}>Balance</Text>
                        <Text style={styles.balance}>₹{balance}</Text>
                    </View>
                </View>
                <View style={styles.feeDetailsContainer}>
                    <View style={styles.monthHighlight}>
                        <Text style={styles.monthHeading}>April</Text>                    
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Session Fee:</Text>
                        <Text style={styles.amount}> ₹3300</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Development Fee:</Text>
                        <Text style={styles.amount}>₹800</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Tuition Fee:</Text>
                        <Text style={styles.amount}>₹1300</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Misc Fee:</Text>
                        <Text style={styles.amount}>₹2500</Text>
                    </View>

                    <View style={styles.cont}>
                        <View style={styles.item}>
                            <Ionicons name="cash" size={24} color="#FF9800" />
                            <Text style={styles.label}>Total</Text>
                            <Text style={styles.amount}>₹{dueAmount}</Text>
                        </View>
                        <Text style={styles.operator}>-</Text>
                        <View style={styles.item}>
                            <Ionicons name="checkmark-circle" size={24} color="green" />
                            <Text style={styles.label}>Paid</Text>
                            <Text style={styles.amount}>₹{paidAmount}</Text>
                        </View>
                        <Text style={styles.operator}>=</Text>
                        <View style={styles.item}>
                            <Ionicons name="wallet" size={24} color="#005faf" />
                            <Text style={styles.label}>Balance</Text>
                            <Text style={styles.balance}>₹{balance}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.feeDetailsContainer}>
                    <View style={styles.monthHighlight}>
                        <Text style={styles.monthHeading}>May</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Tuition Fee:</Text>
                        <Text style={styles.amount}>₹1300</Text>
                    </View>

                    <View style={styles.cont}>
                        <View style={styles.item}>
                            <Ionicons name="cash" size={24} color="#FF9800" />
                            <Text style={styles.label}>Total</Text>
                            <Text style={styles.amount}>₹{dueAmount}</Text>
                        </View>
                        <Text style={styles.operator}>-</Text>
                        <View style={styles.item}>
                            <Ionicons name="checkmark-circle" size={24} color="green" />
                            <Text style={styles.label}>Paid</Text>
                            <Text style={styles.amount}>₹{paidAmount}</Text>
                        </View>
                        <Text style={styles.operator}>=</Text>
                        <View style={styles.item}>
                            <Ionicons name="wallet" size={24} color="#005faf" />
                            <Text style={styles.label}>Balance</Text>
                            <Text style={styles.balance}>₹{balance}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.feeDetailsContainer}>
                    <View style={styles.monthHighlight}>
                        <Text style={styles.monthHeading}>June</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Tuition Fee:</Text>
                        <Text style={styles.amount}>₹1300</Text>
                    </View>

                    <View style={styles.cont}>
                        <View style={styles.item}>
                            <Ionicons name="cash" size={24} color="#FF9800" />
                            <Text style={styles.label}>Total</Text>
                            <Text style={styles.amount}>₹{dueAmount}</Text>
                        </View>
                        <Text style={styles.operator}>-</Text>
                        <View style={styles.item}>
                            <Ionicons name="checkmark-circle" size={24} color="green" />
                            <Text style={styles.label}>Paid</Text>
                            <Text style={styles.amount}>₹{paidAmount}</Text>
                        </View>
                        <Text style={styles.operator}>=</Text>
                        <View style={styles.item}>
                            <Ionicons name="wallet" size={24} color="#005faf" />
                            <Text style={styles.label}>Balance</Text>
                            <Text style={styles.balance}>₹{balance}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.feeDetailsContainer}>
                    <View style={styles.monthHighlight}>
                        <Text style={styles.monthHeading}>July</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Tuition Fee:</Text>
                        <Text style={styles.amount}>₹1300</Text>
                    </View>

                    <View style={styles.cont}>
                        <View style={styles.item}>
                            <Ionicons name="cash" size={24} color="#FF9800" />
                            <Text style={styles.label}>Total</Text>
                            <Text style={styles.amount}>₹{dueAmount}</Text>
                        </View>
                        <Text style={styles.operator}>-</Text>
                        <View style={styles.item}>
                            <Ionicons name="checkmark-circle" size={24} color="green" />
                            <Text style={styles.label}>Paid</Text>
                            <Text style={styles.amount}>₹{paidAmount}</Text>
                        </View>
                        <Text style={styles.operator}>=</Text>
                        <View style={styles.item}>
                            <Ionicons name="wallet" size={24} color="#005faf" />
                            <Text style={styles.label}>Balance</Text>
                            <Text style={styles.balance}>₹{balance}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.feeDetailsContainer}>
                    <View style={styles.monthHighlight}>
                        <Text style={styles.monthHeading}>August</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Tuition Fee:</Text>
                        <Text style={styles.amount}>₹1300</Text>
                    </View>

                    <View style={styles.cont}>
                        <View style={styles.item}>
                            <Ionicons name="cash" size={24} color="#FF9800" />
                            <Text style={styles.label}>Total</Text>
                            <Text style={styles.amount}>₹{dueAmount}</Text>
                        </View>
                        <Text style={styles.operator}>-</Text>
                        <View style={styles.item}>
                            <Ionicons name="checkmark-circle" size={24} color="green" />
                            <Text style={styles.label}>Paid</Text>
                            <Text style={styles.amount}>₹{paidAmount}</Text>
                        </View>
                        <Text style={styles.operator}>=</Text>
                        <View style={styles.item}>
                            <Ionicons name="wallet" size={24} color="#005faf" />
                            <Text style={styles.label}>Balance</Text>
                            <Text style={styles.balance}>₹{balance}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.feeDetailsContainer}>
                    <View style={styles.monthHighlight}>
                        <Text style={styles.monthHeading}>September</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Tuition Fee:</Text>
                        <Text style={styles.amount}>₹1300</Text>
                    </View>

                    <View style={styles.cont}>
                        <View style={styles.item}>
                            <Ionicons name="cash" size={24} color="#FF9800" />
                            <Text style={styles.label}>Total</Text>
                            <Text style={styles.amount}>₹{dueAmount}</Text>
                        </View>
                        <Text style={styles.operator}>-</Text>
                        <View style={styles.item}>
                            <Ionicons name="checkmark-circle" size={24} color="green" />
                            <Text style={styles.label}>Paid</Text>
                            <Text style={styles.amount}>₹{paidAmount}</Text>
                        </View>
                        <Text style={styles.operator}>=</Text>
                        <View style={styles.item}>
                            <Ionicons name="wallet" size={24} color="#005faf" />
                            <Text style={styles.label}>Balance</Text>
                            <Text style={styles.balance}>₹{balance}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.feeDetailsContainer}>
                    <View style={styles.monthHighlight}>
                        <Text style={styles.monthHeading}>October</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Tuition Fee:</Text>
                        <Text style={styles.amount}>₹1300</Text>
                    </View>

                    <View style={styles.cont}>
                        <View style={styles.item}>
                            <Ionicons name="cash" size={24} color="#FF9800" />
                            <Text style={styles.label}>Total</Text>
                            <Text style={styles.amount}>₹{dueAmount}</Text>
                        </View>
                        <Text style={styles.operator}>-</Text>
                        <View style={styles.item}>
                            <Ionicons name="checkmark-circle" size={24} color="green" />
                            <Text style={styles.label}>Paid</Text>
                            <Text style={styles.amount}>₹{paidAmount}</Text>
                        </View>
                        <Text style={styles.operator}>=</Text>
                        <View style={styles.item}>
                            <Ionicons name="wallet" size={24} color="#005faf" />
                            <Text style={styles.label}>Balance</Text>
                            <Text style={styles.balance}>₹{balance}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.floatingButton} onPress={scrollToBottom}>
                <Ionicons name="chevron-down-outline" size={30} color="#fff" />
            </TouchableOpacity>
        </>
    );
}
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f4f7',
        borderRadius: 10,
        padding: 10,
        margin: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },

    cont: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f4f7',
        borderRadius: 10,
        padding: 10,
        // margin: 10,

    },

    item: {
        flex: 1,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        color: '#555',
    },

    balance: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#005faf',
    },
    operator: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 4,
    },
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
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15, 
    },
    monthHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff', 
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

    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#005faf',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
});

export default FeeSummaryScreen
