import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { colors } from '../../styles/Colors';
import Box from '../../components/Box';
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/MainStyle';
import { useDispatch, useSelector } from 'react-redux';
import { mainAction } from '../../Redux/Action';
import RankProgress from '../../components/RankProgress';
import { FormatMoney } from '../../utils/FormatMoney';
import LogoBeeBox from '../../components/LogoBeeBox';
import { cirtificate, gift } from '../../assets';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import StorageNames from '../../Constants/StorageNames';
import { setData } from '../../utils';

const BenefitsScreen = () => {
  const userLogin = useSelector(state => state.main.userLogin);
  const dispatch = useDispatch();
  const [benefitValue, setBenefitValue] = useState({});

  // useEffect(() => {
  //   OVG_spCustomer_Total_Point();
  // }, []);

  // const OVG_spCustomer_Total_Point = async () => {
  //   try {
  //     const pr = {
  //       OfficerId: userLogin?.OfficerID,
  //       GroupUserId: 10060,
  //     };
  //     const params = {
  //       Json: JSON.stringify(pr),
  //       func: 'OVG_spOfficer_Rating_Star',
  //     };
  //     const result = await mainAction.API_spCallServer(params, dispatch);
  //     if (result?.length) {
  //       if (benefitValue) {
  //         setBenefitValue(result[0]);
  //         await setData(StorageNames.USER_PROFILE, {
  //           ...userLogin,
  //           CustomerRank: result[0]?.CustomerRank,
  //         });
  //         mainAction.userLogin(
  //           {
  //             ...userLogin,
  //             CustomerRank: result[0]?.CustomerRank,
  //           },
  //           dispatch,
  //         );
  //       } else {
  //         setBenefitValue(result[0]);
  //         await setData(StorageNames.USER_PROFILE, {
  //           ...userLogin,
  //           CustomerRank: result[0]?.CustomerRank,
  //         });
  //         mainAction.userLogin(
  //           {
  //             ...userLogin,
  //             CustomerRank: result[0]?.CustomerRank,
  //           },
  //           dispatch,
  //         );
  //       }
  //     }
  //   } catch (error) { }
  // };
  return (
    <LayoutGradientBlue>
      <ScrollView>
        <LogoBeeBox color={colors.MAIN_BLUE_CLIENT} sizeImage={70} sizeText={20} />
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
                <Text style={[styles.text1]}>Điểm tích lũy : </Text>
                <Text style={[styles.text2]}>
                  {FormatMoney(userLogin?.TotalPoint) || 0} Điểm
                </Text>
              </View>
            </View>
            <View style={MainStyles.flexRowFlexStart}>
              <View style={MainStyles.flexRowFlexStart}>
                <Text style={[styles.text1]}>Cấp độ :</Text>
                <Text style={[styles.text2]}> {userLogin?.CustomerRank || "Cộng tác viên thử việc"}</Text>
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
        <Box height={SCREEN_HEIGHT * 0.7} />
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
