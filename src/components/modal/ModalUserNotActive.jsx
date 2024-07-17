import React from 'react';
import { Text, View } from 'react-native';
import AlertModal from '../AlertModal';
import MainStyles from '../../styles/MainStyle';

const ModalUserNotActive = ({
  title,
  isModalVisible,
  setModalVisible,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    setModalVisible(false);
  };

  return (
    <AlertModal
      isVisible={isModalVisible}
      onClose={() => setModalVisible(false)}
      isAuto={false}
      onConfirm={handleConfirm}
      title="Thông báo"
      backdropCloseable={false}
      isCancelable={true}
    >
      <View>
        <View style={[MainStyles.cardJob]}>
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          <View style={MainStyles.flexRowCenter}>
            <Text style={[{ textAlign: 'center' }]}>{title}</Text>
          </View>
        </View>
      </View>
    </AlertModal>
  );
};

export default ModalUserNotActive;
