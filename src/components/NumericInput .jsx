import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../styles/Colors';
import { SCREEN_WIDTH } from '../styles/MainStyle';

const NumericInput = ({ value, onChange }) => {
  // Hàm định dạng số thành tiền tệ
  const formatCurrency = (num) => {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Hàm chuyển đổi chuỗi tiền tệ về số nguyên
  const parseCurrency = (text) => {
    const numericValue = text.replace(/,/g, '');
    return isNaN(numericValue) ? 0 : parseInt(numericValue, 10);
  };

  // Trạng thái giá trị hiển thị
  const [displayValue, setDisplayValue] = useState(formatCurrency(value));

  // Hàm xử lý thay đổi giá trị nhập vào
  const handleChangeText = (text) => {
    const numericValue = parseCurrency(text);
    const formattedValue = numericValue >= 0 ? numericValue : 0;
    setDisplayValue(formatCurrency(formattedValue));
    onChange(formattedValue);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={displayValue}
        onChangeText={handleChangeText}
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
    textAlign: 'center',
    height: 40,
    borderColor: colors.MAIN_BLUE_CLIENT,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default NumericInput;
