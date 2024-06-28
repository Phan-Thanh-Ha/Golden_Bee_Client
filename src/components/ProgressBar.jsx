import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../styles/Colors';

const ProgressBar = ({total, pass, UserProfile}) => {
  // Hàm tính toán tiến trình
  const calculateProgress = UserProfile => {
    const totalFields = Object.keys(UserProfile).length;
    let filledFields = 0;

    // Duyệt qua mỗi trường và kiểm tra nếu có giá trị
    Object.values(UserProfile).forEach(value => {
      if (value !== '') {
        filledFields += 1;
      }
    });

    // Tính toán tiến trình
    const progress = (filledFields / totalFields) * 100;
    return progress;
  };
  const progress = calculateProgress(UserProfile);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelLeft}>
          Đã hoàn thành : {progress.toFixed(1)}%
        </Text>
        <Text style={styles.labelRight}>
          {pass}/{total}
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progress, {width: `${progress}%`}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 40,
    padding: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelLeft: {
    fontSize: 16,
    color: colors.MAIN_BLUE_CLIENT,
    fontWeight: '600',
  },
  labelRight: {
    fontSize: 16,
    color: colors.MAIN_BLUE_CLIENT,
    fontWeight: '600',
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default ProgressBar;
