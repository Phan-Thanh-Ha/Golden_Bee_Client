// FilterComponent.js
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {PropTypes} from 'prop-types';

const FilterComponent = ({onFilterChange}) => {
  const [selectedFilter, setSelectedFilter] = useState('today');

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button(selectedFilter === 'today')}
        onPress={() => handleFilterChange('today')}>
        <Text style={styles.buttonText}>Trong ngày</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button(selectedFilter === 'week')}
        onPress={() => handleFilterChange('week')}>
        <Text style={styles.buttonText}>Trong tuần này</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button(selectedFilter === 'month')}
        onPress={() => handleFilterChange('month')}>
        <Text style={styles.buttonText}>Trong tháng này</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: isSelected => ({
    padding: 10,
    backgroundColor: isSelected ? 'blue' : 'gray',
    borderRadius: 5,
  }),
  buttonText: {
    color: 'white',
  },
});

FilterComponent.defaultProps = {
  onFilterChange: () => {},
};
FilterComponent.propTypes = {
  onFilterChange: PropTypes.func,
};

export default FilterComponent;
