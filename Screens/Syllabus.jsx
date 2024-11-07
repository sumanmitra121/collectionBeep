import React,{useEffect,useState} from 'react'
import { View, StyleSheet, Text, TouchableOpacity,Linking,Image,Alert } from 'react-native'
import NavComponent from './Components/Nav'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './Config/config';
import RNFS from 'react-native-fs';
import { Snackbar } from 'react-native-paper';
import FileViewer from 'react-native-file-viewer';

const SyllabusScreen = () => {
    const [syllabusData, setSyllabusData] = useState(null);
    const [path, setDownloadPath] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    useEffect(() => {
        const fetchGetSyllabus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const studentId = await AsyncStorage.getItem('student_id');
                // if (!token || !studentId) {
                //   console.error('Token or student ID not found in storage');
                //   return;
                // }
                const response = await axios.post(
                    `${BASE_URL}/api/Syllabus/GetSyllabus`,
                    {
                        SD_STUDENTID: studentId,
                        SD_CurrentSessionId: '115'
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }

                );
                console.log(response.data.List[0], "syllabus")
                setSyllabusData(response.data.List[0])
            } catch (error) {
                console.error('Error fetching student details:', error);
                // setLoading(false);
            }
        };

        fetchGetSyllabus();
    }, []);

    const downloadPdf = async () => {
        // if (syllabusData?.SM_UploadFile) {
        //     Linking.openURL(syllabusData.SM_UploadFile);
        // } else {
        //     alert('No file URL available');
        // }

        if (syllabusData?.SM_UploadFile) {
            const downloadPath = `${RNFS.DownloadDirectoryPath}/${syllabusData.SM_SyllabusName}.pdf`;
            
            try {
                const result = await RNFS.downloadFile({
                    fromUrl: syllabusData.SM_UploadFile,
                    toFile: downloadPath,
                }).promise;

                if (result.statusCode === 200) {
                    setSnackbarVisible(true)
                    setDownloadPath(downloadPath);

                } else {
                    Alert.alert('Download Failed', 'Unable to download file.');
                }
            } catch (error) {
                console.error('Download error:', error);
                Alert.alert('Error', 'An error occurred while downloading the file.');
            }
        } else {
            Alert.alert('No file URL available');
        }
    };

    const handleViewFile = async () => {
        if (path) {
            try {
                await FileViewer.open(path); // Opens the file using the appropriate app
            } catch (error) {
                console.error('File viewing error:', error);
                Alert.alert('Error', 'Unable to open file.');
            }
        } else {
            Alert.alert('Error', 'No file available to view.');
        }
    };
    return (
        <>
            <NavComponent />
            <View style={Style.container}>
                <View style={Style.menuContainer}>
                    <LinearGradient colors={['#005faf', '#00b4d8']}
                        style={Style.menuItem}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Image source={require('./Main/assets/syllabus_white.png')} style={Style.icon} />
                        <Text style={Style.title}> {syllabusData?.SM_SyllabusName}</Text>
                        <TouchableOpacity onPress={downloadPdf}>
                            <Ionicons name="download-outline" size={30} color="#fff" style={Style.nextIcon} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                action={{
                    label: 'View',
                    onPress: handleViewFile,
                }}
            >
                Download completed!
            </Snackbar>
            </View>
        </>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    text: {
        padding: 20,
        fontSize: 20
    },
    text2: {
        fontSize: 24,
        fontWeight: 'bold',
        // padding:10,
        paddingLeft: 30
    },
    menuContainer: {
        marginVertical: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 90,
        borderRadius: 15,
    },
    icon: {
        width: 45,
        height: 50,
        marginRight: 15,
        resizeMode: 'contain',
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Poppins-Regular',

    },
})

export default SyllabusScreen
