import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/buttons/Button';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import MainStyles from '../../styles/MainStyle';
import { colors } from '../../styles/Colors';
import ToggleCustom from '../../components/ToggleCustom';
import ScheduleMatrix from '../../components/ScheduleMatrix';
import { initialArray } from '../../utils/ScheduleHandle';
import Header from '../../components/Header';
import SelectOption from '../../components/SelectOption';


export default BookingTimeScreen = () => {
  const navigation = useNavigation();
  const [selectedTime, setSelectedTime] = useState('60');

  const handleBooking = () => {
  }

  return (
    <LayoutGradientBlue>
      <ScrollView contentContainerStyle={MainStyles.scrollViewContent}>
        <Header />
        <Text style={MainStyles.screenTitle}>Đặt lịch làm việc</Text>
        <View style={MainStyles.contentContainer}>
          <Text style={MainStyles.labelTitle}>Thông báo</Text>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Nhận thông báo công việc</Text>
            <ToggleCustom />
          </View>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Nhắc nhở trước</Text>
            <SelectOption
              selectedValue={selectedTime}
              onValueChange={(value) => setSelectedTime(value)}
              size={'small'}
            />
          </View>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.labelTitle}>Rung khi có việc mới</Text>
            <ToggleCustom />
          </View>
          <Text style={MainStyles.labelTitle}>Lịch rảnh</Text>
          <ScheduleMatrix initialSchedule={initialArray} />
        </View>
        <View style={MainStyles.contentContainer}>
          <Text style={MainStyles.labelTitle}>Khởi động lại ứng dụng</Text>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={{ marginRight: 10, paddingLeft: 10, fontSize: 15, color: colors.MAIN_BLUE_CLIENT }}>Lịch đăng ký làm việc sẽ được làm mới khi khởi động ứng dụng !</Text>
          </View>
          <Button fontSize={15} paddingHorizontal={10} paddingVertical={7}>
            Khởi động lại ứng dụng
          </Button>
        </View>

        <Button
          bgColor={'transparent'}
          textColor={colors.RED}
          fontSize={15}
          paddingVertical={0}
        >
          Xóa tài khoản
        </Button>
      </ScrollView>
    </LayoutGradientBlue>
  );
};


