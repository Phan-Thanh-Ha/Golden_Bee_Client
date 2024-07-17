import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { themeColors } from "../styles/Colors";

const FilterComponent = ({ applyFilter }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('week');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const onDateChange = (event, date) => {
    if (event.type === 'dismissed') {
      setDatePickerVisibility(false);
      return;
    }
    const currentDate = date || selectedDate;
    setDatePickerVisibility(Platform.OS === 'ios');
    setSelectedDate(currentDate);
    setCurrentFilter('date');
    applyFilter('date', currentDate);
  };

  const applyCurrentFilter = (filterType) => {
    setCurrentFilter(filterType);
    applyFilter(filterType);
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        onPress={() => applyCurrentFilter('week')}
        style={[styles.filterButton, currentFilter === 'week' && styles.activeFilterButton]}
      >
        <Text style={currentFilter === 'week' && styles.activeFilterText}>Trong tuần</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => applyCurrentFilter('month')}
        style={[styles.filterButton, currentFilter === 'month' && styles.activeFilterButton]}
      >
        <Text style={currentFilter === 'month' && styles.activeFilterText}>Trong tháng</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={showDatePicker}
        style={[styles.filterButton, currentFilter === 'date' && styles.activeFilterButton]}
      >
        <Text style={currentFilter === 'date' && styles.activeFilterText}>Chọn ngày</Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display="default"
          locale={'vi'}
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    // backgroundColor: themeColors.background,
    borderRadius: 5,
  },
  filterButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: themeColors.lightBackground,
    borderRadius: 5,
  },
  activeFilterButton: {
    backgroundColor: themeColors.darkBackground,
  },
  activeFilterText: {
    color: '#fff',
  }
});

export default FilterComponent;
