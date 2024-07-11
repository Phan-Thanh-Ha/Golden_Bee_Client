import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Tab, TabView} from '@ui-kitten/components';
import CardNewJob from './CardNewJob';
import CardJobDone from './CardJobDone';
import CardDefault from './CardDefault';
import {useDispatch, useSelector} from 'react-redux';
import {checkCaseStatus} from '../utils/CheckCaseStaus';
import {mainAction} from '../Redux/Action';
import {useFocusEffect} from '@react-navigation/native';
import {SCREEN_HEIGHT} from '../styles/MainStyle';

export const TabCustom = ({modalRef, modalJobDoneRef, height}) => {
  const userLogin = useSelector(state => state.main.userLogin);
  const dispatch = useDispatch();
  const [dataJobDone, setDataJobDone] = useState([]);
  const acceptedOrder = useSelector(state => state.main.acceptedOrder);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const myOrdersAccepted = useSelector(state => state.main.myOrdersAccepted);

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
    } catch {
      // console.log()
    }
  };

  useFocusEffect(
    useCallback(() => {
      OVG_spOfficer_Booking_List_By_Officer();
    }, []),
  );

  const renderFooter = () => <View style={styles.footer} />;
  return (
    <View style={{height, padding: 10}}>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={styles.tabView}>
        <Tab style={{height: 40}} title="Việc mới">
          {acceptedOrder?.OrderId ? (
            <FlatList
              data={[acceptedOrder]}
              renderItem={({item, index}) => (
                <CardNewJob key={index} data={item} modalRef={modalRef} />
              )}
              ListFooterComponent={renderFooter}
            />
          ) : (
            // <>
            //   <CardNewJob data={acceptedOrder} modalRef={modalRef} />
            //   <Box height={SCREEN_HEIGHT * 0.1} />
            // </>
            <CardDefault
              title={
                checkCaseStatus(
                  userLogin?.StateOnline,
                  userLogin?.Surplus,
                  myOrdersAccepted?.length,
                  userLogin?.State,
                ).status
              }
            />
          )}
        </Tab>
        <Tab style={{height: 40}} title="Đã hoàn thành">
          {dataJobDone?.length > 0 ? (
            <FlatList
              data={dataJobDone}
              renderItem={({item, index}) => (
                <CardJobDone
                  key={index}
                  data={item}
                  modalRef={modalJobDoneRef}
                />
              )}
              ListFooterComponent={renderFooter}
            />
          ) : (
            <CardDefault title="Chưa có việc làm hoàn thành" />
          )}
        </Tab>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  footer: {
    height: SCREEN_HEIGHT * 0.05, // Thêm khoảng đệm vào bên dưới
  },
});

export default TabCustom;
