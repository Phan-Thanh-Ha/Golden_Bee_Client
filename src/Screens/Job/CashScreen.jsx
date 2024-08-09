import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors, themeColors } from '../../styles/Colors';
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/MainStyle';
import Box from '../../components/Box';
import Header from '../../components/Header';
import { FormatMoney } from '../../utils/FormatMoney';
import CustomLabel from '../../components/forms/CustomLabel';
import {
  cirtificate,
  coin_icon,
  ic_clearning,
  ic_clearning_basic,
  ic_glass,
  ic_living_room,
  ic_location,
  ic_note,
  ic_person,
} from '../../assets';
import Button from '../../components/buttons/Button';
import StatusBarCustom from '../../components/StatusBarCustom';
import LayoutBottom from '../../components/layouts/LayoutBottom';
import { responsivescreen } from '../../utils/responsive-screen';
import ArrowRight from '../../components/svg/ArrowRight';
import { setData } from '../../utils';
import { completeOrder } from '../../firebaseService/HandleOrder';
import { ScreenNames } from '../../Constants';
import { useDispatch, useSelector } from 'react-redux';
import { mainAction } from '../../Redux/Action';
import StorageNames from '../../Constants/StorageNames';
import Up from '../../components/svg/Up';
import Down from '../../components/svg/Down';
import BtnGetImageModal from '../../components/BtnGetImageModal';
import AlertConfirm from '../../components/modal/AlertConfirm';
import { RoundUpNumber } from '../../utils/RoundUpNumber';
import { Icon } from '@ui-kitten/components';
import { OVG_DeleteOrdersByBookingCode } from '../../firebaseService/ListenOrder';

