import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../styles/MainStyle';
import { colors } from '../styles/Colors';
import LogoBee from './LogoBee';
import LogoBeeBox from './LogoBeeBox';
import Logo from './Logo';

const AlertModal = ({ isVisible, onClose, children, isAuto, autoCloseTime = 3000, onConfirm, title, backdropCloseable = true, isCancelable = true, isConfirmable = true }) => {
  const [countdown, setCountdown] = useState(autoCloseTime / 1000);

  useEffect(() => {
    let timer;
    let countdownInterval;

    if (isAuto && isVisible) {
      setCountdown(autoCloseTime / 1000); // Reset countdown khi modal mở
      timer = setTimeout(() => {
        onConfirm();
        onClose();
      }, autoCloseTime);

      countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [isAuto, isVisible, onClose, onConfirm, autoCloseTime]);

  useEffect(() => {
    if (!isVisible) {
      setCountdown(autoCloseTime / 1000); // Reset countdown khi modal đóng
    }
  }, [isVisible, autoCloseTime]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={backdropCloseable ? onClose : undefined}
      backdropTransitionOutTiming={0}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      backdropColor="black"
    >
      <View style={styles.modalContent}>
        <View style={styles.logoContainer}>
          <Logo sizeImage={SCREEN_WIDTH * 0.18} />
        </View>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
        {isAuto ? (
          <Text style={styles.countdown}>Đóng trong {countdown} giây</Text>
        ) : (
          <View style={styles.buttonContainer}>
            {
              isConfirmable ? (
                <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                  <Text style={styles.buttonText}>Xác nhận</Text>
                </TouchableOpacity>
              ) : null
            }
            {
              isCancelable ? (
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>
              ) : null
            }
          </View>
        )}
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

export default AlertModal;
