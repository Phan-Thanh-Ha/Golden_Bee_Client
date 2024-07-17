import React from 'react';
import { CheckBox, Layout } from '@ui-kitten/components';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/Colors';

const InputCheckBox = ({ data, selectedValues, onChange }) => {
  // Nếu không có dữ liệu, hiển thị thông báo
  if (!data || data.length === 0) {
    return (
      null
    );
  }

  // Chia dữ liệu thành các hàng với 2 cột
  const rows = [];
  for (let i = 0; i < data.length; i += 2) {
    rows.push(data.slice(i, i + 2));
  }

  return (
    <Layout style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item) => (
            <View key={item.ServiceDetailId} style={styles.itemContainer}>
              <CheckBox
                checked={selectedValues.some((value) => value.ServiceDetailId === item.ServiceDetailId)}
                onChange={() => onChange(item)}
                style={styles.checkbox}
                textStyle={styles.itemText}
              >
                {item.ServiceDetailName}
              </CheckBox>
            </View>
          ))}
        </View>
      ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    padding: 5,
  },
  itemText: {
    color: colors.MAIN_BLUE_CLIENT,
    fontSize: 15,
  },
  checkbox: {
    flex: 1,
  },
  noDataText: {
    color: colors.GRAY,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default InputCheckBox;
