import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const AttendanceProgressBar = ({ percentage }) => {
  const radius = 50; 
  const strokeWidth = 8; 
  const center = radius + strokeWidth; 
  const circumference = 2 * Math.PI * radius; 
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg height={center * 2} width={center * 2}>
        <G rotation="-90" origin={center}>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#005faf" 
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </G>
      </Svg>
      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  percentageText: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: 'Poppins-regular',
    color: '#333',
  },
});

export default AttendanceProgressBar;
