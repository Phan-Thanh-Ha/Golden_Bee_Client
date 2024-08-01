import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../Constants';
import Button from '../../components/buttons/Button';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/MainStyle';
import { coin_icon } from '../../assets';
import { colors } from '../../styles/Colors';
import Rating from '../../components/Rating';
import Box from '../../components/Box';
import { FormatMoney } from '../../utils/FormatMoney';
import StorageNames from '../../Constants/StorageNames';
import { useDispatch, useSelector } from 'react-redux';
import { mainAction } from '../../Redux/Action';
import { GROUP_USER_ID, removeData, setData } from '../../utils';
import BtnToggle from '../../components/BtnToggle';
import ModalConfirm from '../../components/modal/ModalConfirm';
import { APIImage } from '../../Config/Api';
import Geolocation from '@react-native-community/geolocation';
import ModalUserNotActive from '../../components/modal/ModalUserNotActive';
import BackButton from '../../components/BackButton';
const AccountScreen = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.main.userLogin);
  const [loading, setLoading] = React.useState(false);
  const acceptedOrder = useSelector(state => state.main.acceptedOrder);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [errorGetLocation, setErrorGetLocation] = useState(false);

  const handleChangeToggle = async () => {
    const status = !userLogin?.StateOnline;
    setLoading(true);
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        StateOnline: status ? 1 : 0,
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spOfficer_StateOnline',
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.Status === 'OK') {
        const userLoginChange = {
          ...userLogin,
          StateOnline: !userLogin?.StateOnline,
        };
        mainAction.userLogin(userLoginChange, dispatch);
        await setData(StorageNames.USER_PROFILE, userLoginChange);
        setLoading(false);
      } else {
        AlertToaster('error', result?.ReturnMess);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await removeData(StorageNames.USER_PROFILE);
      mainAction.userLogin(null, dispatch);
      navi.navigate(ScreenNames.AUTH_HOME);
    } catch (error) { }
  };
  const handleClearAccount = async () => {
    try {
      await removeData(StorageNames.USER_PROFILE);
      mainAction.userLogin(null, dispatch);
      navi.navigate(ScreenNames.AUTH_HOME);
    } catch (error) { }
  };
  useEffect(() => {
    OVG_spOfficer_Infor();
  }, [acceptedOrder?.OrderId]);

  const RefreshApp = async () => {
    setLoadingReset(true);
    try {
      await OVG_spOfficer_Infor();
      await CPN_spOfficer_Update_LocationTime();
      setLoadingReset(false);
    } catch (error) {
      setLoadingReset(false);
    }
    setLoadingReset(false);
  };

  const CPN_spOfficer_Update_LocationTime = async () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          if (position?.coords) {
            const params = {
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
            };
            mainAction.locationUpdate(params, dispatch);
            const pr = {
              UserId: userLogin?.OfficerID,
              Lat: position?.coords?.latitude,
              Lng: position?.coords?.longitude,
            };
            const paramss = {
              Json: JSON.stringify(pr),
              func: 'CPN_spOfficer_Update_LocationTime',
              API_key: 'netcoAPIkey2020',
            };
            mainAction.API_spCallServer(paramss, dispatch);
          }
        },
        error => {
          setErrorGetLocation(true);
        },
        { enableHighAccuracy: false, timeout: 20000 },
      );
    } catch (e) {
    }
  };

  const OVG_spOfficer_Infor = async () => {
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        GroupUserId: GROUP_USER_ID,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spOfficer_Infor',
      }
      const result = await mainAction.API_spCallServer(params, dispatch);
      const userChange = {
        CreateTime: userLogin?.CreateTime,
        FilesBC: userLogin?.FilesBC,
        FilesCCCD: userLogin?.FilesCCCD,
        FilesCCCD_BackSide: userLogin?.FilesCCCD_BackSide,
        FilesCV: userLogin?.FilesCV,
        FilesImage: userLogin?.FilesImage,
        OfficerID: userLogin?.OfficerID,
        OfficerName: userLogin?.OfficerName,
        OfficerStatus: result?.StateOnline?.length > 0 ? result?.StateOnline[0]?.OfficerStatus : userLogin?.OfficerStatus,
        Password: userLogin?.Password,
        Phone: userLogin?.Phone,
        State: result?.StateOnline?.length > 0 ? result?.StateOnline[0]?.State : userLogin?.State,
        StateOnline: result?.StateOnline?.length > 0 ? result?.StateOnline[0]?.StateOnline : userLogin?.StateOnline,
        Surplus: result?.TotalPoint?.length > 0 ? result?.TotalPoint[0]?.TotalPoint : userLogin?.Surplus,
        TotalBookingAll: result?.Officer_Booking_Report?.length > 0 ? result?.Officer_Booking_Report[0]?.TotalBookingAll : userLogin?.TotalBookingAll,
        TotalMoneyAll: result?.Officer_Booking_Report?.length > 0 ? result?.Officer_Booking_Report[0]?.TotalMoneyAll : userLogin?.TotalMoneyAll,
        TotalPoint: result?.Officer_Booking_Report?.length > 0 ? result?.Officer_Booking_Report[0]?.TotalPointAll : userLogin?.TotalPoint,
        CustomerRank: result?.Officer_Booking_Report?.length > 0 ? result?.Officer_Booking_Report[0]?.CustomerRank : userLogin?.CustomerRank,
      }
      await setData(StorageNames.USER_PROFILE, userChange);
      mainAction.userLogin(userChange, dispatch);
    } catch (error) { }
  };

  return (
    <LayoutGradientBlue>
      {
        userLogin?.OfficerID === 7347 && (
          <BackButton />
        )
      }
      <ScrollView>
        <Text style={MainStyles.screenTitle}>Tài khoản</Text>
        <View style={MainStyles.contentContainer}>
          <Box height={SCREEN_HEIGHT * 0.01} />
          <Text style={MainStyles.labelTitle}>Thông tin</Text>
          <Box height={SCREEN_HEIGHT * 0.01} />
          <View style={MainStyles.flexRowFlexStart}>
            <Image
              source={{
                uri: APIImage + userLogin?.FilesImage,
              }}
              style={{
                width: 80,
                height: 120,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
            <View>
              <View style={MainStyles.flexRowFlexStart}>
                <Text
                  style={{
                    color: colors.MAIN_BLUE_CLIENT,
                    fontSize: 15,
                    width: 120,
                  }}>
                  Họ tên :
                </Text>
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>
                  {userLogin?.OfficerName}
                </Text>
              </View>
              <View style={MainStyles.flexRowFlexStart}>
                <Text
                  style={{
                    color: colors.MAIN_BLUE_CLIENT,
                    fontSize: 15,
                    width: 120,
                  }}>
                  SĐT :
                </Text>
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>
                  {userLogin?.Phone}
                </Text>
              </View>
              <View style={MainStyles.flexRowFlexStart}>
                <Text
                  style={{
                    color: colors.MAIN_BLUE_CLIENT,
                    fontSize: 15,
                    width: 120,
                  }}>
                  Mã nhân viên :
                </Text>
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>
                  {userLogin?.OfficerID}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              {
                backgroundColor: colors.MAIN_BLUE_CLIENT,
                borderRadius: 10,
                padding: 5,
              },
            ]}>
            <View style={MainStyles.flexRowCenter}>
              <Text style={{ color: colors.WHITE, fontSize: 17, marginRight: 5 }}>
                {userLogin?.CustomerRank || "Cộng tác viên thử việc"}
              </Text>
            </View>
            <View style={MainStyles.flexRowCenter}>
              <Rating rating={5} fontSize={[17, 17]} />
            </View>
          </View>
          <Box height={SCREEN_HEIGHT * 0.01} />
          <Text style={MainStyles.labelTitle}>Tài chính</Text>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: colors.MAIN_BLUE_CLIENT,
                textAlign: 'center',
                fontWeight: '700',
              }}>
              Tài khoản chính
            </Text>
            <View style={MainStyles.flexRowCenter}>
              <Image source={coin_icon} style={{ width: 27, height: 27 }} />
              <Text
                style={{
                  color: colors.MAIN_COLOR_CLIENT,
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                {FormatMoney(userLogin?.Surplus || 0) || 0} VNĐ
              </Text>
            </View>
          </View>

          <Box height={SCREEN_HEIGHT * 0.01} />
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Trạng thái nhận đơn </Text>
            <View style={MainStyles.flexRow}>
              <Text style={[MainStyles.labelTitle, { marginRight: 10 }]}>
                {userLogin?.StateOnline ? 'Bật' : 'Tắt'} nhận đơn
              </Text>
              <BtnToggle
                value={userLogin?.StateOnline}
                onChange={handleChangeToggle}
                isLoading={loading}
              />
            </View>
          </View>
          <Box height={SCREEN_HEIGHT * 0.01} />
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Trạng thái làm việc </Text>
            {userLogin?.OfficerStatus === 0 ? (
              <Text style={MainStyles.labelTitle}>Chưa nhận đơn </Text>
            ) : (
              <Text style={MainStyles.labelTitle}>Đang làm việc </Text>
            )}
          </View>
          <Box height={SCREEN_HEIGHT * 0.01} />
          <Text style={[MainStyles.labelTitle]}>Báo cáo tuần</Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                {
                  marginRight: 10,
                  paddingLeft: 10,
                  fontSize: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                },
              ]}>
              Thu nhập tuần này :
            </Text>
            <Text
              style={[
                MainStyles.labelTitle,
                { marginRight: 10, color: colors.MAIN_COLOR_CLIENT },
              ]}>
              {FormatMoney(userLogin?.TotalMoneyAll || 0) || 0} VNĐ
            </Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                {
                  marginRight: 10,
                  paddingLeft: 10,
                  fontSize: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                },
              ]}>
              Công việc tuần này :
            </Text>
            {
              userLogin?.TotalBookingAll === 0 || !userLogin?.TotalBookingAll ? (
                <Text
                  style={[
                    MainStyles.labelTitle,
                    { marginRight: 10, color: colors.MAIN_BLUE_CLIENT },
                  ]}>
                  Chưa có dịch vụ hoàn thành
                </Text>
              ) : (
                <Text
                  style={[
                    MainStyles.labelTitle,
                    { marginRight: 10, color: colors.MAIN_BLUE_CLIENT },
                  ]}>
                  {userLogin?.TotalBookingAll} Dịch vụ đã hoàn thành
                </Text>
              )
            }
          </View>
          <Box height={SCREEN_HEIGHT * 0.01} />
          <Text style={[MainStyles.labelTitle]}>Hỗ trợ</Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                {
                  marginRight: 10,
                  paddingLeft: 10,
                  fontSize: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                  width: 200,
                },
              ]}>
              Thứ 2 đến thứ 7 :
            </Text>
            <Text style={[{ marginRight: 10, color: colors.MAIN_BLUE_CLIENT }]}>
              Chủ nhật
            </Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                {
                  marginRight: 10,
                  paddingLeft: 10,
                  fontSize: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                  width: 200,
                },
              ]}>
              08:00 - 12:00 :
            </Text>
            <Text style={[{ marginRight: 10, color: colors.MAIN_BLUE_CLIENT }]}>
              09:00 - 12:00
            </Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                {
                  marginRight: 10,
                  paddingLeft: 10,
                  fontSize: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                  width: 200,
                },
              ]}>
              08:00 - 12:00 :
            </Text>
            <Text style={[{ marginRight: 10, color: colors.MAIN_BLUE_CLIENT }]}>
              09:00 - 12:00
            </Text>
          </View>
          <Box height={SCREEN_HEIGHT * 0.02} />
        </View>
        <View style={MainStyles.contentContainer}>
          <Box height={SCREEN_HEIGHT * 0.01} />
          <Text style={MainStyles.labelTitle}>Liên hệ tổng đài</Text>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text
              style={{
                marginRight: 10,
                paddingLeft: 10,
                fontSize: 15,
                color: colors.MAIN_BLUE_CLIENT,
                marginVertical: 10,
              }}>
              Liên hệ tổng đài để dược hỗ trợ các thắc mắc liên quan trong quá
              trình hoạt động và sử dụng ứng dụng.
            </Text>
          </View>
          <Button
            fontSize={15}
            paddingHorizontal={10}
            paddingVertical={7}
            onPress={() => {
              Linking.openURL(`tel:${'0922277782'}`);
            }}>
            Gọi tổng đài
          </Button>
          <Box height={SCREEN_HEIGHT * 0.01} />
        </View>
        <View style={MainStyles.contentContainer}>
          <Box height={SCREEN_HEIGHT * 0.01} />
          <Text style={MainStyles.labelTitle}>Làm mới ứng dụng</Text>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text
              style={{
                marginRight: 10,
                paddingLeft: 10,
                fontSize: 15,
                color: colors.MAIN_BLUE_CLIENT,
                marginVertical: 10,
              }}>
              Trạng thái hoạt động và các dữ liệu về tài khoản sẽ được làm mới
              và hỗ trợ khắc phục sự cố trong trường hợp cần thiết !
            </Text>
          </View>
          <Button
            fontSize={15}
            paddingHorizontal={10}
            paddingVertical={7}
            onPress={RefreshApp}
            isLoading={loadingReset}
            disable={loadingReset}>
            Làm mới ứng dụng
          </Button>
          <Box height={SCREEN_HEIGHT * 0.01} />
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Button
            onPress={handleLogout}
            textColor={colors.WHITE}
            bgColor={colors.MAIN_BLUE_CLIENT}
            paddingVertical={5}>
            Đăng xuất
          </Button>
        </View>
        {
          userLogin?.Phone === "0943214791" && (
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => setIsModalVisible(true)}
                textColor={colors.WHITE}
                bgColor={'#F44336'}
                paddingVertical={5}>
                Xóa tài khoản
              </Button>
            </View>
          )
        }
        <Box height={SCREEN_HEIGHT * 0.2} />
      </ScrollView>
      <ModalConfirm
        title={
          'Bạn đnag muốn xóa tài khoản này ! bạn có chắc chắn muốn xóa tài khoản hiện tại không ? Mọi thông tin của bạn sẽ không còn trên hệ thống sau khi bạn xác nhận !'
        }
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm={handleClearAccount}
      />
      <ModalUserNotActive
        title={
          'Không thể lấy vị trí hiện tại của bạn, vui lòng kiểm tra và bật vị trí khi dùng ứng dụng. Hoặc liên hệ quản trị để được hỗ trợ giải quyết !'
        }
        isModalVisible={errorGetLocation}
        setModalVisible={setErrorGetLocation}
        onConfirm={() => setErrorGetLocation(false)}
      />
    </LayoutGradientBlue>
  );
};

export default AccountScreen;
