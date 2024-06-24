import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { gif_bee_flying } from '../assets';

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
    width: 80,
    height: 80,
  },
});

export default BeeFlying;