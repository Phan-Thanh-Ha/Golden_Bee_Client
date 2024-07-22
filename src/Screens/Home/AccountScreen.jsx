import React, { useState } from 'react';
import { Text, View, Image, ScrollView, Linking } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import { GROUP_USER_ID, getData, removeData, setData } from '../../utils';
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
  const location = useSelector(state => state.main.locationTime);
  const [loadingReset, setLoadingReset] = useState(false);
  const [errorGetLocation, setErrorGetLocation] = useState(false);
  const [dataReport, setDataReport] = useState({});

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
      navi.navigate(ScreenNames.ABOUT);
    } catch (error) { }
  };
  const handleClearAccount = async () => {
    try {
      await removeData(StorageNames.USER_PROFILE);
      mainAction.userLogin(null, dispatch);
      navi.navigate(ScreenNames.AUTH_HOME);
    } catch (error) { }
  };

  useFocusEffect(
    React.useCallback(() => {
      OVG_spOfficer_Wallet_Money();
      OVG_spOfficer_Booking_Report();
    }, [acceptedOrder]),
  );
  const [totalPoint, setTotalPoint] = React.useState(userLogin?.Surplus);

  const OVG_spOfficer_Wallet_Money = async () => {
    const userLogin = await getData(StorageNames.USER_PROFILE);
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        GroupUserId: GROUP_USER_ID,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spOfficer_Wallet_Money',
      };
      // console.log('OVG_spOfficer_Wallet_Money', params);
      const result = await mainAction.API_spCallServer(params, dispatch);
      // console.log('OVG_spOfficer_Wallet_Money', result);
      if (result && result[0]?.TotalPoint !== userLogin?.Surplus) {
        setTotalPoint(result[0]?.TotalPoint);
        const userChange = {
          ...userLogin,
          Surplus: result[0]?.TotalPoint,
        };
        setData(StorageNames.USER_PROFILE, userChange);
        mainAction.userLogin(userChange, dispatch);
      }
    } catch (error) { }
  };
  const OVG_spOfficer_Booking_Report = async () => {
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        GroupUserId: GROUP_USER_ID,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spOfficer_Booking_Report',
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      setTotalPoint(result[0]?.TotalPoint);
      const userChange = {
        ...userLogin,
        TotalBookingAll: result[0]?.TotalBookingAll,
        TotalMoneyAll: result[0]?.TotalMoneyAll,

      };
      setData(StorageNames.USER_PROFILE, userChange);
      mainAction.userLogin(userChange, dispatch);
    } catch (error) { }
  };
  const user = {
    name: 'Nguyễn Văn Anh',
    sdt: '0123456789',
    cmnd: '0123456789',
    staffId: '0123456789',
    level: 1,
    point: 2000,
  };
  const CPN_spOfficer_Update_LocationTime = async (lat, lng, officerId) => {
    try {
      // user ưu tiên không check fake
      const pr = {
        UserId: officerId,
        Lat: lat,
        Lng: lng,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'CPN_spOfficer_Update_LocationTime',
        API_key: 'netcoAPIkey2020',
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result) {
        if (result[0].Result == "OK") {
          // console.log("CPN_spOfficer_Update_LocationTime ------------", result);
        }
      }
    } catch (e) {
    }
  };
  const RefreshApp = async () => {
    setLoadingReset(true);
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        GroupUserId: GROUP_USER_ID,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spStatus_Officer',
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.length > 0) {
        const userChange = {
          ...userLogin,
          OfficerStatus: result[0]?.OfficerStatus,
          StateOnline: result[0]?.StateOnline,
        };
        await setData(StorageNames.USER_PROFILE, userChange);
        mainAction.userLogin(userChange, dispatch);
      }
      Geolocation.getCurrentPosition(
        position => {
          if (position.coords) {
            const params = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            mainAction.locationUpdate(params, dispatch);
          }
        },
        error => {
          setErrorGetLocation(true);
          // console.log('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
      CPN_spOfficer_Update_LocationTime(
        location?.latitude,
        location?.longitude,
        userLogin?.OfficerID,
      );

      const getLink = async () => {
        try {
          const params = {
            Json: userLogin?.Password,
            func: "",
          };
          const password = await mainAction.DecryptString(params, dispatch);

          const pr = {
            UserName: userLogin?.Phone,
            Password: password,
            GroupUserId: 10060,
          };
          if (password) {
            const paramss = {
              Json: JSON.stringify(pr),
              func: 'AVG_spOfficer_Login',
            };
            const result = await mainAction.API_spCallServer(paramss, dispatch);
            if (result?.Status === 'OK') {
              await setData(StorageNames.USER_PROFILE, result.Result[0]);
              mainAction.userLogin(result.Result[0], dispatch);
              setLoadingReset(false);
            } else {
              setLoadingReset(false);
            }
            setLoadingReset(false);
          }
        } catch (error) {
        }
      };
      await getLink();
      setLoadingReset(false);
    } catch (error) {
      setLoadingReset(false);
    }
    setLoadingReset(false);
  };
  return (
    <LayoutGradientBlue>
      {
        userLogin?.OfficerID === 7347 ? (
          <BackButton />
        ) : null
      }
      <ScrollView>
        <Text style={MainStyles.screenTitle}>Tài khoản</Text>
        <View style={MainStyles.contentContainer}>
          <Text style={MainStyles.labelTitle}>Thông tin</Text>
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
                  CMND/CCCD :
                </Text>
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>
                  {userLogin?.OfficerID}
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
              MainStyles.flexRowCenter,
              {
                backgroundColor: colors.MAIN_BLUE_CLIENT,
                borderRadius: 10,
                padding: 5,
              },
            ]}>
            <Text style={{ color: colors.WHITE, fontSize: 17, marginRight: 5 }}>
              Cộng tác viên cao cấp
            </Text>
            <Rating rating={5} fontSize={[17, 17]} />
          </View>
          <View style={MainStyles.flexRowCenter}>
            <View
              style={{
                width: SCREEN_WIDTH,
                height: 1,
                backgroundColor: colors.MAIN_BLUE_CLIENT,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
          </View>
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
                {FormatMoney(userLogin?.Surplus || 0) || 0} đ
              </Text>
            </View>
          </View>
          <View style={MainStyles.flexRowCenter}>
            <View
              style={{
                width: SCREEN_WIDTH,
                height: 1,
                backgroundColor: colors.MAIN_BLUE_CLIENT,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
          </View>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Hành trình</Text>
            <Text style={[MainStyles.labelTitle, { color: colors.RED }]}>
              Cấp {user.level}
            </Text>
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
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Trạnh thái làm việc </Text>
            {userLogin?.OfficerStatus === 0 ? (
              <Text style={MainStyles.labelTitle}>Chưa nhận đơn </Text>
            ) : (
              <Text style={MainStyles.labelTitle}>Đang làm việc </Text>
            )}
          </View>
          <View style={MainStyles.flexRowCenter}>
            <View
              style={{
                width: SCREEN_WIDTH,
                height: 1,
                backgroundColor: colors.MAIN_BLUE_CLIENT,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
          </View>
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
              {FormatMoney(userLogin?.TotalMoneyAll || 0) || 0} đ
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
                  chưa có dịch vụ đã hoàn thành
                </Text>
              ) : (
                <Text
                  style={[
                    MainStyles.labelTitle,
                    { marginRight: 10, color: colors.MAIN_BLUE_CLIENT },
                  ]}>
                  {userLogin?.TotalBookingAll} dịch vụ đã hoàn thành
                </Text>
              )
            }
          </View>
          <Box height={10} />
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
        </View>
        <View style={MainStyles.contentContainer}>
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
        <View style={{ margin: 10 }}>
          <Button
            onPress={() => setIsModalVisible(true)}
            textColor={colors.WHITE}
            bgColor={'#F44336'}
            paddingVertical={5}>
            Xóa tài khoản
          </Button>
        </View>
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
        onConfirm={RefreshApp}
      />
    </LayoutGradientBlue>
  );
};

export default AccountScreen;
