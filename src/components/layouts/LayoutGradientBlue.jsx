// Layout gradient xanh dương

import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from "../../styles/Colors";
import StatusBarCustom from '../StatusBarCustom';

const LayoutGradientBlue = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBarCustom />
      <LinearGradient
        colors={[colors.MAIN_BLUE_CLIENT, colors.SECOND_BLUE_CLIENT]}
        style={styles.gradient}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default LayoutGradientBlue;
