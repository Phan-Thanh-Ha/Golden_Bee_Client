import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const AlertModal = ({ isVisible, onClose, children, isAuto, autoCloseTime = 3000, onConfirm, title, backdropCloseable = true }) => {
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
        {title && <Text style={styles.title}>{title}</Text>}
        <Text>{children}</Text>
        {isAuto ? (
          <Text style={styles.countdown}>Đóng trong {countdown} giây</Text>
        ) : (
          <View style={styles.buttonContainer}>
            <Button title="Xác nhận" onPress={onConfirm} />
            <Button title="Hủy" onPress={onClose} />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  countdown: {
    marginTop: 12,
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
});

export default AlertModal;
