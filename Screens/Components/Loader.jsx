import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLoader } from '../Contexts/LoaderProvider';

const Loader = () => {

    const { isLoading, loaderText } = useLoader();
    if (!isLoading) return null;
    return (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#005faf" />
          {loaderText ? <Text style={styles.text}>{loaderText}</Text> : null}
        </View>
      );
}

const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
    },
    text: {
      marginTop: 10,
      color: '#fff',
      fontSize: 16,
    },
  });

export default Loader
