import React, { useState } from 'react';
import { View, Button } from 'react-native';
import AlertModal from '../../components/AlertModal';

const Check = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    // Xử lý khi người dùng nhấn nút xác nhận
    console.log('User confirmed');
    hideModal();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Alert" onPress={showModal} />
      <AlertModal
        isVisible={isModalVisible}
        onClose={hideModal}
        isAuto={false}  // Thay đổi thành false nếu không muốn modal tự động đóng
        // autoCloseTime={5000} // Ví dụ: Đóng sau 5 giây
        onConfirm={handleConfirm}
        title="Thông báo"
        backdropCloseable={false}
      >
        Đây là nội dung của alert.
      </AlertModal>
    </View>
  );
};


export default Check;