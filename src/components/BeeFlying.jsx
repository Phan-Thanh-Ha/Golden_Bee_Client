import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { gif_bee_flying } from '../assets';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../styles/MainStyle';

const BeeFlying = () => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.gif}
        source={gif_bee_flying}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.3,
  },
});

export default BeeFlying;