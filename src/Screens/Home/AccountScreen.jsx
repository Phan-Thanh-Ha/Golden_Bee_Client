import React, { useEffect } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import { responsivescreen } from '../../utils/responsive-screen';
import { removeData } from '../../utils';
import BtnToggle from '../../components/BtnToggle';


const AccountScreen = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.main.userLogin);
  const [loading, setLoading] = React.useState(false);

  const handleChangeToggle = async () => {
    setLoading(true);
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        StateOnline: userLogin?.StateOnline ? 0 : 1,
        GroupUserId: 10060
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spOfficer_StateOnline",
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      console.log("--------------------------")
      console.log("--------------------------", result)
      console.log("--------------------------")
      if (result?.Status === "OK") {
        const userLoginChange = {
          ...userLogin,
          StateOnline: !userLogin?.StateOnline
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
      navi.navigate(ScreenNames.AUTH_HOME);
    } catch (error) {
    }
  };

  const user = {
    name: "Nguyễn Văn Anh",
    sdt: "0123456789",
    cmnd: "0123456789",
    staffId: "0123456789",
    level: 1,
    point: 2000
  }

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
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15, width: 120 }}>Họ tên :</Text>
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>{userLogin?.OfficerName}</Text>
              </View>
              <View style={MainStyles.flexRowFlexStart}>
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15, width: 120 }}>SĐT :</Text>
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>{userLogin?.Phone}</Text>
              </View>
              <View style={MainStyles.flexRowFlexStart}>
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15, width: 120 }}>CMND/CCCD :</Text>
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>{userLogin?.PostOfficeId}</Text>
              </View>
              <View style={MainStyles.flexRowFlexStart}>
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15, width: 120 }}>Mã nhân viên :</Text>
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>{userLogin?.PostOfficeId}</Text>
              </View>
            </View>
          </View>
          <View style={[MainStyles.flexRowCenter, { backgroundColor: colors.MAIN_BLUE_CLIENT, borderRadius: 10, padding: 5 }]}>
            <Text style={{ color: colors.WHITE, fontSize: 17, marginRight: 5 }}>Cộng tác viên cao cấp</Text>
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
              }}
            >Tài khoản chính</Text>
            <View style={MainStyles.flexRowCenter}>
              <Image
                source={coin_icon}
                style={{ width: 27, height: 27 }}
              />
              <Text style={
                {
                  color: colors.MAIN_COLOR_CLIENT,
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: '700',
                }
              }>{FormatMoney(userLogin?.Surplus)} đ</Text>
            </View>
          </View>
          <Button fontSize={15} paddingHorizontal={10} paddingVertical={7}>
            Nạp thêm tiền
          </Button>
          <Box height={10} />
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Hành trình</Text>
            <Text style={[MainStyles.labelTitle, { color: colors.RED }]}>Cấp {user.level}</Text>
            {/* <ToggleCustom /> */}
            <View style={MainStyles.flexRow}>
              <Text style={[MainStyles.labelTitle, { marginRight: 10 }]}>{userLogin.StateOnline ? 'Bật' : 'Tắt'} nhận đơn</Text>
              <BtnToggle value={userLogin?.StateOnline} onChange={handleChangeToggle} isLoading={loading} />
            </View>
          </View>
          <View style={MainStyles.flexRowFlexEnd}>
            <Button
              textColor={colors.MAIN_BLUE_CLIENT}
              bgColor={'transparent'}
              fontSize={12}
              textMargin={0}
              btnMargin={0}
              icon={() => <Day color={colors.MAIN_BLUE_CLIENT} size={20} />}
            >Đặt lịch làm việc</Button>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={[MainStyles.labelTitle, { marginRight: 10 }]}>Điểm ưu đãi</Text>
            <Image
              source={cirtificate}
              style={{
                width: 20,
                height: 20,
                marginRight: 5
              }}
            />
            <Text style={[MainStyles.labelTitle, { marginRight: 10 }]}>{FormatMoney(user.point)} point</Text>
          </View>
          <Box height={10} />
          <Text style={[MainStyles.labelTitle]}>Báo cáo tuần</Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={[{ marginRight: 10, paddingLeft: 10, fontSize: 15, color: colors.MAIN_BLUE_CLIENT }]}>Thu nhập tuần này :</Text>
            <Text style={[MainStyles.labelTitle, { marginRight: 10, color: colors.MAIN_COLOR_CLIENT }]}>{FormatMoney(2000000)} đ</Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={[{ marginRight: 10, paddingLeft: 10, fontSize: 15, color: colors.MAIN_BLUE_CLIENT }]}>Công việc tuần này :</Text>
            <Text style={[MainStyles.labelTitle, { marginRight: 10, color: colors.MAIN_BLUE_CLIENT }]}>{10} task đã hoàn thành</Text>
          </View>
          <Box height={10} />
          <Text style={[MainStyles.labelTitle]}>Hỗ trợ</Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={[{ marginRight: 10, paddingLeft: 10, fontSize: 15, color: colors.MAIN_BLUE_CLIENT, width: 200 }]}>Thứ 2 đến thứ 7 :</Text>
            <Text style={[{ marginRight: 10, color: colors.MAIN_BLUE_CLIENT }]}>Chủ nhật</Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={[{ marginRight: 10, paddingLeft: 10, fontSize: 15, color: colors.MAIN_BLUE_CLIENT, width: 200 }]}>08:00 - 12:00 :</Text>
            <Text style={[{ marginRight: 10, color: colors.MAIN_BLUE_CLIENT }]}>09:00 - 12:00</Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={[{ marginRight: 10, paddingLeft: 10, fontSize: 15, color: colors.MAIN_BLUE_CLIENT, width: 200 }]}>08:00 - 12:00 :</Text>
            <Text style={[{ marginRight: 10, color: colors.MAIN_BLUE_CLIENT }]}>09:00 - 12:00</Text>
          </View>

          <Button fontSize={15} paddingHorizontal={10} paddingVertical={7}>
            Gọi tổng đài
          </Button>
        </View>
        <View style={MainStyles.contentContainer}>
          <Text style={MainStyles.labelTitle}>Khởi động lại ứng dụng</Text>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={{ marginRight: 10, paddingLeft: 10, fontSize: 15, color: colors.MAIN_BLUE_CLIENT, marginVertical: 10 }}>Lịch đăng ký làm việc sẽ được làm mới khi khởi động ứng dụng !</Text>
          </View>
          <Button fontSize={15} paddingHorizontal={10} paddingVertical={7}>
            Khởi động lại ứng dụng
          </Button>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Button
            onPress={handleLogout}
            textColor={colors.RED}
            bgColor={colors.WHITE}
            paddingVertical={5}
          >Đăng xuất</Button>
        </View>
        <Box height={SCREEN_HEIGHT * 0.02} />
        <Button
          textColor={colors.RED}
          bgColor={colors.WHITE}
          paddingVertical={5}
          onPress={() => navi.navigate(ScreenNames.FIRE_STORE)}
        >Firestore check</Button>
        <Box height={responsivescreen.height(10)} />
      </ScrollView>
    </LayoutGradientBlue>
  );
};

export default AccountScreen;
