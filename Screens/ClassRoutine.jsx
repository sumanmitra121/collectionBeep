import React,{useEffect,useState} from 'react'
import { Text,View, FlatList,TouchableOpacity,StyleSheet,Linking, } from 'react-native'
import NavComponent from './Components/Nav'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './Config/config';
import moment from 'moment';
import CallApi from './services/DbIntrService';
const ClassRoutine = () => {
    const [routineList, setRoutineList] = useState([]);

    useEffect(() => {
        // const fetchGetRoutine = async () => {
        //     try {
        //         const token = await AsyncStorage.getItem('token');
        //         const response = await axios.post(
        //             `${BASE_URL}/api/Routine/GetRoutine`,
        //             {
        //                 CWTR_Class: '51',                    },
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`,
        //                 },
        //             }

        //         );
        //         console.log(response.data.List, "routine")
        //         setRoutineList(response.data.List || []);

        //     } catch (error) {
        //         console.error('Error fetching student details:', error);
        //     }
        // };
        const fetchGetRoutine = async () => {
          const classId = await AsyncStorage.getItem('class_id');

          const payLoad = {CWTR_Class:classId}
          const apiRes = await CallApi(1,'/api/Routine/GetRoutine',payLoad);
          setRoutineList(apiRes?.data?.List || [])
          console.log('Routine Response', apiRes.data.List)
      };

        fetchGetRoutine();
    }, []);

    const openLink = (url) => {
        if (url) {
          Linking.openURL(url).catch((err) =>
            console.error('Error opening link:', err)
          );
        }
      };
      const renderRoutineItem = ({ item }) => {
        const createDate = moment(item.CWTR_CREATEDATE).format('DD MMM');
        return (
          <View style={styles.card}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{createDate}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>
                {item.CWTR_TITLE || 'No Title Available'}
              </Text>
              {item.CWTR_DESCRIPTION ? (
                <Text style={styles.descriptionText}>{item.CWTR_DESCRIPTION}</Text>
              ) : null}
            </View>
            {item.CWTR_UPLOADFILE ? (
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => openLink(item.CWTR_UPLOADFILE)}
              >
                <Text style={styles.linkButtonText}>View</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        );
      };
  return (
    <>
    <NavComponent/>
        <View style={styles.container}>
      <FlatList
        data={routineList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRoutineItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
    </>
  )
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005faf',
  },
  contentContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  linkButton: {
    backgroundColor: '#005faf',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  linkButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default ClassRoutine
