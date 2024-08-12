import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, themeColors} from '../../styles/Colors';
import React from 'react';
import {PropTypes} from 'prop-types';

const BtnAuth = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.content}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: themeColors.secondary,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: 330,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginRight: 10,
    fontSize: 20,
    color: colors.WHITE,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  icon: {
    marginLeft: 5,
  },
});
BtnAuth.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
};
export default BtnAuth;
