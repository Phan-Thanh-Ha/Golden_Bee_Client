import React from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Layout, Tab, TabView, Text } from '@ui-kitten/components';
import { colors } from '../styles/Colors';
import Home from './svg/Home';
import MainStyles from '../styles/MainStyle';
import Money from './svg/Money';
import { FormatMoney } from '../utils/FormatMoney';
import Person from './svg/Person';
import HourGlass from './svg/HourGlass';
import Day from './svg/Day';
import Clock from './svg/Clock';
import Note from './svg/Note';
import Rating from './Rating';
import Button from './buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { confirmJob } from '../Redux/Action/mainAction';
import CardNewJob from './CardNewJob';

export const TabCustom = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const confirmed = useSelector((state) => state.main.confirmed);
  const dispatch = useDispatch();
  const HandleConfirm = () => {
    dispatch(confirmJob());
  }
  const dataSample = [
    {
      id: 1,
      title: 'Giúp việc theo giờ',
      totalStaff: 2,
      timeWorking: 2,
      date: '10/10/2022',
      time: "8h30 - 10h30",
      address: "Tân Bình",
      note: "Nhà có trẻ con và thú cưng, vui lòng liên hệ trước khi đến",
      price: 4000000,
    },
    {
      id: 2,
      title: 'Giúp việc theo giờ',
      totalStaff: 2,
      timeWorking: 2,
      date: '10/10/2022',
      time: "8h30 - 10h30",
      address: "Tân Bình",
      note: "Nhà có trẻ con và thú cưng, vui lòng liên hệ trước khi đến",
      price: 4000000,
    },
    {
      id: 2,
      title: 'Giúp việc theo giờ',
      totalStaff: 2,
      timeWorking: 2,
      date: '10/10/2022',
      time: "8h30 - 10h30",
      address: "Tân Bình",
      note: "Nhà có trẻ con và thú cưng, vui lòng liên hệ trước khi đến",
      price: 4000000,
    },
    {
      id: 2,
      title: 'Giúp việc theo giờ',
      totalStaff: 2,
      timeWorking: 2,
      date: '10/10/2022',
      time: "8h30 - 10h30",
      address: "Tân Bình",
      note: "Nhà có trẻ con và thú cưng, vui lòng liên hệ trước khi đến",
      price: 4000000,
    }
  ]
  const dataSample2 = [
    {
      id: 1,
      title: 'Giúp việc theo giờ',
      totalStaff: 2,
      timeWorking: 2,
      date: '10/10/2022',
      time: "8h30 - 10h30",
      address: "Tân Bình",
      note: "Nhà có trẻ con và thú cưng, vui lòng liên hệ trước khi đến",
      price: 4000000,
    },
    {
      id: 2,
      title: 'Giúp việc theo giờ',
      totalStaff: 2,
      timeWorking: 2,
      date: '10/10/2022',
      time: "8h30 - 10h30",
      address: "Tân Bình",
      note: "Nhà có trẻ con và thú cưng, vui lòng liên hệ trước khi đến",
      price: 4000000,
    },
    {
      id: 3,
      title: 'Giúp việc theo giờ',
      totalStaff: 2,
      timeWorking: 2,
      date: '10/10/2022',
      time: "8h30 - 10h30",
      address: "Tân Bình",
      note: "Nhà có trẻ con và thú cưng, vui lòng liên hệ trước khi đến",
      price: 4000000,
      rate: 5,
      feedback: "dịch vụ tuyệt vời"
    },
    {
      id: 4,
      title: 'Giúp việc theo giờ',
      totalStaff: 2,
      timeWorking: 2,
      date: '10/10/2022',
      time: "8h30 - 10h30",
      address: "Tân Bình",
      note: "Nhà có trẻ con và thú cưng, vui lòng liên hệ trước khi đến",
      price: 4000000,
      rate: 5,
      feedback: "dịch vụ tuyệt vời",
      // item detail
      customerName: "Nguyễn Văn Nam",
      staffName: "Nguyễn Văn Nữ",
      servieName: "Giá định kết",
      otherService: ["Giá định kết 1", "Giá định kết 2", "Giá định kết 3"],
      totalPrice: 5000000,
    }
  ]
  const JobDone = (data) => {
    return (
      <View style={MainStyles.tabContainer}>
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
            }>{data.data.title}</Text>
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
            }>{FormatMoney(data.data.price)} đ</Text>
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
            }>{data.data.totalStaff} người</Text>

            <HourGlass size={22} />
            <Text style={
              {
                color: colors.MAIN_BLUE_CLIENT,
                marginLeft: 10,
                fontSize: 15,
              }
            }>{data.data.timeWorking} giờ</Text>
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
            }>{data.data.address}</Text>
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
            }>{data.data.date}</Text>

            <Clock size={22} />
            <Text style={
              {
                color: colors.MAIN_BLUE_CLIENT,
                marginLeft: 10,
                fontSize: 15,
              }
            }>{data.data.time}</Text>
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
            }>{data.data.note}</Text>
          </View>
        </View>
        <View style={{ backgroundColor: colors.MAIN_BLUE_CLIENT, height: 1 }}></View>
        <View style={MainStyles.tabRowSpace}>
          <View style={[MainStyles.tabRow, { justifyContent: 'flex-start', }]}>
            <Text style={
              {
                color: colors.MAIN_BLUE_CLIENT,
                marginLeft: 10,
                fontSize: 15,
              }
            }>Đánh giá:</Text>
            <Rating rating={data.data.rate} fontSize={[15, 15]} />
          </View>
          <View style={[MainStyles.tabRow, { justifyContent: 'flex-end' }]}>
            {data.data.feedback &&
              <Text style={
                {
                  color: colors.MAIN_BLUE_CLIENT,
                  marginLeft: 10,
                  fontSize: 15,
                }
              }>Ghi chú: {data.data.feedback}</Text>
            }
          </View>
        </View>
      </View>
    )
  }
  return (
    <TabView
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <Tab
        style={{ height: 40 }}
        title='Việc mới'>
        <ScrollView style={{ height: 650 }}>
          <View>
            {
              dataSample.length > 0 ?
                dataSample.map(item => <CardNewJob key={item.id} data={item} />)
                :
                (
                  <Layout style={MainStyles.tabContainer}>
                    <Text category='h5'>Chưa có việc làm</Text>
                  </Layout>
                )
            }
          </View>
        </ScrollView>
      </Tab>
      <Tab
        style={{ height: 40 }}
        title='Đã hoàn thành'>
        <View>
          <View>
            {/* compoent fillter */}
          </View>
          <ScrollView style={{ height: 670 }}>
            {
              dataSample2.length > 0 ?
                dataSample2.map(item => <JobDone key={item.id} data={item} />)
                :
                (
                  <Layout style={MainStyles.tabContainer}>
                    <Text category='h5'>Chưa có việc làm hoàn thành</Text>
                  </Layout>
                )
            }
          </ScrollView>
        </View>
      </Tab>
    </TabView>
  );
};