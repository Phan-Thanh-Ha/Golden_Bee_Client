import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Datepicker, Tab, TabView } from '@ui-kitten/components';
import CardNewJob from './CardNewJob';
import CardJobDone from './CardJobDone';
import CardDefault from './CardDefault';
import { useDispatch, useSelector } from 'react-redux';
import { checkCaseStatus } from '../utils/CheckCaseStaus';
import { mainAction } from '../Redux/Action';

export const TabCustom = ({ modalRef, modalJobDoneRef, height }) => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [dataJobDone, setDataJobDone] = useState([]);
  const acceptedOrder = useSelector((state) => state.main.acceptedOrder);
  console.log("===================================== acceptedOrder redux : ", acceptedOrder);
  const [selectedIndex, setSelectedIndex] = useState(0);
  /* Xử lý fillter */

  /* Xử lý fillter */
  const OVG_spOfficer_Booking_List_By_Officer = async () => {
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        GroupUserId: 10060
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spOfficer_Booking_Done",
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      console.log("🚀 ~ file: TabCustom.jsx:OVG_spOfficer_Booking_List_By_Officer ~ result:", result)
      if (result.length > 0) {
        setDataJobDone(result);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    OVG_spOfficer_Booking_List_By_Officer();
  }, [acceptedOrder]);

  return (
    <View style={{ height, padding: 10 }}>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={styles.tabView}
      >
        <Tab style={{ height: 40 }} title="Việc mới">
          {
            acceptedOrder?.OrderId ?
              (
                <CardNewJob data={acceptedOrder} modalRef={modalRef} />

              ) : (
                <CardDefault title={checkCaseStatus(userLogin?.StateOnline, userLogin?.Surplus).status} />
              )
          }
        </Tab>
        <Tab style={{ height: 40 }} title="Đã hoàn thành">
          {
            dataJobDone?.length > 0 ? (
              <>
                <FlatList
                  data={dataJobDone}
                  renderItem={({ item, index }) => (
                    <CardJobDone key={index} data={item} modalRef={modalJobDoneRef} />
                  )}
                />
              </>
            ) : (
              <CardDefault title='Chưa có việc làm hoàn thành' />
            )
          }
        </Tab>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
});

export default TabCustom;
