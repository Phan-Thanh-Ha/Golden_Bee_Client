import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { ScreenNames } from '../../Constants';
import FastImage from 'react-native-fast-image';
import { coin_icon, ic_success } from '../../assets';
import MainStyles, { SCREEN_HEIGHT } from '../../styles/MainStyle';
import { useSelector } from 'react-redux';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import Box from '../../components/Box';
import { colors } from '../../styles/Colors';
import { Image } from 'react-native';
import { FormatMoney } from '../../utils/FormatMoney';
import LayoutBottom from '../../components/layouts/LayoutBottom';
import Button from '../../components/buttons/Button';
import ArrowRight from '../../components/svg/ArrowRight';

const CongratulationsScreen = ({ navigation, route }) => {
  const { data } = route.params || {};
  const userLogin = useSelector(state => state.main.userLogin);

  // const confettiRef = useRef(null);
  // const [startConfetti, setStartConfetti] = useState(false);

  // useEffect(() => {
  //   setStartConfetti(true);
  // }, []);

  // const handleConfettiComplete = () => {
  // };

  return (
    <LayoutGradientBlue>
      <Box height={SCREEN_HEIGHT * 0.1} />
      <View style={MainStyles.flexRowCenter}>
        <FastImage source={ic_success} style={{ width: 100, height: 100 }} />
      </View>
      <Text style={styles.congratsText}>Hoàn thành dịch vụ</Text>
      <Text style={styles.subTitle}>
        Chúc mừng {userLogin?.OfficerName}, bạn đã hoàn thành đơn dịch vụ{' '}
        {data?.DataService?.ServiceName.toLowerCase()}
      </Text>

      <View
        style={{
          backgroundColor: colors.primary[600],
          margin: 10,
          borderRadius: 10,
          paddingVertical: 20,
        }}>
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
              color: colors.MAIN_COLOR_CLIENT,
              fontWeight: 'bold',
            }}>
            {data?.BookingCode}
          </Text>
        ) : null}
        <View style={MainStyles.flexRowCenter}>
          <View style={[MainStyles.line, { backgroundColor: colors.WHITE }]} />
        </View>

        <View style={MainStyles.flexRowCenter}>
          <View>
            <Text
              style={{
                color: colors.WHITE,
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
                {FormatMoney(data?.DataService?.PriceAfterDiscount)} VNĐ
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: colors.WHITE,
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                Thực nhận
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
                  {FormatMoney(data?.DataService?.PriceAfterDiscount * 0.7)} VNĐ
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.subTitle}>
        Cảm ơn bạn đồng hành và làm việc cùng chúng tôi. Hãy giữ sức khỏe để
        tiếp tục đồng hành cùng <Text style={styles.yellowText}>Ong Vàng</Text>{' '}
        nhé!
      </Text>

      <LayoutBottom>
        <Button
          onPress={() => navigation.navigate(ScreenNames.MAIN_NAVIGATOR)}
          bgColor={colors.CONFIRM2}
          icon={() => <ArrowRight color={colors.WHITE} />}>
          Về trang chính
        </Button>
      </LayoutBottom>
      {/* {startConfetti && (
        <ConfettiCannon
          ref={confettiRef}
          count={800}
          origin={{x: -50, y: 0}}
          fallSpeed={3000}
          explosionSpeed={200}
          autoStart={true}
          onAnimationEnd={handleConfettiComplete}
        />
      )} */}
    </LayoutGradientBlue>
  );
};

const styles = StyleSheet.create({
  congratsText: {
    color: colors.MAIN_BLUE_CLIENT,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  yellowText: {
    color: colors.YELLOW,
  },
  countdownText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.MAIN_BLUE_CLIENT,
    paddingBottom: 20,
  },
  subTitle: {
    color: colors.MAIN_BLUE_CLIENT,
    paddingHorizontal: 30,
    textAlign: 'center',
    fontSize: 17,
    marginVertical: 20,
  },
});

export default CongratulationsScreen;
