import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {mainAction} from '../Redux/Action';
import {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/Colors';
import UserHeader from '../components/UserHeader';
import StatusBarCustom from '../components/StatusBarCustom';
import LayoutBottom from '../components/layouts/LayoutBottom';
import BtnDouble from '../components/BtnDouble';
import MainStyles, {SCREEN_HEIGHT, SCREEN_WIDTH} from '../styles/MainStyle';
import {ScreenNames} from '../Constants';
import Box from '../components/Box';
import {MenuComponent} from '../components/MenuComponent ';
import {cirtificate, gift} from '../assets';
import {CarouselItem} from '../components/ImageSliderBox';
import React from 'react';
const HomeMainScreen = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.main.userLogin);
  const [dataCarousel, setDataCarousel] = useState([]);
  const [dataNewService, setDataNewService] = useState([]);

  useEffect(() => {
    Shop_spWeb_Slides_List();
    Shop_spWeb_News_List();
  }, []);

  const Shop_spWeb_Slides_List = async () => {
    try {
      const pr = {
        GroupId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'Shop_spWeb_Slides_List',
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result.length > 0) {
        setDataCarousel(result);
      }
    } catch {
      //
    }
  };

  const Shop_spWeb_News_List = async () => {
    try {
      const pr = {
        GroupId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'Shop_spWeb_News_List',
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result.length > 0) {
        setDataNewService(result);
      }
    } catch {
      //
    }
  };
  return (
    <View style={styles.container}>
      <StatusBarCustom />
      <LinearGradient
        colors={[colors.PRIMARY_LIGHT, colors.WHITE]}
        style={{position: 'absolute', width: '100%', height: '100%'}}
      />
      <UserHeader />
      <ScrollView>
        <View
          style={{
            borderRadius: 10,
            padding: 10,
          }}>
          <CarouselItem dataCarousel={dataCarousel} />
        </View>
        {userLogin ? <MenuComponent /> : null}
        <View style={styles.benefit}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                padding: 10,
                backgroundColor: colors.WHITE,
                marginTop: 10,
                marginRight: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: colors.MAIN_BLUE_CLIENT,
                  marginBottom: 15,
                }}>
                Quà tặng
              </Text>
              <Image
                source={gift}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  color: colors.MAIN_BLUE_CLIENT,
                  marginTop: 10,
                  textAlign: 'center',
                }}>
                Nhận vô vàn quà tặng khi tích điểm và đổi quà cùng Ong Vàng !
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                padding: 10,
                backgroundColor: colors.WHITE,
                marginTop: 10,
                marginLeft: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: colors.MAIN_BLUE_CLIENT,
                  marginBottom: 15,
                }}>
                Premium
              </Text>
              <Image
                source={cirtificate}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  color: colors.MAIN_BLUE_CLIENT,
                  marginTop: 10,
                  textAlign: 'center',
                }}>
                Hãy cùng phấn đấu để trở thành cộng tác viên cao cấp !
              </Text>
            </View>
          </View>
        </View>
        {/* <ServiceCarousel dataNewService={dataNewService} /> */}
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      {userLogin ? null : (
        <LayoutBottom>
          <View style={{backgroundColor: colors.WHITE}}>
            <BtnDouble
              title1={'Đăng nhập'}
              title2={'Đăng ký'}
              onConfirm1={() => navi.navigate(ScreenNames.LOGIN)}
              onConfirm2={() => navi.navigate(ScreenNames.REGISTER)}
            />
            <View style={MainStyles.flexRowCenter}>
              <Text
                style={[
                  styles.title,
                  {
                    marginBottom: 10,
                    width: SCREEN_WIDTH * 0.7,
                    textAlign: 'center',
                  },
                ]}>
                Bạn cần đăng nhập để sử dụng dịch vụ của Ong Vàng
              </Text>
            </View>
          </View>
        </LayoutBottom>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  benefit: {
    margin: 10,
    padding: 10,
  },
});
export default HomeMainScreen;
