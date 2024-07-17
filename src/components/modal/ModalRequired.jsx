import React, { useState } from 'react';
import { Text, View } from 'react-native';
import MainStyles from '../../styles/MainStyle';
import ModalSelectOption from './ModalSelectOption';

const ModalRequired = ({
  title,
  isModalVisible,
  setModalVisible,
  onConfirm1,
  onConfirm2,
}) => {
  const handleConfirm1 = () => {
    onConfirm1();
    setModalVisible(false);
  };
  const handleConfirm2 = () => {
    onConfirm2();
    setModalVisible(false);
  };

  return (
    <ModalSelectOption
      titleBtn1={"Xác nhận"}
      titleBtn2={"Hủy"}
      isVisible={isModalVisible}
      onClose={() => setModalVisible(false)}
      title="Thông báo"
      backdropCloseable={true}
      onConfirm1={handleConfirm1}
      onConfirm2={handleConfirm2}
    >
      <View>
        <View style={[MainStyles.cardJob]}>
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          <View style={MainStyles.flexRowCenter}>
            <Text style={[{ textAlign: 'center' }]}>
              {title}
            </Text>
          </View>
        </View>
      </View>
    </ModalSelectOption>
  );
};

export default ModalRequired;