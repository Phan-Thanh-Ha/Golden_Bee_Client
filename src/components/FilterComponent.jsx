import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {themeColors} from '../styles/Colors';
import {PropTypes} from 'prop-types';

const FilterComponent = ({applyFilter}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('week');

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

  const applyCurrentFilter = filterType => {
    setCurrentFilter(filterType);
    applyFilter(filterType);
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        onPress={() => applyCurrentFilter('week')}
        style={[
          styles.filterButton,
          currentFilter === 'week' && styles.activeFilterButton,
        ]}>
        <Text style={currentFilter === 'week' && styles.activeFilterText}>
          Trong tuần
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => applyCurrentFilter('month')}
        style={[
          styles.filterButton,
          currentFilter === 'month' && styles.activeFilterButton,
        ]}>
        <Text style={currentFilter === 'month' && styles.activeFilterText}>
          Trong tháng
        </Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          locale={'vi'}
          style={styles.dateTimePicker}
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
    borderRadius: 5,
  },
  filterButton: {
    marginRight: 5,
    padding: 5,
    backgroundColor: themeColors.lightBackground,
    borderRadius: 5,
  },
  activeFilterButton: {
    backgroundColor: themeColors.darkBackground,
  },
  activeFilterText: {
    color: '#fff',
  },
  dateTimePicker: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.3,
    alignSelf: 'center',
  },
});

FilterComponent.defaultProps = {
  applyFilter: () => {},
};
FilterComponent.propTypes = {
  applyFilter: PropTypes.func,
};

export default FilterComponent;
