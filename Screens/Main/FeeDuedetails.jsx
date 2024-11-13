import React,{useEffect,useState,useRef} from 'react'
import { View, StyleSheet, Text, TouchableOpacity,Linking,Image,Alert,ScrollView, } from 'react-native'
import NavComponent from '../Components/Nav'

import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './Config/config';
import RazorpayCheckout from 'react-native-razorpay';


const FeeDueDetails = () => {
    const dueAmount = 28300
    const paidAmount = 28299

    const balance = dueAmount - paidAmount;
  
    return (
        <>
            <NavComponent />
            <View style={styles.pageContainer}>
                <View style={styles.container}>
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
                </View>

                <TouchableOpacity style={styles.payNowBtn}
                onPress={() => {
                    console.log('payNowBtn Clicked')
                    var options = {
                    description: 'Credits towards consultation',
                    image: 'https://i.imgur.com/3g7nmJC.jpg',
                    currency: 'INR',
                    key: 'rzp_live_ErHT4bRj0a8WMC',
                    amount: {balance},
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
                    // handle success
                    Alert.alert(`Success: ${data.razorpay_payment_id}`);
                  }).catch((error) => {
                    // handle failure
                    Alert.alert(`Error: ${error.code} | ${error.description}`);
                  });
                }}
                >
                    <Text style={styles.payNowTxt}>Pay Now - ₹{balance}</Text>
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
    payNowBtn:{
        width:'90%',
        height:50,
        borderRadius:10,
        backgroundColor:'green',
        position:'absolute',
        bottom:20,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
    },
    payNowTxt:{
        fontSize:16,
        color:'#fff',
        fontWeight:'600'
    }
})


export default FeeDueDetails
