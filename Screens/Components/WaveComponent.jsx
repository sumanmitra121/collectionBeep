import React from 'react';
import { View } from 'react-native';

const Wave = ({ style, color = '#0099ff', flip = false }) => {
  return (
    <View style={style}>
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 1440 320"
        style={{ transform: flip ? [{ rotate: '180deg' }] : [] }}
      >
        <Path
          fill={color}
          d="M0,192L80,186.7C160,181,320,171,480,192C640,213,800,267,960,261.3C1120,256,1280,192,1360,160L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
      </Svg>
    </View>
  );
};

export default Wave;
