import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList, Button, Modal, TouchableOpacity, Image, } from 'react-native'
import NavComponent from './Components/Nav'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './Config/config';


const ExamReportScreen = () => {
  const [examData, setExamData] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
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
        console.log(response.data.Data, 'GetStudentMarksheet')
        setStudentDetails(response.data.Data, 'setStudentDetails')
        setExamData(response.data.Data.StudentMarksheetHeadList || [])
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    FetchMarksheet();
  }, []);
  const uniqueTerms = [...new Set(examData.map(item => item.TERM_NAME))];

  const handleShowResult = (term) => {
    console.log(`Showing results for ${term}`);
    const result = examData.filter((item) => item.TERM_NAME === term)
    console.log(result, 'result')
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
        <View style={styles.topSection}>
          <Image source={require('./Main/assets/examresults.png')} style={styles.examLogo} />

        </View>
        <FlatList
          data={uniqueTerms}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.menuContainer}>
              <LinearGradient colors={['#005faf', '#00b4d8']}
                style={styles.menuItem}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Image source={require('./Main/assets/test.png')} style={styles.icon} />
                {/* <Text style={styles.examName}>{item}</Text> */}
                <Text style={styles.examName}>{studentDetails.TERM_NAME}</Text>

                <TouchableOpacity onPress={() => handleShowResult(item)}>
                  <Ionicons name="chevron-forward-circle-outline" size={30} color="#fff" />
                </TouchableOpacity>
              </LinearGradient>
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
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-circle-outline" size={30} color="#005faf" />
                </TouchableOpacity>
                <View style={styles.headerCard}>

                  <Text style={styles.modalTitle}>Marksheet of {studentDetails?.TERM_NAME}</Text>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}> Student Name:</Text>
                    <Text style={styles.infoText}> {studentDetails?.STUDENT_NAME}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Class: </Text>
                    <Text style={styles.infoText}> {studentDetails?.CLASS_NAME}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Session: </Text>
                    <Text style={styles.infoText}> {studentDetails?.SESSIONNAME}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Term: </Text>
                    <Text style={styles.infoText}> {studentDetails?.TERM_NAME}</Text>
                  </View>
                </View>

                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Subject</Text>
                  <Text style={styles.tableHeaderText}>Marks Obtained</Text>
                  <Text style={styles.tableHeaderText}>Full Marks</Text>
                  <Text style={styles.tableHeaderText}>Pass Marks</Text>
                </View>

                {/* Table Rows for Each Subject */}
                {selectedResult.map((subject, index) => (
                  <View key={`${subject.SUBJECT_NAME}-${index}`} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{subject.SUBJECT_NAME}</Text>
                    <Text style={styles.tableCell}>{subject.MARKS_OBTAINED}</Text>
                    <Text style={styles.tableCell}>{subject.FULL_MARKS}</Text>
                    <Text style={styles.tableCell}>{subject.PASS_MARKS}</Text>
                  </View>
                ))}

                <View style={styles.footer}>
                  <TouchableOpacity onPress={() => handleShare(studentDetails)}>
                    <Ionicons name="share-social" size={24} color="#005faf" />
                  </TouchableOpacity>
                </View>

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
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  examLogo: {
    height: 200,
    width: 200,
    resizeMode: 'cover',

  },
  menuContainer: {
    marginVertical: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 80,
    borderRadius: 15,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
    resizeMode: 'contain',
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
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    padding: 40,
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
    position: 'absolute',
    top: 10,
    right: 10,

  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    color: '#555',
  },
  headerCard: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    // justifyContent: "",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

});


export default ExamReportScreen
