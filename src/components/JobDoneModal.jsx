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
import { parseTimeSql } from '../utils/FormatTime';

const JobDoneModal = forwardRef((_, ref) => {
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
                    Dịch vụ {data?.ServiceName.toLowerCase()}
                  </Text>
                </View>
                {data?.BookingServiceCode ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      color: colors.primary[700],
                      fontWeight: 'bold',
                    }}>
                    {data?.BookingServiceCode}
                  </Text>
                ) : null}
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowSpaceBetween}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image
                        source={ic_person}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        Nhân viên: {data?.TotalStaff}
                      </Text>
                    </View>
                    {data?.TotalRoom ? (
                      <View style={MainStyles.flexRowFlexStart}>
                        <Image
                          source={ic_living_room}
                          style={{ width: 22, height: 22 }}
                        />
                        <Text style={MainStyles.textCardJob}>
                          Phòng {data?.TotalRoom}
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
                        Trong {data?.TimeWorking || 1} giờ
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
                      source={ic_location}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Địa chỉ:{' '}
                      {data?.DataService?.Address || 'Chưa cập nhật địa chỉ'}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_clearning}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Dịch vụ thêm :{' '}
                      {data?.Detail?.length > 0 ? '' : 'Không kèm dịch vụ thêm'}
                    </Text>
                  </View>
                  {data?.Detail?.length > 0
                    ? data?.Detail.map(item => (
                      <View key={item.ServiceDetailId.toString()}>
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
                    <Image source={ic_note} style={{ width: 22, height: 22 }} />
                    <Text style={MainStyles.textCardJob}>
                      {data?.Note
                        ? 'Ghi chú: ' + data?.DataService?.NoteBooking.trim()
                        : 'Không có ghi chú'}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_schedule}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Ngày hoàn thành : {parseTimeSql(data?.BookingTime, 1)}
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
                      Tên khách hàng :{data?.CustomerName}
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
                      Số điện thoại : {data?.StaffPhone}
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
              {FormatMoney(data?.TotalMoney)} VND
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
  scrollViewContent: {
    flexGrow: 1,
  },
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

JobDoneModal.displayName = 'JobDoneModal';

export default JobDoneModal;
