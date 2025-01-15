import React,{useContext} from "react";
import { StyleSheet, TouchableOpacity, Text, View,Modal,Image } from 'react-native';
import { Button } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthGuardContext } from "../Contexts/AuthGuardContext";
const LogOutComponent = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const { isAuthenticated,setIsAuthenticated } = useContext(AuthGuardContext);

  const handleLogout = async () => {
    console.log(isAuthenticated,'isAuthenticated in logout 1')
    setIsAuthenticated(null)
    console.log(isAuthenticated,'isAuthenticated in logout 2')

      navigation.navigate('Auth');
  };
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide">
            <View style={styles.modalOverlay}>

                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close-circle" size={30} color="#005faf" />
                    </TouchableOpacity>
                        <Image source={require('../Main/assets/logout.png')} style={styles.img}/>
                        <Text style={styles.text}>Oh no! Yor're leaving...</Text>
                        <Text style={styles.text}>Are you sure ?</Text>
                        <View style={styles.btnSection}>
                        <TouchableOpacity  onPress={onClose}>
                        <Button style={styles.button1}>
                            <Text style={styles.btnText1}> Nah, Just Kidding </Text>
                        </Button>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout}>
                        <Button style={styles.button2}>
                            <Text style={styles.btnText2}> Yes, Log Me Out </Text>
                        </Button>
                        </TouchableOpacity>
                        </View>
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    img:{
        height:170,
        width:170,
        margin:15,
    },
    text:{
        fontSize:18,
        color:'#005faf',
        fontWeight:'bold'
    },
    btnSection:{
        margin:20
    },
    button1:{
        width:'80%',
        backgroundColor:'#005faf',
        alignSelf:'center',
        margin:20,
        padding:5
    },
    btnText1:{
        color:'#fff',
        alignSelf:'center',
        fontSize:16,    
    },
    button2:{
        width:'80%',
        backgroundColor:'#fff',
        alignSelf:'center',
        padding:5,
        borderStyle:'solid',
        borderColor:'#005faf',
        borderWidth:2
    },
    btnText2:{
        color:'#005faf',
        alignSelf:'center',
        fontSize:16,    
    },

})

export default LogOutComponent