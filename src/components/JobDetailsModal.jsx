import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useMemo,
} from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MainStyles, { SCREEN_HEIGHT } from '../styles/MainStyle';
import { colors } from '../styles/Colors';
import { FormatMoney } from '../utils/FormatMoney';
import { Spinner } from '@ui-kitten/components';
import {
  cirtificate,
  coin_icon,
  ic_chronometer,
  ic_clearning,
  ic_clearning_basic,
  ic_glass,
  ic_human,
  ic_living_room,
  ic_location,
  ic_note,
  ic_person,
  ic_phone_call,
  ic_schedule,
} from '../assets';
import LayoutBottom from './layouts/LayoutBottom';
import Box from './Box';
import { RoundUpNumber } from '../utils/RoundUpNumber';
import { dateTimeFormat } from '../utils/FormatTime';

const JobDetailsModal = forwardRef((_, ref) => {
  const [data, setData] = useState(null);
  const bottomSheetRef = useRef(null);

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  useImperativeHandle(ref, () => ({
    openModal(data) {
      setData(data);
      bottomSheetRef.current?.expand();
    },
  }));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={styles.bottomSheet}
      handleIndicatorStyle={styles.handleIndicator}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.modalContent}>
          {data ? (
            <View>
              <View style={MainStyles.cardJob}>
                <View style={MainStyles.flexRowCenter}>
                  <Text
                    style={[MainStyles.titleCardJob, { textAlign: 'center' }]}>
                    Dịch vụ {data?.DataService?.ServiceName.toLowerCase()}
                  </Text>
                </View>
                {data?.BookingCode ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      color: colors.primary[700],
                      fontWeight: 'bold',
                    }}>
                    {data?.BookingCode}
                  </Text>
                ) : null}
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <Text style={MainStyles.titleContentModal}>
                  Thông tin dịch vụ
                </Text>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowSpaceBetween}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image
                        source={ic_person}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        {data?.DataService?.TotalStaff} Nhân viên
                      </Text>
                    </View>
                    {data?.DataService?.TotalRoom ? (
                      <View style={MainStyles.flexRowFlexStart}>
                        <Image
                          source={ic_living_room}
                          style={{ width: 22, height: 22 }}
                        />
                        <Text style={MainStyles.textCardJob}>
                          {data?.DataService?.TotalRoom} Phòng
                        </Text>
                      </View>
                    ) : null}
                    {data?.DataService?.SelectOption?.length ? (
                      <View style={MainStyles.flexRowFlexStart}>
                        <Text style={MainStyles.textCardJob}>
                          ⚙️ {data?.DataService?.SelectOption[0]?.OptionName}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowSpaceBetween}>
                    <View style={MainStyles.flexRowFlexEnd}>
                      <Image
                        source={ic_glass}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        {' '}
                        Trong {RoundUpNumber(
                          data?.DataService?.TimeWorking,
                          0,
                        )}{' '}
                        giờ
                      </Text>
                    </View>
                    <View style={MainStyles.flexRowFlexEnd}>
                      <Image
                        source={ic_chronometer}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>Làm ngay</Text>
                    </View>
                  </View>
                </View>
                {data?.DataService?.IsPremium ? (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image
                        source={cirtificate}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        Dịch vụ Premium
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image
                        source={ic_clearning_basic}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        Dịch vụ thông thường
                      </Text>
                    </View>
                  </View>
                )}
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_clearning}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Dịch vụ thêm :{' '}
                      {data?.DataService?.OtherService?.length > 0
                        ? ''
                        : 'Không kèm dịch vụ thêm'}
                    </Text>
                  </View>
                  {data?.DataService?.OtherService?.length > 0
                    ? data?.DataService?.OtherService.map(item => (
                      <View key={item?.ServiceDetailId.toString()}>
                        <Text
                          style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>
                          🔸{item.ServiceDetailName}
                        </Text>
                      </View>
                    ))
                    : null}
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_location}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Địa chỉ: {data?.DataService?.Address}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image source={ic_note} style={{ width: 22, height: 22 }} />
                    <Text style={MainStyles.textCardJob}>
                      {data?.DataService?.NoteBooking
                        ? 'Ghi chú: ' + data?.DataService?.NoteBooking.trim()
                        : 'Không có ghi chú'}
                    </Text>
                  </View>
                </View>
                {data?.DataService?.Voucher?.length > 0 ? (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Text style={MainStyles.textCardJob}>
                        🎁 Đã áp mã voucher :
                      </Text>
                    </View>
                    {data?.DataService?.Voucher?.length > 0
                      ? data?.DataService?.Voucher.map(item => (
                        <View key={item?.VoucherId.toString()}>
                          <Text
                            style={[
                              MainStyles.textCardJob,
                              { paddingLeft: 10 },
                            ]}>
                            🔸CODE : {item?.VoucherCode} - giảm{' '}
                            {item?.TypeDiscount === 1
                              ? item?.Discount + '%'
                              : FormatMoney(item?.Discount) + ' VNĐ'}
                          </Text>
                        </View>
                      ))
                      : null}
                  </View>
                ) : null}
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_schedule}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Thời gian tạo :{dateTimeFormat(data?.CreateAt, 2)}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <Text style={MainStyles.titleContentModal}>
                  Thông tin khách hàng
                </Text>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image source={ic_human} style={{ width: 22, height: 22 }} />
                    <Text style={MainStyles.textCardJob}>
                      Tên khách hàng :{data?.DataService?.CustomerName}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_phone_call}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Số điện thoại :{data?.StaffPhone}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={MainStyles.flexRowCenter}>
              <Spinner />
            </View>
          )}
        </View>
        <Box height={SCREEN_HEIGHT * 0.15} />
      </ScrollView>
      <LayoutBottom>
        <View style={MainStyles.cardContentJob}>
          <Text
            style={{
              color: colors.MAIN_BLUE_CLIENT,
              marginLeft: 10,
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Tổng tiền
          </Text>
          <View style={MainStyles.flexRowCenter}>
            <Image source={coin_icon} style={{ width: 22, height: 22 }} />
            <Text
              style={{
                color: colors.MAIN_COLOR_CLIENT,
                marginLeft: 10,
                fontSize: 18,
                fontWeight: '700',
              }}>
              {FormatMoney(data?.DataService?.PriceAfterDiscount)} VND
            </Text>
          </View>
        </View>
        <Box height={SCREEN_HEIGHT * 0.07} />
      </LayoutBottom>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: colors.MAIN_BLUE_CLIENT,
  },
  scrollViewContent: {},
  sectionTitle: {
    fontSize: 18,
    color: colors.MAIN_BLUE_CLIENT,
    fontWeight: 'bold',
  },
  sectionSubTitle: {
    color: colors.MAIN_BLUE_CLIENT,
  },
  additionalFields: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    backgroundColor: colors.MAIN_COLOR_CLIENT,
    color: colors.WHITE,
    padding: 5,
    borderRadius: 5,
  },
});

JobDetailsModal.displayName = 'JobDetailsModal';

export default JobDetailsModal;
