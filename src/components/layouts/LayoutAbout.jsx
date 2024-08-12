import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MainStyle from '../../styles/MainStyle';
import {colors} from '../../styles/Colors';
import {PropTypes} from 'prop-types';

const LayoutAbout = ({children}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.WHITE, colors.WHITE]}
        style={styles.gradient}
      />
      <SafeAreaView style={MainStyle.safeArea}>{children}</SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  decorationBox: {
    position: 'absolute',
    bottom: 0,
    left: -30,
    right: -400,
    height: 550,
    backgroundColor: '#FFC700',
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 0,
    borderTopEndRadius: 500,
    borderTopStartRadius: 500,
  },
});
LayoutAbout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LayoutAbout;
