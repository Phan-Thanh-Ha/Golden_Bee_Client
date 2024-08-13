import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Spinner} from '@ui-kitten/components';
import React from 'react';
import {PropTypes} from 'prop-types';
const BtnDouble = ({
  isLoading1,
  isLoading2,
  title1,
  title2,
  onConfirm1,
  onConfirm2,
  btn1Visible = true,
  btn2Visible = true,
  btn1Disable = false,
  btn2Disable = false,
}) => {
  return (
    <View style={styles.buttonContainer}>
      {btn1Visible && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={onConfirm1}
          disabled={btn1Disable}>
          {isLoading1 ? (
            <Spinner />
          ) : (
            <Text style={styles.buttonText}>{title1}</Text>
          )}
        </TouchableOpacity>
      )}

      {btn2Visible && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onConfirm2}
          disabled={btn2Disable}>
          {isLoading2 ? (
            <Spinner />
          ) : (
            <Text style={styles.buttonText}>{title2}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
BtnDouble.defaultProps = {
  isLoading1: false,
  isLoading2: false,
  title1: 'Xác nhận',
  title2: 'Hủy',
  btn1Visible: true,
  btn2Visible: true,
  btn1Disable: false,
  btn2Disable: false,
};
BtnDouble.propTypes = {
  isLoading1: PropTypes.bool,
  isLoading2: PropTypes.bool,
  title1: PropTypes.string,
  title2: PropTypes.string,
  onConfirm1: PropTypes.func.isRequired,
  onConfirm2: PropTypes.func.isRequired,
  btn1Visible: PropTypes.bool,
  btn2Visible: PropTypes.bool,
  btn1Disable: PropTypes.bool,
  btn2Disable: PropTypes.bool,
};

export default BtnDouble;
