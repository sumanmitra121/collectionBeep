import React,{useEffect,useState,useRef} from 'react'
import { View, StyleSheet, Text, TouchableOpacity,Animated ,Image,Alert,ScrollView,FlatList } from 'react-native'
import NavComponent from '../Components/Nav'

import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import CallApi from '../services/DbIntrService';

const FeeDueDetails = () => {
    const [feeDetails, setFeeDetails] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]); 
    const [dueAmount, setDueAmount] = useState(0);


    const fetchFeeDueDetails = async () => {
        try {
            const studentId = await AsyncStorage.getItem('student_id');
            const payLoad = { "STUDENTID": studentId };
            const apiRes = await CallApi(1, '/api/StudentDueFee/GetStudentDueFee', payLoad);

    
                console.log('GetStudentDueFee:', apiRes.data);

                if (apiRes.data) {
                    const list = apiRes.data.List || [];
                    setFeeDetails(list);
                }
        } catch (error) {
            console.error('Error fetching fee summary:', error);
        }
    };
    const handleCardSelect = (item, isSelected) => {
        let updatedSelectedCards = [...selectedCards];
        
        if (isSelected) {
            updatedSelectedCards = updatedSelectedCards.filter(card => card !== item);
        } else {
            updatedSelectedCards.push(item);
        }

        setSelectedCards(updatedSelectedCards);
        updateDueAmount(updatedSelectedCards);
    };

    const updateDueAmount = (selectedCards) => {
        const totalDue = selectedCards.reduce((sum, item) => sum + item.DUE_AMOUNT, 0);
        setDueAmount(totalDue);
    };

    useEffect(() => {
        fetchFeeDueDetails()
    }, [])



    const renderFeeCard = ({ item }) => {
        const isSelected = selectedCards.includes(item);

        return (
            <View style={styles.cardContainer}>
                <View style={styles.cardHeader}>
                    <Text style={styles.headerText}>{item.FEES_HEAD}</Text>
                </View>
                <View style={styles.cardBody}>
                    <View style={styles.row}>
                        <Ionicons name="cash-outline" size={20} color="#FF9800" />
                        <Text style={styles.label}>Fees Amount:</Text>
                        <Text style={styles.value}>₹{item.PAYABLE_AMOUNT}</Text>
                    </View>
                    <View style={styles.row}>
                        <Ionicons name="alert-circle-outline" size={20} color="#E53935" />
                        <Text style={styles.label}>Due Amount:</Text>
                        <Text style={styles.value}>₹{item.DUE_AMOUNT}</Text>
                    </View>
                    <View style={styles.row}>
                    <Ionicons name="pricetags-outline" size={20} color="#FF9800" />
                        <Text style={styles.label}>Installment Amount:</Text>
                        <Text style={styles.value}>₹{item.INSTALMENT_AMOUNT}</Text>
                    </View>
                    <View style={styles.row}>
                    <Ionicons name="list-outline" size={20} color="#3F51B5" />
                         <Text style={styles.label}>Installment No:</Text>
                        <Text style={styles.value}>{item.INSTALLMENTNO}</Text>
                    </View>
                    <View style={styles.row}>
                        <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
                        <Text style={styles.label}>Due Date:</Text>
                        <Text style={styles.value}>
                        {new Date(item.DUE_DATE).toLocaleDateString('en-GB')}
                        </Text>
                    </View>

                     {/* Toggle selection */}
                     <TouchableOpacity
                        style={[styles.checkbox, isSelected && styles.selectedCheckbox]}
                        onPress={() => handleCardSelect(item, isSelected)}
                    >
                        <Ionicons name={isSelected ? "checkbox" : "checkbox-outline"} size={24} color={isSelected ? "#005faf" : "#333"} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
  
    return (
        <>
            <NavComponent />
            <View style={styles.pageContainer}>
                {/* <View style={styles.container}>
                    <View style={styles.item}>
                        <Ionicons name="cash" size={24} color="#FF9800" />
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
                        <Ionicons name="alert-circle" size={24} color="red" />
                        <Text style={styles.label}>Due</Text>
                        <Text style={styles.dueAmount}>₹{balance}</Text>
                    </View>
                </View> */}

                
                <FlatList
                data={feeDetails}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderFeeCard}
                contentContainerStyle={styles.listContainer}
                />

                <TouchableOpacity style={styles.payNowBtn}
                onPress={() => {
                    console.log('payNowBtn Clicked')
                    var options = {
                    description: 'Credits towards consultation',
                    image: 'https://i.imgur.com/3g7nmJC.jpg',
                    currency: 'INR',
                    key: 'rzp_live_ErHT4bRj0a8WMC',
                    amount: dueAmount * 100,
                    name: 'Acme Corp',
                    order_id: '',
                    prefill: {
                      email: 'gaurav.kumar@example.com',
                      contact: '9191919191',
                      name: 'Gaurav Kumar'
                    },
                    theme: {color: '#53a20e'}
                  }
                  RazorpayCheckout.open(options).then((data) => {
                    Alert.alert(`Success: ${data.razorpay_payment_id}`);
                  }).catch((error) => {
                    Alert.alert(`Error: ${error.code} | ${error.description}`);
                  });
                }}
                >
                    <Text style={styles.payNowTxt}>Pay Now - ₹{dueAmount}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#f0f4f7',
        paddingBottom: 20,
    },
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
    item: {
        flex: 1,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        color: '#555',
    },
    amount: {
        fontWeight: 'bold',
        color: '#005faf',
    },
    dueAmount:{
        color:'red',
        fontWeight: 'bold',

    },

    listContainer: {
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardHeader: {
        backgroundColor: '#005faf',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardBody: {
        marginTop: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        marginLeft: 8,
        fontSize: 14,
        color: '#555',
        flex: 1,
    },
    value: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    selectBtn: {
        position: 'absolute',
        // top: 10,
        // right: 10,
    },
    payNowBtn:{
        width:'90%',
        // height:50,
        borderRadius:10,
        backgroundColor:'green',
        position:'absolute',
        bottom:10,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        padding:15
    },
    payNowTxt:{
        fontSize:16,
        color:'#fff',
        fontWeight:'600'
    }
})


export default FeeDueDetails
