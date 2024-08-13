import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../styles/Colors';
import {PropTypes} from 'prop-types';

const ProgressBar = ({total, pass, UserProfile}) => {
  const progress = 5; //calculateProgress(UserProfile);

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

ProgressBar.defaultProps = {
  total: 0,
  pass: 0,
  UserProfile: {},
};
ProgressBar.propTypes = {
  total: PropTypes.number,
  pass: PropTypes.number,
  UserProfile: PropTypes.object,
};

export default ProgressBar;
