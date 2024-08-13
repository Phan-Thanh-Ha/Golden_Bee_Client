import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors} from '../styles/Colors';
import Button from './buttons/Button';
import {PropTypes} from 'prop-types';

const periods = ['Sáng', 'Trưa', 'Chiều', 'Tối'];
const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'thứ 6', 'thứ 7', 'CN'];

const ScheduleMatrix = ({initialSchedule, onBook}) => {
  const [schedule, setSchedule] = useState(
    initialSchedule || Array(4).fill(Array(7).fill(false)),
  );

  useEffect(() => {
    if (initialSchedule) {
      setSchedule(initialSchedule);
    }
  }, [initialSchedule]);

  const handleToggle = (periodIndex, dayIndex) => {
    const newSchedule = schedule.map((period, pIndex) =>
      period.map((day, dIndex) => {
        if (pIndex === periodIndex && dIndex === dayIndex) {
          return !day;
        }
        return day;
      }),
    );
    setSchedule(newSchedule);
  };

  const handleBook = () => {
    const selectedTimes = [];
    schedule.forEach((period, periodIndex) => {
      period.forEach((day, dayIndex) => {
        if (day) {
          selectedTimes.push({
            day: days[dayIndex],
            period: periods[periodIndex],
          });
        }
      });
    });
    if (onBook) {
      onBook(selectedTimes);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.cell} />
          {periods.map((period, index) => (
            <View key={index} style={styles.cell}>
              <Text style={styles.headerText}>{period}</Text>
            </View>
          ))}
        </View>
        {days.map((day, dayIndex) => (
          <View key={dayIndex} style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.headerText}>{day}</Text>
            </View>
            {periods.map((period, periodIndex) => (
              <TouchableOpacity
                key={periodIndex}
                style={[
                  styles.cell,
                  styles.button,
                  schedule[periodIndex][dayIndex]
                    ? styles.available
                    : styles.unavailable,
                ]}
                onPress={() => handleToggle(periodIndex, dayIndex)}>
                <Text
                  style={
                    schedule[periodIndex][dayIndex]
                      ? styles.availableText
                      : styles.unavailableText
                  }>
                  {schedule[periodIndex][dayIndex] ? 'Rảnh' : 'Bận'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <Button
          fontSize={15}
          paddingHorizontal={10}
          paddingVertical={7}
          onPress={handleBook}>
          Cập nhật
        </Button>
        <View style={styles.buttonContainer}>
          {/* <Button title="Book" onPress={handleBook} />
          <Button title="Reset" onPress={handleReset} /> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  button: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  available: {
    backgroundColor: colors.MAIN_BLUE_CLIENT,
  },
  unavailable: {
    backgroundColor: colors.GRAY,
  },
  availableText: {
    color: colors.WHITE,
    fontSize: 10,
  },
  unavailableText: {
    color: colors.MAIN_BLUE_CLIENT,
    fontSize: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

ScheduleMatrix.defaultProps = {
  initialSchedule: null,
  onBook: () => {},
};
ScheduleMatrix.propTypes = {
  initialSchedule: PropTypes.array,
  onBook: PropTypes.func,
};

export default ScheduleMatrix;
