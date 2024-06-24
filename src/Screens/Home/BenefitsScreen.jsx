import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors } from '../../styles/Colors';
import MainStyles from '../../styles/MainStyle';
import Box from '../../components/Box';
import { cirtificate, coin_icon, gift } from '../../assets';
import { FormatMoney } from '../../utils/FormatMoney';
import StepsBar from '../../components/StepsBar';


export default BenefitsScreen = () => {
  return (
    <LayoutGradientBlue>
      <LogoBeeBox color={colors.WHITE} sizeImage={70} sizeText={20} />
      <View style={MainStyles.containerTabContent}>
        <View style={{
          backgroundColor: colors.WHITE,
          borderRadius: 8,
          padding: 10
        }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Text style={{
              fontSize: 15,
              fontWeight: '700',
              color: colors.MAIN_BLUE_CLIENT
            }}>Thưởng tháng</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{
                fontSize: 15,
                fontWeight: '700',
                color: colors.MAIN_BLUE_CLIENT
              }}>Mức tiếp theo </Text>
              <Image
                source={coin_icon}
                style={{ width: 20, height: 20 }}
              />
              <Text style={
                {
                  color: colors.MAIN_COLOR_CLIENT,
                  marginLeft: 10,
                  fontSize: 17,
                  fontWeight: '700',
                }
              }>{FormatMoney(400000)} đ</Text>
            </View>
          </View>
          <Box height={10} />
          <StepsBar rating={1} fontSize={[24, 24]} />
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: colors.MAIN_BLUE_CLIENT
            }}
          >Cần thêm {59} giờ trong tuần này để đạt mức được thưởng tiếp theo trong tháng này</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              padding: 10,
              backgroundColor: colors.WHITE,
              marginTop: 10,
              marginRight: 10,
              borderRadius: 10,
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: colors.MAIN_BLUE_CLIENT,
                marginBottom: 15
              }}
            >Quà tặng</Text>
            <Image
              source={gift}
              style={{
                width: 50,
                height: 50
              }}
            />
            <Text
              style={{
                color: colors.MAIN_BLUE_CLIENT,
                marginTop: 10,
                textAlign: 'center'
              }}
            >Nhận vô vàn quà tặng khi tích điểm và đổi quà cùng Ong Vàng !</Text>
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
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: colors.MAIN_BLUE_CLIENT,
                marginBottom: 15
              }}
            >Premium</Text>
            <Image
              source={cirtificate}
              style={{
                width: 50,
                height: 50
              }}
            />
            <Text
              style={{
                color: colors.MAIN_BLUE_CLIENT,
                marginTop: 10,
                textAlign: 'center'
              }}
            >Hãy cùng phấn đấu để trở thành cộng tác viên cao cấp !</Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          marginTop: 40,
          color: colors.WHITE,
          textAlign: 'center',
        }}
      >Hãy chờ phiên bản tiếp theo để được truy cập nhiều hơn nhé !</Text>
      <Box height={100} />
    </LayoutGradientBlue>
  );
}
