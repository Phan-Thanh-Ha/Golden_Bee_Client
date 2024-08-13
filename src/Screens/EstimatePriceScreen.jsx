import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {mainAction} from '../Redux/Action';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, themeColors} from '../styles/Colors';
import UserHeader from '../components/UserHeader';
import StatusBarCustom from '../components/StatusBarCustom';
import LayoutBottom from '../components/layouts/LayoutBottom';
import BtnDouble from '../components/BtnDouble';
import MainStyles, {SCREEN_HEIGHT, SCREEN_WIDTH} from '../styles/MainStyle';
import {ScreenNames} from '../Constants';
import Box from '../components/Box';
import {CarouselItem} from '../components/ImageSliderBox';
import {MenuScroll} from '../components/MenuScroll';
import {MenuComponent} from '../components/MenuComponent ';

const EstimatePriceScreen = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.main.userLogin);
  const [dataCarousel, setDataCarousel] = useState([]);

  useEffect(() => {
    Shop_spWeb_Slides_List();
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

  console.log(userLogin);
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
        <Text
          style={{
            color: themeColors.primary,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Tra cứu giá dịch vụ
        </Text>
        <MenuScroll />
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      {userLogin ? (
        <MenuComponent />
      ) : (
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
export default EstimatePriceScreen;
