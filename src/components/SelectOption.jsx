import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Select, SelectItem, IndexPath} from '@ui-kitten/components';
import {PropTypes} from 'prop-types';

const SelectOption = ({selectedValue, onValueChange, size}) => {
  const data = ['60 phút', '30 phút', '10 phút'];

  // Chuyển đổi giá trị selectedValue thành IndexPath
  const getSelectedIndex = () => {
    const index = data.findIndex(
      label => label.split(' ')[0] === selectedValue,
    );
    return new IndexPath(index);
  };

  const handleSelect = index => {
    const selectedLabel = data[index.row];
    const value = selectedLabel.split(' ')[0]; // Extract the numeric part
    onValueChange(value);
  };

  const selectStyles = [styles.select];
  if (size === 'small') {
    selectStyles.push(styles.small);
  } else if (size === 'large') {
    selectStyles.push(styles.large);
  }

  return (
    <View style={styles.container}>
      <Select
        selectedIndex={getSelectedIndex()}
        onSelect={handleSelect}
        value={data[getSelectedIndex().row]}
        style={selectStyles}>
        {data.map((label, index) => (
          <SelectItem key={index} title={label} />
        ))}
      </Select>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  label: {
    fontSize: 16,
  },
  select: {
    width: 150,
  },
  small: {
    width: 130,
  },
  large: {
    width: 200,
  },
});

SelectOption.defaultProps = {
  size: 'normal',
  onValueChange: () => {},
  selectedValue: '',
};
SelectOption.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
};

export default SelectOption;
