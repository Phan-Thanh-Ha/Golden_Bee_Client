import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../../styles/Colors';
import Box from '../../components/Box';
import MainStyles, { SCREEN_HEIGHT } from '../../styles/MainStyle';
import { useSelector } from 'react-redux';
import RankProgress from '../../components/RankProgress';
import { FormatMoney } from '../../utils/FormatMoney';
import LogoBeeBox from '../../components/LogoBeeBox';
import { cirtificate, gift } from '../../assets';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../Constants';

const BenefitsScreen = () => {
  const userLogin = useSelector(state => state.main.userLogin);
  const navi = useNavigation();
  return (
    <LayoutGradientBlue>
      <ScrollView>
        <LogoBeeBox
          color={colors.MAIN_BLUE_CLIENT}
          sizeImage={70}
          sizeText={20}
        />
        <View style={{ padding: 10 }}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              borderRadius: 8,
              padding: 10,
              marginVertical: 10,
            }}>
            <View style={MainStyles.flexRowFlexStart}>
              <View style={MainStyles.flexRowFlexStart}>
                <Text style={[styles.text1]}>Điểm tích lũy: </Text>
                <Text style={[styles.text2]}>
                  {FormatMoney(userLogin?.TotalPoint) || 0} điểm
                </Text>
              </View>
            </View>
            <View style={MainStyles.flexRowFlexStart}>
              <View style={MainStyles.flexRowFlexStart}>
                <Text style={[styles.text1]}>Cấp độ: </Text>
                <Text style={[styles.text2]}>
                  {' '}
                  {userLogin?.CustomerRank || 'Cộng tác viên thử việc'}
                </Text>
              </View>
            </View>
          </View>
          <RankProgress points={userLogin?.TotalPoint || 1} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navi.navigate(ScreenNames.GIFT_DETAIL);
              }}
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
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navi.navigate(ScreenNames.PREMIUM_PARTNER);
              }}
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
            </TouchableOpacity>
          </View>
        </View>
        <Box height={SCREEN_HEIGHT * 0.07} />
      </ScrollView>
    </LayoutGradientBlue>
  );
};

export default BenefitsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  text1: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.MAIN_BLUE_CLIENT,
  },
  text2: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.MAIN_COLOR_CLIENT,
  },
});
