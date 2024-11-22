import React from 'react'
import { Text, View,StyleSheet,Image } from 'react-native'

const ComingSoonScreen = () => {
  return (
        <View style={styles.container}>
                       <Image source={require('../Main/assets/comingSoon.png')} style={styles.comingSoonImg} />
        </View>
  )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
    },
    comingSoonImg:{
        height:200,
        width:200,
        marginTop:120
    }
})

export default ComingSoonScreen
