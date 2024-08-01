import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/Colors';

const LayoutBottom = ({ children }) => {
  return (
    <View style={styles.footer}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    paddingVertical: 5
  }
});

export default LayoutBottom;
