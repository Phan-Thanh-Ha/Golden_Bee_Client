import React from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Layout, Tab, TabView, Text } from '@ui-kitten/components';
import MainStyles from '../styles/MainStyle';
import CardNewJob from './CardNewJob';
import CardJobDone from './CardJobDone';
import CardZaloChat from './CardZaloChat';
import CardChat from './CardChat';
import { color } from 'react-native-reanimated';
import { colors } from '../styles/Colors';
import CardDefault from './CardDefault';

export default TabNotification = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const dataSample = [
    // {
    //   id: 1,
    //   name: "Nhật Linh"
    // },
    // {
    //   id: 2,
    //   name: "Nhật Linh"
    // },
    // {
    //   id: 3,
    //   name: "Nhật Linh"
    // },
    // {
    //   id: 4,
    //   name: "Nhật Linh"
    // }
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
  return (
    <TabView
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <Tab
        style={{ height: 40 }}
        title='Chat'>
        <View>
          <CardZaloChat />
          <Layout style={MainStyles.tabContainerDefault}>
            <Text style={MainStyles.textDefault}></Text>
          </Layout>
        </View>
      </Tab>
      <Tab
        style={{ height: 40 }}
        title='Thông báo'>
        <View>
          <View>
          </View>
          <CardDefault title='chưa có thông báo mới' />
        </View>
      </Tab>
    </TabView>
  );
}