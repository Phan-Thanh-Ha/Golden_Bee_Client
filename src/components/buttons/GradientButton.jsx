import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../styles/Colors';
import ArrowRight from '../svg/ArrowRight';
import {PropTypes} from 'prop-types';

const GradientButton = ({children, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? colors.SUCCESS : colors.PRIMARY_GREEN,
        },
        styles.button,
      ]}>
      <View style={styles.content}>
        <Text style={styles.text}>{children} </Text>
        <ArrowRight color={colors.WHITE} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
  },
  icon: {
    marginLeft: 5,
  },
  arrow: {},
});
GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
};
export default GradientButton;
