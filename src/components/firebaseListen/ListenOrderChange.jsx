import {Text, View} from 'react-native';
import AlertModal from '../AlertModal';
import MainStyles from '../../styles/MainStyle';
import {colors} from '../../styles/Colors';
import React from 'react';
import {PropTypes} from 'prop-types';
const ListenOrderChange = ({
  orderChange,
  isModalVisible,
  setModalVisible,
  onConfirm,
}) => {
  const hideModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    onConfirm();
    hideModal();
  };

  return (
    <AlertModal
      isVisible={isModalVisible}
      onClose={hideModal}
      isAuto={false}
      onConfirm={handleConfirm}
      title="Thông báo cập nhật đơn dịch vụ"
      backdropCloseable={true}
      isCancelable={false}>
      <View>
        {orderChange?.orderId ? (
          <View style={[MainStyles.cardJob]}>
            <View style={MainStyles.flexRowCenter}>
              <Text style={[MainStyles.titleCardJob, {textAlign: 'center'}]}>
                {orderChange?.DataService?.ServiceName}
              </Text>
            </View>
            {orderChange?.BookingCode ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: colors.primary[700],
                  fontWeight: 'bold',
                }}>
                {orderChange?.BookingCode}
              </Text>
            ) : null}
            <View style={MainStyles.flexRowCenter}>
              <View style={MainStyles.line} />
            </View>
            <View style={MainStyles.flexRowCenter}>
              <Text style={[{textAlign: 'center'}]}>
                {
                  'Quản trị viên đã cập nhật đơn dịch vụ của bạn, vui lòng kiểm tra lại thông tin dịch vụ !'
                }
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </AlertModal>
  );
};
ListenOrderChange.propTypes = {
  orderChange: PropTypes.shape({
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    DataService: PropTypes.shape({
      ServiceName: PropTypes.string,
    }),
    BookingCode: PropTypes.string,
  }),
  isModalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
export default ListenOrderChange;
