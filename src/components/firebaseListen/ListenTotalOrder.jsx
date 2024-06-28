import React from 'react';
import { Text, View } from 'react-native';
import AlertModal from '../AlertModal';
import MainStyles from '../../styles/MainStyle';
import { colors } from '../../styles/Colors';

const ListenOrderTotal = ({ myOrders, isModalVisible, setModalVisible, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    console.log('User confirmed');
    setModalVisible(false);
  };

  return (
    <AlertModal
      isVisible={isModalVisible}
      isAuto={false}
      onConfirm={handleConfirm}
      title="Lỗi nhận đơn quá số lượng"
      backdropCloseable={false}
      isCancelable={false}
      isConfirmable={true}
    >
      <View>
        <View style={MainStyles.flexRowCenter}>
          <Text style={[{ textAlign: 'center' }]}>
            Bạn đang có {myOrders?.length} đơn dịch vụ được nhận, vượt quá số lượng có thể, vui lòng liên hệ quản trị viên Ong Vàng để được giải quyết!
          </Text>
        </View>
        <View>
          {myOrders?.length > 1
            ? myOrders?.map((item, index) => (
              <View style={[MainStyles.cardJob]} key={index}>
                <View style={MainStyles.flexRowCenter}>
                  <Text style={[MainStyles.titleCardJob, { textAlign: 'center' }]}>
                    {item?.DataService?.ServiceName}
                  </Text>
                </View>
                {item?.BookingCode ? (
                  <Text style={{ textAlign: 'center', fontSize: 12, color: colors.primary[700], fontWeight: 'bold' }}>
                    {item?.BookingCode}
                  </Text>
                ) : null}
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
              </View>
            ))
            : null}
        </View>
      </View>
    </AlertModal>
  );
};

export default ListenOrderTotal;
