import React from 'react';
import {Image, Linking, Pressable, View} from 'react-native';
import {Icon, Text} from '@ui-kitten/components';
import {colors, themeColors} from '../styles/Colors';
import MainStyles, {SCREEN_WIDTH} from '../styles/MainStyle';
import {FormatMoney} from '../utils/FormatMoney';
import Button from './buttons/Button';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../Constants';
import {coin_icon} from '../assets';
import {useDispatch, useSelector} from 'react-redux';
import {mainAction} from '../Redux/Action';
import {OVG_UpdateStatusOrder} from '../firebaseService/HandleOrder';
import {RoundUpNumber} from '../utils/RoundUpNumber';
import {dateTimeFormat} from '../utils/FormatTime';

const CardNewJob = ({data}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.main.userLogin);
  const [isLoading, setIsLoading] = React.useState(false);
  const acceptedOrder = useSelector(state => state.main.acceptedOrder);
  const location = useSelector(state => state.main.locationTime);
  const payment = () => {
    if (data?.DataService?.Payment) {
      navigation.navigate(ScreenNames.PAYMENT, {data});
    } else {
      navigation.navigate(ScreenNames.CASH, {data});
    }
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
        IsConfirm: 2,
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spOfficer_Booking_Save_V1',
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.Status === 'OK') {
        //call update firebase
        OVG_UpdateStatusOrder(data?.OrderId, 3);
        mainAction.acceptedOrder(
          {
            ...acceptedOrder,
            StatusOrder: 3,
          },
          dispatch,
        );
        setIsLoading(false);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      return;
    } catch {
      //
    }
  };
  const HandleConfirm = () => {
    OVG_spOfficer_Booking_Save(data);
  };

  const handleReadyGo = () => {
    OVG_UpdateStatusOrder(data?.OrderId, 2);
  };

  return (
    <View>
      <Pressable>
        {/* <Pressable onPress={openModal}> */}
        <View style={MainStyles.cardJob}>
          <View style={MainStyles.flexRowCenter}>
            <Text style={[MainStyles.titleCardJob, {textAlign: 'center'}]}>
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
          {data?.DataService?.CustomerPhone && (
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
          )}
          {data?.DataService?.TotalStaff && (
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
          )}
          {data?.DataService?.TotalRoom && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="share-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  Số phòng: {data?.DataService?.TotalRoom} phòng
                </Text>
              </View>
            </View>
          )}
          {data?.DataService?.SelectOption?.length && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="share-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  Loại công việc:{' '}
                  {data?.DataService?.SelectOption[0]?.OptionName}
                </Text>
              </View>
            </View>
          )}
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
                  Làm việc trong:{' '}
                  {RoundUpNumber(data?.DataService?.TimeWorking, 0)} giờ
                </Text>
              </View>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="plus-square-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Dịch vụ thêm:{' '}
                {data?.DataService?.OtherService?.length > 0
                  ? ''
                  : 'Không kèm dịch vụ thêm'}
              </Text>
            </View>
            {data?.DataService?.OtherService?.length > 0 &&
              data?.DataService?.OtherService.map(item => (
                <View
                  key={item?.ServiceDetailId?.toString()}
                  style={MainStyles.flexRowFlexStart}>
                  <Icon
                    style={{
                      marginLeft: SCREEN_WIDTH * 0.07,
                      width: 20,
                      height: 20,
                    }}
                    fill="#3366FF"
                    name="plus-outline"
                  />
                  <Text style={[MainStyles.textCardJob]}>
                    {item?.ServiceDetailName}
                  </Text>
                </View>
              ))}
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
          {data?.DataService?.Voucher?.length > 0 && (
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
                ? data?.DataService?.Voucher.map(item => (
                    <View
                      key={item?.VoucherId.toString()}
                      style={MainStyles.flexRowFlexStart}>
                      <Icon
                        style={{
                          marginLeft: SCREEN_WIDTH * 0.07,
                          width: 20,
                          height: 20,
                        }}
                        fill="#3366FF"
                        name="plus-outline"
                      />
                      <Text style={[MainStyles.textCardJob]}>
                        CODE: {item?.VoucherCode} - giảm{' '}
                        {item?.TypeDiscount === 1
                          ? item?.Discount + '%'
                          : FormatMoney(item?.Discount) + ' VND'}
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
                name="calendar-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Thời gian tạo: {dateTimeFormat(data?.CreateAt, 2)}
              </Text>
            </View>
          </View>
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
              <Image source={coin_icon} style={{width: 22, height: 22}} />
              <Text
                style={{
                  color: colors.MAIN_COLOR_CLIENT,
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                {FormatMoney(data?.DataService?.PriceAfterDiscount)} VNĐ
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
      {acceptedOrder?.StatusOrder === 1 ? (
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginHorizontal: 2}}>
              <Button
                fontSize={14}
                disable={isLoading}
                paddingHorizontal={10}
                paddingVertical={8}
                bgColor={themeColors.confirm}
                onPress={handleReadyGo}
                isLoading={isLoading}>
                <View style={MainStyles.flexRowCenter}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill="#FFFF"
                    name="navigation-2-outline"
                  />
                  <Text style={{color: colors.WHITE, textAlign: 'center'}}>
                    Bắt đầu đi
                  </Text>
                </View>
              </Button>
            </View>
            <View style={{flex: 1, marginHorizontal: 2}}>
              <Button
                fontSize={14}
                disable={isLoading}
                paddingHorizontal={10}
                paddingVertical={8}
                bgColor={themeColors.cancel}
                onPress={() => {
                  Linking.openURL(`tel:${data?.DataService?.CustomerPhone}`);
                }}
                isLoading={false}>
                <View style={MainStyles.flexRow}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill="#FFFF"
                    name="phone-outline"
                  />
                  <Text style={{color: colors.WHITE, textAlign: 'center'}}>
                    Liên Hệ KH
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
      ) : null}
      {acceptedOrder?.StatusOrder === 2 ? (
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginHorizontal: 2}}>
              <Button
                fontSize={14}
                disable={isLoading}
                paddingHorizontal={10}
                paddingVertical={8}
                bgColor={themeColors.confirm}
                onPress={HandleConfirm}
                isLoading={isLoading}>
                <View style={MainStyles.flexRow}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill="#FFFF"
                    name="play-circle-outline"
                  />
                  <Text style={{color: colors.WHITE, textAlign: 'center'}}>
                    Bắt đầu làm
                  </Text>
                </View>
              </Button>
            </View>
            <View style={{flex: 1, marginHorizontal: 2}}>
              <Button
                fontSize={14}
                disable={isLoading}
                paddingHorizontal={10}
                paddingVertical={8}
                bgColor={themeColors.cancel}
                onPress={() => {
                  Linking.openURL(`tel:${data?.DataService?.CustomerPhone}`);
                }}
                isLoading={false}>
                <View style={MainStyles.flexRow}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill="#FFFF"
                    name="phone-outline"
                  />
                  <Text style={{color: colors.WHITE, textAlign: 'center'}}>
                    Liên Hệ KH
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
      ) : null}
      {acceptedOrder?.StatusOrder === 3 ? (
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Button
              paddingHorizontal={10}
              paddingVertical={8}
              bgColor={colors.DEFAULT_GREEN}
              fontSize={16}
              onPress={payment}>
              <View style={MainStyles.flexRow}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#FFFF"
                  name="credit-card-outline"
                />
                <Text style={{color: colors.WHITE, textAlign: 'center'}}>
                  Thanh toán dịch vụ
                </Text>
              </View>
            </Button>
          </View>
        </View>
      ) : null}
    </View>
  );
};

CardNewJob.defaultProps = {
  data: {},
};
CardNewJob.propTypes = {
  data: {},
};

export default CardNewJob;
