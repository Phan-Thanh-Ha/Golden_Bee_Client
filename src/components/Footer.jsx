import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/Colors';
import { Version_Customer } from '../utils';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{Version_Customer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: colors.GRAY,
    fontSize: 11,
  },
});

export default Footer;
