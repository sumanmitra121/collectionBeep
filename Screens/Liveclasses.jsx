import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import NavComponent from './Components/Nav';
import Videodata from './Main/jsonData/VideoData.json'
import Video from 'react-native-video';

const Liveclasses = ({ route }) => {
    useEffect(() => {
        console.log(Videodata, 'Videodata in liveclass')
    })
    const videoItems = ({ item }) => {
        try {
            return (
                <View style={Style.videoContainer}>
                    <Video
                        source={{ uri: item.url }}
                        style={Style.video}
                        controls={true}
                        resizeMode="contain"
                    />
                    <Text style={Style.videoDescription}>{item.description}</Text> 
                </View>
            );
        } catch (error) {
            console.error("Error rendering video: ", error);
            return null;
        }
    };
    return (
        <><NavComponent />
            <View style={Style.container}>
                <View style={Style.header}>
                    <Text style={Style.headerText}>Our Live classes</Text>
                </View>
                <FlatList
                    data={Videodata}
                    renderItem={videoItems}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </>
    );
};

const Style = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
    videoContainer: {
        marginBottom: 10,
        backgroundColor: '#000',
        borderRadius: 10,
        overflow: 'hidden',
    },
    video: {
        height: 130,
        width: '100%',
    },
    videoDescription: {
        color: '#fff', 
        padding: 10, 
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderBottomLeftRadius: 8, 
        borderBottomRightRadius: 8, 
        fontFamily: 'Poppins-Regular',
      },
});

export default Liveclasses;
