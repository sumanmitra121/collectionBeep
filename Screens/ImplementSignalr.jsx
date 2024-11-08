import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SignalR from '@microsoft/signalr';
import 'react-native-url-polyfill/auto'; // Add this line to your entry file

const ImplementSignalrScreen = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        // Create the SignalR connection
        const connection = new SignalR.HubConnectionBuilder()
            .withUrl("https://college.affinityinfosoft.in/dataHub") // Replace with your API URL
            .withAutomaticReconnect()
            .build();

        // Start the connection
        connection.start()
            .then(() => console.log("Connected to SignalR"))
            .catch(error => console.error("Connection failed: ", error));

        // Define event listener for receiving data
        connection.on("ReceiveData", (message) => {
            console.log("Received message:", message);
            setData(message);
        });

        return () => {
            // Clean up connection on unmount
            connection.stop();
        };
    }, []);

    return (
        <View>
            <Text>Data from API: {data}</Text>
        </View>
    );
};

export default ImplementSignalrScreen;