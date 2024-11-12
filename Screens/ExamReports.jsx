import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList, Button, Modal, TouchableOpacity } from 'react-native'
import NavComponent from './Components/Nav'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './Config/config';


const ExamReportScreen = () => {
    const [examData, setExamData] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const FetchMarksheet = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const studentId = await AsyncStorage.getItem('student_id')
                const response = await axios.post(
                    `${BASE_URL}/api/StudentMarksheet/GetStudentMarksheet`,
                    {
                        SD_StudentId: studentId,
                        SD_CurrentSessionId: '115',
                        SD_ClassId: '77'
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }

                );
                console.log(response.data.List, 'GetStudentMarksheet')
                setExamData(response.data.List)
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        FetchMarksheet();
    }, []);
    const uniqueTerms = [...new Set(examData.map(item => item.TERM_NAME))];

    const handleShowResult = (term) => {
        console.log(`Showing results for ${term}`);
        const result = examData.find((item) => item.TERM_NAME === term);
        setSelectedResult(result);
        setModalVisible(true);
    };

    return (
        <>
            <NavComponent />
            {/* <View style={Style.container}>
                <View style={Style.menuContainer}>
                    <LinearGradient colors={['#005faf', '#00b4d8']}
                        style={Style.menuItem}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Image source={require('./Main/assets/syllabus_white.png')} style={Style.icon} />
                        <Text style={Style.title}> {syllabusData?.SM_SYLLABUSNAME}</Text>
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
            </View> */}
            <View style={styles.container}>
                <FlatList
                    data={uniqueTerms}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <View style={styles.examItem}>
                            <Text style={styles.examName}>{item}</Text>
                            <Button
                                title="Show Result"
                                onPress={() => handleShowResult(item)}
                            />
                        </View>
                    )}
                />

{selectedResult && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Exam Result</Text>
              
              <Text style={styles.resultText}>Student Name: {selectedResult.STUDENT_NAME}</Text>
              <Text style={styles.resultText}>Class: {selectedResult.CLASS_NAME}</Text>
              <Text style={styles.resultText}>Session: {selectedResult.SESSIONNAME}</Text>
              <Text style={styles.resultText}>Term: {selectedResult.TERM_NAME}</Text>
              <Text style={styles.resultText}>Subject: {selectedResult.SUBJECT_NAME}</Text>
              <Text style={styles.resultText}>Marks Obtained: {selectedResult.MARKS_OBTAINED}</Text>
              <Text style={styles.resultText}>Full Marks: {selectedResult.FULL_MARKS}</Text>
              <Text style={styles.resultText}>Pass Marks: {selectedResult.PASS_MARKS}</Text>

              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
            </View>        
            </>
    )

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      examItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        padding: 12,
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
      },
      examName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
      },
      resultText: {
        fontSize: 16,
        marginVertical: 4,
      },
      closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#005faf',
        borderRadius: 5,
      },
      closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    });


export default ExamReportScreen
