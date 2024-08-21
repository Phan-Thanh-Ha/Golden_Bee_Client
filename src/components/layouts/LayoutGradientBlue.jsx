// Layout gradient xanh dương

import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarCustom from '../StatusBarCustom';
import { PropTypes } from 'prop-types';
import { themeColors } from '../../styles/Colors';

const LayoutGradientBlue = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBarCustom />
      <LinearGradient
        colors={[themeColors.background, themeColors.lightBackground]}
        style={styles.gradient}
      />
      {children}
    </View>
  );
};
LayoutGradientBlue.propTypes = {
  children: PropTypes.node.isRequired,
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