const CashScreen = ({ route }) => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.main.userLogin);
  const [isLoading, setIsLoading] = React.useState(false);
  const location = useSelector(state => state.main.locationTime);
  const { data } = route.params;
  const [more, setMore] = useState(false);
  const [imageBefore, setImageBefore] = useState([]);
  const [imageAfter, setImageAfter] = useState([]);
  const [alertTitle, setAlertTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [number, setNumber] = useState(0);
  const [totalMoneyAll, setTotalMoneyAll] = useState(data?.DataService?.PriceAfterDiscount);

  useEffect(() => {
    if (number) {
      setTotalMoneyAll(RoundUpNumber(parseFloat(data?.DataService?.PriceAfterDiscount) + parseFloat(number), 0))

    } else {
      setTotalMoneyAll(data?.DataService?.PriceAfterDiscount)
    }
  }, [number])
  // console.log('data', data);
  const renderItem = ({ item }) => (
    <View>
      <Text style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>
        🔸{item.ServiceDetailName}
      </Text>
    </View>
  );

  const validation = () => {
    if (!imageBefore[0]) {
      setAlertTitle('Vui lòng thêm hình ảnh trước khi làm việc');
      setIsLoading(false);
      return false;
    }
    if (!imageAfter[0]) {
      setAlertTitle('Vui lòng thêm hình ảnh sau khi làm việc');
      setIsLoading(false);
      return false;
    }
    return true;
  };
  const OVG_spOfficer_Booking_Save = async data => {
    setIsLoading(true);
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        BookingId: parseInt(data?.DataService?.BookingId),
        LatOfficer: location?.latitude,
        LngOfficer: location?.longitude,
        OfficerName: userLogin?.OfficerName,
        IsConfirm: 3,
        TotalMoneyBooking: totalMoneyAll,
        OfficerMoney: totalMoneyAll * 0.7,
        AdminMoney: totalMoneyAll * 0.3,
        ImageBookingServiceBefore: imageBefore[0],
        ImageBookingServiceAfter: imageAfter[0],
        IsPayment: 1,
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spOfficer_Booking_Save_V1',
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.Status === 'OK') {
        // call update firebase
        const complete = await OVG_DeleteOrdersByBookingCode(data?.BookingCode);
        if (complete) {
          const userChange = {
            ...userLogin,
            OfficerStatus: 0,
          };
          mainAction.userLogin(userChange, dispatch);
          await setData(StorageNames.USER_PROFILE, userChange);
          const dataConfirm = {
            ...data,
            DataService: {
              ...data?.DataService,
              PriceAfterDiscount: totalMoneyAll,
            }
          }
          navi.reset({
            index: 0,
            routes: [{ name: ScreenNames.CONGRATULATION, params: { data: dataConfirm } }],
          })
        }
        return;
      }
      setIsLoading(false);
      return;
    } catch (error) { }
  };
  const handlePayment = () => {
    const valid = validation();
    if (valid) {
      OVG_spOfficer_Booking_Save(data);
    } else {
      setIsModalVisible(true);
    }
  };
  return (
    <LayoutGradientBlue>
      <StatusBarCustom />
      <Header />
      <LogoBeeBox color={colors.MAIN_BLUE_CLIENT} sizeImage={70} sizeText={20} />
      <ScrollView>
        <View style={MainStyles.containerTabPayment}>
          <View style={MainStyles.layoutTabPayment}>
            <View style={MainStyles.flexRowCenter}>
              <Text style={[MainStyles.titleCardJob, { textAlign: 'center' }]}>
                Dịch vụ {data?.DataService?.ServiceName.toLowerCase()}
              </Text>
            </View>
            {data?.BookingCode && (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: colors.primary[700],
                  fontWeight: 'bold',
                }}>
                {data?.BookingCode}
              </Text>
            )}
            <View style={MainStyles.flexRowCenter}>
              <View style={MainStyles.line} />
            </View>
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="person-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  Khách hàng: {data?.DataService?.CustomerName}
                </Text>
              </View>
            </View>
            {
              data?.DataService?.CustomerPhone && (
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill="#3366FF"
                      name="phone-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      Số điện thoại: {data?.DataService?.CustomerPhone}
                    </Text>
                  </View>
                </View>
              )
            }
            {
              data?.DataService?.TotalStaff && (
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill="#3366FF"
                      name="people-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      Số lượng nhân viên: {data?.DataService?.TotalStaff} nhân viên
                    </Text>
                  </View>
                </View>
              )
            }
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowSpaceBetween}>
                <View style={MainStyles.flexRowFlexEnd}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill="#3366FF"
                    name="clock-outline"
                  />
                  <Text style={MainStyles.textCardJob}>
                    {' '}
                    Làm việc trong: {RoundUpNumber(data?.DataService?.TimeWorking, 0)} giờ
                  </Text>
                </View>
              </View>
            </View>
            {more ? (
              <>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill="#3366FF"
                      name="plus-square-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      Dịch vụ thêm:{" "}
                      {data?.DataService?.OtherService?.length > 0
                        ? ""
                        : "Không kèm dịch vụ thêm"}
                    </Text>
                  </View>
                  {data?.DataService?.OtherService?.length > 0 &&
                    data?.DataService?.OtherService.map((item) => (
                      <View key={item?.ServiceDetailId?.toString()} style={MainStyles.flexRowFlexStart}>
                        <Icon
                          style={{ marginLeft: SCREEN_WIDTH * 0.07, width: 20, height: 20 }}
                          fill="#3366FF"
                          name="plus-outline"
                        />
                        <Text
                          style={[MainStyles.textCardJob]}
                        >
                          {item?.ServiceDetailName}
                        </Text>
                      </View>
                    ))}
                </View>
                {
                  data?.DataService?.Voucher?.length > 0 && (
                    <View style={MainStyles.rowMargin}>
                      <View style={MainStyles.flexRowFlexStart}>
                        <Icon
                          style={MainStyles.CardIcon}
                          fill="#3366FF"
                          name="pricetags-outline"
                        />
                        <Text style={MainStyles.textCardJob}>Đã sử dụng voucher:</Text>
                      </View>
                      {data?.DataService?.Voucher?.length > 0
                        ? data?.DataService?.Voucher.map((item) => (
                          <View key={item?.VoucherId.toString()} style={MainStyles.flexRowFlexStart}>
                            <Icon
                              style={{ marginLeft: SCREEN_WIDTH * 0.07, width: 20, height: 20 }}
                              fill="#3366FF"
                              name="plus-outline"
                            />
                            <Text
                              style={[MainStyles.textCardJob]}
                            >
                              CODE: {item?.VoucherCode} - giảm{" "}
                              {item?.TypeDiscount === 1
                                ? item?.Discount + "%"
                                : FormatMoney(item?.Discount) + " VND"}
                            </Text>
                          </View>
                        ))
                        : null}
                    </View>
                  )}
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill="#3366FF"
                      name="message-square-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      {data?.DataService?.NoteBooking
                        ? 'Ghi chú: ' + data?.DataService?.NoteBooking.trim()
                        : 'Không có ghi chú'}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill="#3366FF"
                      name="pin-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      Địa chỉ: {data?.DataService?.Address}
                    </Text>
                  </View>
                </View>
              </>
            ) : null}

            <View style={MainStyles.flexRowCenter}>
              {more ? (
                <TouchableOpacity onPress={() => setMore(false)}>
                  <Up color={colors.MAIN_BLUE_CLIENT} fill="none" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setMore(true)}>
                  <Down color={colors.MAIN_BLUE_CLIENT} fill="none" />
                </TouchableOpacity>
              )}
            </View>

            <Box height={responsivescreen.height(2)} />
            <View>
              <View style={MainStyles.rowBtnUpload}>
                <View style={MainStyles.columnBtn}>
                  <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>
                    Ảnh làm dịch vụ
                  </CustomLabel>
                </View>
              </View>
              <View style={MainStyles.rowBtnUpload}>
                <View style={MainStyles.columnBtn}>
                  <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>
                    Trước khi làm
                  </CustomLabel>
                </View>
                <View style={MainStyles.columnBtn}>
                  <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>
                    Sau khi làm
                  </CustomLabel>
                </View>
              </View>
              <View style={MainStyles.rowBtnUpload}>
                <BtnGetImageModal
                  setImageUrl={setImageBefore}
                  btnWidth={SCREEN_WIDTH * 0.4}
                  btnHeight={SCREEN_HEIGHT * 0.15}
                />
                <BtnGetImageModal
                  setImageUrl={setImageAfter}
                  btnWidth={SCREEN_WIDTH * 0.4}
                  btnHeight={SCREEN_HEIGHT * 0.15}
                />
              </View>
            </View>
            <Box height={responsivescreen.height(2)} />
            <View
              style={[
                MainStyles.cardContentJob,
                { backgroundColor: colors.WHITE },
              ]}>
              <View style={MainStyles.flexRowCenter}>
                <View>
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
                      {FormatMoney(totalMoneyAll)} VNĐ
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      <LayoutBottom>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 80,
          }}>
          <CustomLabel color={colors.WHITE}>
            Hình thức thanh toán đã chọn{' '}
          </CustomLabel>
        </View>
        <Button
          disable={isLoading}
          bgColor={themeColors.confirm}
          onPress={handlePayment}
          isLoading={isLoading}
          icon={() => <ArrowRight color={colors.WHITE} />}>
          Thanh toán tiền mặt
        </Button>
      </LayoutBottom>
      <AlertConfirm
        title={alertTitle}
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm={() => {
          setIsModalVisible(false);
        }}
      />
    </LayoutGradientBlue>
  );
};

export default CashScreen;
