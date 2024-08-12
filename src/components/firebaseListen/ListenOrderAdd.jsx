import React from 'react';
import {Text, View} from 'react-native';
import AlertModal from '../AlertModal';
import MainStyles from '../../styles/MainStyle';
import {colors} from '../../styles/Colors';
import {PropTypes} from 'prop-types';

const ListenOrderAdd = ({
  orderAdd,
  isModalVisible,
  setModalVisible,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    setModalVisible(false); // Thêm vào để đóng modal khi người dùng xác nhận
  };

  return (
    <AlertModal
      isVisible={isModalVisible}
      onClose={() => setModalVisible(false)} // Đóng modal khi người dùng bấm ngoài hoặc nút đóng
      isAuto={false}
      onConfirm={handleConfirm}
      title="Bạn có đơn dịch vụ mới"
      backdropCloseable={true}
      isCancelable={false}>
      <View>
        {orderAdd?.orderId ? (
          <View style={[MainStyles.cardJob]}>
            <View style={MainStyles.flexRowCenter}>
              <Text style={[MainStyles.titleCardJob, {textAlign: 'center'}]}>
                {orderAdd?.DataService?.ServiceName}
              </Text>
            </View>
            {orderAdd?.BookingCode ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: colors.primary[700],
                  fontWeight: 'bold',
                }}>
                {orderAdd?.BookingCode}
              </Text>
            ) : null}
            <View style={MainStyles.flexRowCenter}>
              <View style={MainStyles.line} />
            </View>
            <View style={MainStyles.flexRowCenter}>
              <Text style={[{textAlign: 'center'}]}>
                {
                  'Bạn có đơn dịch vụ mới, hãy kiểm tra thông tin và bắt đầu công việc nhé!'
                }
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </AlertModal>
  );
};

ListenOrderAdd.propTypes = {
  orderAdd: PropTypes.object,
  isModalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ListenOrderAdd;
