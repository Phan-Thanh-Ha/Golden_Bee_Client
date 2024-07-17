import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/MainStyle';
import { colors } from '../../styles/Colors';
import Logo from '../Logo';

const ModalSelectOption = ({ isVisible, onClose, children, onConfirm1, onConfirm2, titleBtn1, titleBtn2, title, backdropCloseable = true, isBtn2Visible = true, isBtn1Visible = true }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={backdropCloseable ? onClose : undefined}
      backdropTransitionOutTiming={0}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.1}
      backdropColor="black"
    >
      <View style={styles.modalContent}>
        <View style={styles.logoContainer}>
          <Logo sizeImage={SCREEN_WIDTH * 0.18} />
        </View>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
        <View style={styles.buttonContainer}>
          {
            isBtn1Visible ? (
              <TouchableOpacity style={styles.confirmButton} onPress={onConfirm1}>
                <Text style={styles.buttonText}>{titleBtn1}</Text>
              </TouchableOpacity>
            ) : null
          }
          {
            isBtn2Visible ? (
              <TouchableOpacity style={styles.cancelButton} onPress={onConfirm2}>
                <Text style={styles.buttonText}>{titleBtn2}</Text>
              </TouchableOpacity>
            ) : null
          }
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    top: -40, // Điều chỉnh độ lệch lên trên
    alignSelf: 'center', // Đưa logo về giữa theo chiều ngang
  },
  modalContent: {
    paddingTop: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.MAIN_BLUE_CLIENT
  },
  countdown: {
    marginTop: 12,
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
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

export default ModalSelectOption;