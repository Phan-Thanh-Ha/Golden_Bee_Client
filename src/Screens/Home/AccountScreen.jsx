import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, Linking } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../Constants';
import Button from '../../components/buttons/Button';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import MainStyles, { SCREEN_HEIGHT } from '../../styles/MainStyle';
import { cirtificate, coin_icon } from '../../assets';
import { colors } from '../../styles/Colors';
import Rating from '../../components/Rating';
import Box from '../../components/Box';
import { FormatMoney } from '../../utils/FormatMoney';
import ToggleCustom, { Toggle } from '../../components/ToggleCustom';
import Day from '../../components/svg/Day';
import StorageNames from '../../Constants/StorageNames';
import { useDispatch, useSelector } from 'react-redux';
import { mainAction } from '../../Redux/Action';
import { GROUP_USER_ID, getData, removeData, setData } from '../../utils';
import BtnToggle from '../../components/BtnToggle';
import ModalConfirm from '../../components/modal/ModalConfirm';

const AccountScreen = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.main.userLogin);
  const [loading, setLoading] = React.useState(false);
  const acceptedOrder = useSelector(state => state.main.acceptedOrder);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
  }

  useFocusEffect(
    React.useCallback(() => {
      OVG_spOfficer_Wallet_Money();
    }, [acceptedOrder]),
  );
  const [totalPoint, setTotalPoint] = React.useState(userLogin?.Surplus);

  const OVG_spOfficer_Wallet_Money = async () => {
    const userLogin = await getData(StorageNames.USER_PROFILE);
    try {
      const pr = {
        OfficerId: userLogin.OfficerID,
        GroupUserId: GROUP_USER_ID,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spOfficer_Wallet_Money',
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
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
  const user = {
    name: 'Nguyễn Văn Anh',
    sdt: '0123456789',
    cmnd: '0123456789',
    staffId: '0123456789',
    level: 1,
    point: 2000,
  };

  return (
    <LayoutGradientBlue>
      <ScrollView>
        <Text style={MainStyles.screenTitle}>Tài khoản</Text>
        <View style={MainStyles.contentContainer}>
          <Text style={MainStyles.labelTitle}>Thông tin</Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Image
              source={coin_icon}
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
          <Box height={10} />
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
                {FormatMoney(totalPoint)} đ
              </Text>
            </View>
          </View>
          <Button fontSize={15} paddingHorizontal={10} paddingVertical={7}>
            Nạp thêm tiền
          </Button>
          <Box height={10} />
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Hành trình</Text>
            <Text style={[MainStyles.labelTitle, { color: colors.RED }]}>
              Cấp {user.level}
            </Text>
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
          <View style={MainStyles.flexRowFlexEnd}>
            <Button
              textColor={colors.MAIN_BLUE_CLIENT}
              bgColor={'transparent'}
              fontSize={12}
              textMargin={0}
              btnMargin={0}
              icon={() => <Day color={colors.MAIN_BLUE_CLIENT} size={20} />}>
              Đặt lịch làm việc
            </Button>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={[MainStyles.labelTitle, { marginRight: 10 }]}>
              Điểm ưu đãi
            </Text>
            <Image
              source={cirtificate}
              style={{
                width: 20,
                height: 20,
                marginRight: 5,
              }}
            />
            <Text style={[MainStyles.labelTitle, { marginRight: 10 }]}>
              {FormatMoney(user.point)} point
            </Text>
          </View>
          <Box height={10} />
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
              {FormatMoney(2000000)} đ
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
            <Text
              style={[
                MainStyles.labelTitle,
                { marginRight: 10, color: colors.MAIN_BLUE_CLIENT },
              ]}>
              {10} task đã hoàn thành
            </Text>
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
          <Text style={MainStyles.labelTitle}>Khởi động lại ứng dụng</Text>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text
              style={{
                marginRight: 10,
                paddingLeft: 10,
                fontSize: 15,
                color: colors.MAIN_BLUE_CLIENT,
                marginVertical: 10,
              }}>
              Lịch đăng ký làm việc sẽ được làm mới khi khởi động ứng dụng !
            </Text>
          </View>
          <Button fontSize={15} paddingHorizontal={10} paddingVertical={7}>
            Khởi động lại ứng dụng
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
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      <ModalConfirm
        title={"Bạn đnag muốn xóa tài khoản này ! bạn có chắc chắn muốn xóa tài khoản hiện tại không ? Mọi thông tin của bạn sẽ không còn trên hệ thống sau khi bạn xác nhận !"}
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm={handleClearAccount}
      />
    </LayoutGradientBlue >
  );
};

export default AccountScreen;
