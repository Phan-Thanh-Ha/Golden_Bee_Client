import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../styles/Colors';
import {PropTypes} from 'prop-types';

const LayoutBottom = ({children}) => {
  return <View style={styles.footer}>{children}</View>;
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    paddingVertical: 5,
  },
});
LayoutBottom.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LayoutBottom;
