import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Layout, Tab, TabView, Text } from '@ui-kitten/components';
import MainStyles, { SCREEN_HEIGHT } from '../styles/MainStyle';
import CardZaloChat from './CardZaloChat';
import CardDefault from './CardDefault';
import CardNotifi from './CardNotifi';
import { useDispatch, useSelector } from 'react-redux';
import { mainAction } from '../Redux/Action';

export default TabNotification = ({ height }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const userLogin = useSelector(state => state.main.userLogin);
  const acceptedOrder = useSelector(state => state.main.acceptedOrder);
  const dispatch = useDispatch();
  const [dataJobDone, setDataJobDone] = useState([]);

  useEffect(() => {
    OVG_spOfficer_Booking_List_By_Officer();
  }, [acceptedOrder?.OrderId]);

  const OVG_spOfficer_Booking_List_By_Officer = async () => {
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spOfficer_Booking_Done',
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result.length > 0) {
        setDataJobDone(result);
      }
    } catch (error) {
      console.error("lỗi lấy dữu liệu:", error);
    } finally {
    }
  };

  const renderFooter = () => <View style={styles.footer} />;

  return (
    <View style={{ height }}>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={styles.tabView}
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
        <Tab style={{ height: 40 }} title="Thông báo">
          <View style={{ flex: 1 }}>
            {
              dataJobDone?.length > 0 ? (
                <FlatList
                  data={dataJobDone.slice(0, 10)}
                  renderItem={({ item, index }) => (
                    <CardNotifi
                      key={index}
                      data={item}
                    />
                  )}
                  ListFooterComponent={renderFooter}
                />
              ) : (
                <CardDefault title="Chưa có thông báo mới" />
              )
            }
          </View>
        </Tab>
      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  footer: {
    height: SCREEN_HEIGHT * 0.05,
  },
});