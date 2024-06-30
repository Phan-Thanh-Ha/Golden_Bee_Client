import React, { useCallback } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { colors } from '../styles/Colors';
import MainStyles from '../styles/MainStyle';
import { FormatMoney } from '../utils/FormatMoney';
import Button from './buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../Constants';
import {
  cirtificate,
  coin_icon,
  ic_chronometer,
  ic_clearning,
  ic_clearning_basic,
  ic_glass,
  ic_hourse_clearning,
  ic_living_room,
  ic_location,
  ic_note,
  ic_person,
  ic_schedule,
} from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { mainAction } from '../Redux/Action';
import { updateStatusOrder } from '../firebaseService/HandleOrder';

const CardNewJob = ({ data, modalRef }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.main.userLogin);
  const [confirm, setConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const acceptedOrder = useSelector(state => state.main.acceptedOrder);
  const location = useSelector(state => state.main.locationTime);
  const OVG_spOfficer_Booking_Save = async data => {
    setIsLoading(true);
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        BookingId: parseInt(data?.OrderId),
        LatOfficer: location?.latitude,
        LngOfficer: location?.longitude,
        OfficerName: userLogin?.OfficerName,
        IsConfirm: 2,
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spOfficer_Booking_Save',
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.Status === 'OK') {
        //call update firebase
        updateStatusOrder(data?.OrderId, 3);
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
    } catch (error) { }
  };
  const HandleConfirm = () => {
    OVG_spOfficer_Booking_Save(data);
  };

  const handleReadyGo = () => {
    updateStatusOrder(data?.OrderId, 2);
  };
  const HandlePayment = () => {
    navigation.navigate(ScreenNames.PAYMENT, { data });
  };

  const HandleCash = () => {
    navigation.navigate(ScreenNames.CASH, { data });
  };

  const openModal = () => {
    modalRef.current?.openModal(data);
  };
  const renderItem = ({ item }) => (
    <View>
      <Text style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>
        🔸{item.ServiceDetailName}
      </Text>
    </View>
  );
  return (
    <View>
      <Pressable onPress={openModal}>
        <View style={MainStyles.cardJob}>
          <View style={MainStyles.flexRowCenter}>
            <Text style={[MainStyles.titleCardJob, { textAlign: 'center' }]}>
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
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <View style={MainStyles.flexRowFlexStart}>
                <Image source={ic_person} style={{ width: 22, height: 22 }} />
                <Text style={MainStyles.textCardJob}>
                  {data?.DataService?.TotalStaff} nhân viên
                </Text>
              </View>
              {data?.DataService?.TotalRoom ? (
                <View style={MainStyles.flexRowFlexStart}>
                  <Image
                    source={ic_living_room}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text style={MainStyles.textCardJob}>
                    {data?.DataService?.TotalRoom} phòng
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <View style={MainStyles.flexRowFlexEnd}>
                <Image source={ic_glass} style={{ width: 22, height: 22 }} />
                <Text style={MainStyles.textCardJob}>
                  {' '}
                  trong {data?.DataService?.TimeWorking} giờ
                </Text>
              </View>
              <View style={MainStyles.flexRowFlexEnd}>
                <Image
                  source={ic_chronometer}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={MainStyles.textCardJob}>làm ngay</Text>
              </View>
            </View>
          </View>
          {data?.DataService?.IsPremium ? (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Image source={cirtificate} style={{ width: 22, height: 22 }} />
                <Text style={MainStyles.textCardJob}>Dịch vụ Premium</Text>
              </View>
            </View>
          ) : (
            <View View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Image
                  source={ic_clearning_basic}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={MainStyles.textCardJob}>Dịch vụ thông thường</Text>
              </View>
            </View>
          )}

          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image source={ic_clearning} style={{ width: 22, height: 22 }} />
              <Text style={MainStyles.textCardJob}>
                Dịch vụ thêm :{' '}
                {data?.DataService?.OtherService?.length > 0
                  ? ''
                  : 'Không kèm dịch vụ thêm'}
              </Text>
            </View>
            {data?.DataService?.OtherService?.length > 0 ? (
              <FlatList
                data={data?.DataService?.OtherService}
                renderItem={renderItem}
                keyExtractor={item => item.ServiceDetailId.toString()}
              />
            ) : null}
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image source={ic_location} style={{ width: 22, height: 22 }} />
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
                {FormatMoney(data?.DataService?.TotalPrice)} vnđ
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
      {acceptedOrder?.StatusOrder === 1 ? (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Button
              fontSize={14}
              disable={isLoading}
              paddingHorizontal={10}
              paddingVertical={8}
              bgColor={colors.CONFIRM2}
              onPress={handleReadyGo}
              isLoading={isLoading}>
              Bắt đầu đi
            </Button>
          </View>
        </View>
      ) : null}
      {
        acceptedOrder?.StatusOrder === 2 ? (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Button
                fontSize={14}
                disable={isLoading}
                paddingHorizontal={10}
                paddingVertical={8}
                bgColor={colors.CONFIRM2}
                onPress={HandleConfirm}
                isLoading={isLoading}>
                Bắt đầu làm việc
              </Button>
            </View>
          </View>
        ) : null
      }
      {
        acceptedOrder?.StatusOrder === 3 ? (
          (
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Button
                  paddingHorizontal={10}
                  paddingVertical={8}
                  bgColor={colors.SOFT_GREEN}
                  textColor={colors.WHITE}
                  fontSize={14}
                  onPress={HandlePayment}>
                  Chuyển khoản
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  paddingHorizontal={10}
                  paddingVertical={8}
                  bgColor={colors.DEFAULT_GREEN}
                  fontSize={14}
                  onPress={HandleCash}>
                  Tiền mặt
                </Button>
              </View>
            </View>
          )
        ) : null
      }
    </View>
  );
};

export default CardNewJob;
