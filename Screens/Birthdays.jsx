import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import NavComponent from './Components/Nav'
import LinearGradient from 'react-native-linear-gradient';

const BirthdaysScreen = () => {
    return (
        <>
            <NavComponent />
            <ScrollView style={Style.scrollView}>
                <View style={Style.menuContainer}>
                    {/* <Text style={Style.date}>08 November,Friday</Text> */}
                    <LinearGradient
                        colors={['#005faf', '#00b4d8']}
                        style={Style.menuItem}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Image source={require('./Main/assets/balloon.png')} style={Style.icon} />
                        <Text style={Style.title}> Today Birthdays </Text>
                        <Text style={Style.title2}> 10 Birthday today </Text>
                    </LinearGradient>

                </View>

                <View style={Style.listSection}>
                    <View style={Style.menuContainer}>
                        <LinearGradient
                            colors={['#80c6ff', '#b3f2ff']}
                            style={Style.listContainer}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={Style.imageCont}>
                                <Image source={require('./Main/assets/student1.jpg')} style={Style.icon} />
                            </View>
                            <Text style={Style.birthdayDetailsName}>Ditipriya Saha</Text>
                            {/* <Text style={Style.birthdayDetailsName}>Nursery</Text> */}

                        </LinearGradient>
                    </View>

                    <View style={Style.menuContainer}>
                        <LinearGradient
                            colors={['#80c6ff', '#b3f2ff']}
                            style={Style.listContainer}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={Style.imageCont}>
                                <Image source={require('./Main/assets/student1.jpg')} style={Style.icon} />
                            </View>
                            <Text style={Style.birthdayDetailsName}>Ditipriya Saha</Text>
                            {/* <Text style={Style.birthdayDetailsName}>Nursery</Text> */}

                        </LinearGradient>
                    </View>

                    <View style={Style.menuContainer}>
                        <LinearGradient
                            colors={['#80c6ff', '#b3f2ff']}
                            style={Style.listContainer}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={Style.imageCont}>
                                <Image source={require('./Main/assets/student1.jpg')} style={Style.icon} />
                            </View>
                            <Text style={Style.birthdayDetailsName}>Ditipriya Saha</Text>
                            {/* <Text style={Style.birthdayDetailsName}>Nursery</Text> */}

                        </LinearGradient>
                    </View>

                    <View style={Style.menuContainer}>
                        <LinearGradient
                            colors={['#80c6ff', '#b3f2ff']}
                            style={Style.listContainer}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={Style.imageCont}>
                                <Image source={require('./Main/assets/student1.jpg')} style={Style.icon} />
                            </View>
                            <Text style={Style.birthdayDetailsName}>Ditipriya Saha</Text>
                            {/* <Text style={Style.birthdayDetailsName}>Nursery</Text> */}

                        </LinearGradient>
                    </View>


                    <View style={Style.menuContainer}>
                        <LinearGradient
                            colors={['#80c6ff', '#b3f2ff']}
                            style={Style.listContainer}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={Style.imageCont}>
                                <Image source={require('./Main/assets/student1.jpg')} style={Style.icon} />
                            </View>
                            <Text style={Style.birthdayDetailsName}>Ditipriya Saha</Text>
                            {/* <Text style={Style.birthdayDetailsName}>Nursery</Text> */}

                        </LinearGradient>
                    </View>


                    <View style={Style.menuContainer}>
                        <LinearGradient
                            colors={['#80c6ff', '#b3f2ff']}
                            style={Style.listContainer}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={Style.imageCont}>
                                <Image source={require('./Main/assets/student1.jpg')} style={Style.icon} />
                            </View>
                            <Text style={Style.birthdayDetailsName}>Ditipriya Saha</Text>
                            {/* <Text style={Style.birthdayDetailsName}>Nursery</Text> */}

                        </LinearGradient>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const Style = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Poppins-Regular',
        paddingLeft: 10
    },
    menuContainer: {
        padding: 10
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        borderRadius: 15,
    },
    icon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius:30
    },
    title: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Poppins-Regular',
    },
    title2: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 90,
        borderRadius: 15,
        backgroundColor: '#b3ddff'
    },
    imageCont:{
        marginLeft:5,
        height:70,
        width:70,
        backgroundColor:'#005faf',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    birthdayDetailsName: {
        marginLeft:5,
        fontSize: 16,
        color: '#000',
        fontFamily: 'Poppins-Regular',
    },
})
export default BirthdaysScreen
