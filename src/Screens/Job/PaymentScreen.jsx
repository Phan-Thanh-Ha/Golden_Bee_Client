import React from 'react';
import { Text, View, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors } from '../../styles/Colors';
import MainStyles from '../../styles/MainStyle';
import Box from '../../components/Box';
import Header from '../../components/Header';
import Note from '../../components/svg/Note';
import Clock from '../../components/svg/Clock';
import Day from '../../components/svg/Day';
import HourGlass from '../../components/svg/HourGlass';
import Person from '../../components/svg/Person';
import Money from '../../components/svg/Money';
import Home from '../../components/svg/Home';
import { FormatMoney } from '../../utils/FormatMoney';
import CustomLabel from '../../components/forms/CustomLabel';
import { camera_icon } from '../../assets';
import Button from '../../components/buttons/Button';
import LayoutBottom from '../../components/layouts/LayoutBottom';
import { responsivescreen } from '../../utils/responsive-screen';
import ArrowRight from '../../components/svg/ArrowRight';

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;
  const handlePayment = () => {
    // console.log("payment")
  }
  return (
    <LayoutGradientBlue>
      <Header />
      <LogoBeeBox color={colors.WHITE} sizeImage={70} sizeText={20} />
      <ScrollView>
        <View style={MainStyles.containerTabPayment}>
          <View style={MainStyles.layoutTabPayment}>
            <View style={MainStyles.tabContainerNewJob}>
              <View style={MainStyles.tabRowSpace}>
                <View style={[MainStyles.tabRow, { justifyContent: 'flex-start' }]}>
                  <Home size={22} />
                  <Text style={
                    {
                      color: colors.MAIN_BLUE_CLIENT,
                      marginLeft: 10,
                      fontSize: 17,
                      fontWeight: '700'
                    }
                  }>{data.title}</Text>
                </View>
                <View style={[MainStyles.tabRow, { justifyContent: 'flex-end' }]}>
                  <Money size={22} color={colors.MAIN_COLOR_CLIENT} />
                  <Text style={
                    {
                      color: colors.MAIN_COLOR_CLIENT,
                      marginLeft: 10,
                      fontSize: 17,
                      fontWeight: '700',
                    }
                  }>{FormatMoney(data.price)} đ</Text>
                </View>
              </View>
              <View style={MainStyles.tabRowSpace}>
                <View style={[MainStyles.tabRow, { justifyContent: 'flex-start' }]}>
                  <Person size={22} />
                  <Text style={
                    {
                      color: colors.MAIN_BLUE_CLIENT,
                      marginLeft: 10,
                      fontSize: 15,
                      width: 110
                    }
                  }>{data.totalStaff} người</Text>

                  <HourGlass size={22} />
                  <Text style={
                    {
                      color: colors.MAIN_BLUE_CLIENT,
                      marginLeft: 10,
                      fontSize: 15,
                    }
                  }>{data.timeWorking} giờ</Text>
                </View>
                <View style={[MainStyles.tabRow, { justifyContent: 'flex-end' }]}>
                  <Text style={
                    {
                      color: colors.WHITE,
                      marginLeft: 10,
                      fontSize: 17,
                      fontWeight: '700',
                      backgroundColor: colors.MAIN_BLUE_CLIENT,
                      padding: 5,
                      borderRadius: 5
                    }
                  }>{data.address}</Text>
                </View>
              </View>
              <View style={MainStyles.tabRowSpace}>
                <View style={[MainStyles.tabRow, { justifyContent: 'flex-start' }]}>
                  <Day size={22} />
                  <Text style={
                    {
                      color: colors.MAIN_BLUE_CLIENT,
                      marginLeft: 10,
                      fontSize: 15,
                      width: 110
                    }
                  }>{data.date}</Text>

                  <Clock size={22} />
                  <Text style={
                    {
                      color: colors.MAIN_BLUE_CLIENT,
                      marginLeft: 10,
                      fontSize: 15,
                    }
                  }>{data.time}</Text>
                </View>
              </View>
              <View style={MainStyles.tabRowSpace}>
                <View style={[MainStyles.tabRow, { justifyContent: 'flex-start' }]}>
                  <Note size={22} />
                  <Text style={
                    {
                      color: colors.MAIN_BLUE_CLIENT,
                      marginLeft: 10,
                      fontSize: 15,
                      paddingRight: 20,
                    }
                  }>{data.note}</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: colors.MAIN_BLUE_CLIENT, marginLeft: 5, marginRight: 5, height: 1 }}>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5, marginRight: 5 }}>
              <CustomLabel>Nhân viên phụ trách : </CustomLabel>
              <View>
                <CustomLabel fontWeight='normal'>Người phụ trách </CustomLabel>
                <CustomLabel fontWeight='normal'>Người phụ trách </CustomLabel>
              </View>
            </View>
            <Box height={30} />
            <View>
              <View style={MainStyles.rowBtnUpload}>
                <View style={MainStyles.columnBtn}>
                  <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>Ảnh làm dịch vụ</CustomLabel>
                </View>
              </View>
              <View style={MainStyles.rowBtnUpload}>
                <View style={MainStyles.columnBtn}>
                  <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>Trước khi làm</CustomLabel>
                </View>
                <View style={MainStyles.columnBtn}>
                  <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>Sau khi làm</CustomLabel>
                </View>
              </View>
              <View style={MainStyles.rowBtnUpload}>
                <Pressable style={MainStyles.columnBtnUpload}>
                  <Image source={camera_icon} width={500} />
                  <Text>Tải lên hình ảnh</Text>
                </Pressable>
                <Pressable style={MainStyles.columnBtnUpload}>
                  <Image source={camera_icon} />
                  <Text>Tải lên hình ảnh</Text>
                </Pressable>
              </View>
            </View>
            <Box height={responsivescreen.height(2)} />
          </View>
        </View>
      </ScrollView>
      <LayoutBottom>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
          <CustomLabel color={colors.WHITE}>Hình thức thanh toán đã chọn </CustomLabel>
        </View>
        <Button
          onPress={handlePayment}
          bgColor={colors.PRIMARY_GREEN}
          icon={() => <ArrowRight color={colors.WHITE} />}
        >
          Thanh toán chuyển khoản
        </Button>
      </LayoutBottom>
    </LayoutGradientBlue>
  );
};

export default PaymentScreen;
