import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../styles/Colors';
import { SCREEN_WIDTH } from '../styles/MainStyle';

const NumericInput = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value}
        onChangeText={onChange}
        placeholder="Số tiền"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minWidth: SCREEN_WIDTH * 0.4,
  },
  input: {
    height: 40,
    borderColor: colors.MAIN_BLUE_CLIENT,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default NumericInput;
