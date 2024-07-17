import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';
import { colors } from '../styles/Colors';

const InputNumber = ({ style, bgColor = '#FFFFFF', textColor = '#000000', min = 0, value, setFieldValue, fieldName, ...props }) => {
  const handleIncrease = () => {
    setFieldValue(fieldName, parseInt(value, 10) + 1);
  };

  const handleDecrease = () => {
    setFieldValue(fieldName, parseInt(value, 10) > min ? parseInt(value, 10) - 1 : min);
  };

  const handleChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (text === '') {
      setFieldValue(fieldName, 0);
    } else if (!isNaN(numericValue) && numericValue >= min) {
      setFieldValue(fieldName, numericValue);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Input
        style={[styles.input, { backgroundColor: bgColor, color: textColor }]}
        placeholderTextColor="#A0A0A0"
        keyboardType="numeric"
        value={String(value)}
        onChangeText={handleChange}
        {...props}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleDecrease}>
          <Icon
            name='minus-outline'
            fill={colors.MAIN_BLUE_CLIENT}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleIncrease}>
          <Icon
            name='plus-outline'
            fill={colors.MAIN_BLUE_CLIENT}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 5,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
});

export default InputNumber;
