import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CardJobDone from './CardJobDone';
import { SCREEN_HEIGHT } from '../styles/MainStyle';
import CardDefault from './CardDefault';
import { useFocusEffect } from '@react-navigation/native';
import { mainAction } from '../Redux/Action';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  parseISO,
  isWithinInterval,
} from 'date-fns';
import FilterComponent from './FilterComponent';
import { PropTypes } from 'prop-types';
import { dataDoneDefault } from '../Screens/data';
import { USER_TEST } from '../Constants';

const TabJobDone = ({ modalJobDoneRef }) => {
  const userLogin = useSelector(state => state.main.userLogin);
  const dispatch = useDispatch();
  const [dataJobDone, setDataJobDone] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);

  const OVG_spOfficer_Booking_List_By_Officer = async () => {
    try {
      setLoading(true);
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
        setOriginalData(result);
        const filteredResult = filterData(result, 'week', new Date());
        setDataJobDone(filteredResult);
      }
    } catch (error) {
      console.error('lỗi lấy dữu liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = (data, filterType, date) => {
    const now = new Date();
    switch (filterType) {
      case 'week': {
        const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 });
        const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 });
        return data.filter(item => {
          const bookingTime = parseISO(item.BookingTime);
          return isWithinInterval(bookingTime, {
            start: startOfThisWeek,
            end: endOfThisWeek,
          });
        });
      }
      case 'month': {
        const startOfThisMonth = startOfMonth(now);
        const endOfThisMonth = endOfMonth(now);
        return data.filter(item => {
          const bookingTime = parseISO(item.BookingTime);
          return isWithinInterval(bookingTime, {
            start: startOfThisMonth,
            end: endOfThisMonth,
          });
        });
      }
      case 'date': {
        return data.filter(item => {
          const bookingTime = parseISO(item.BookingTime);
          return bookingTime.toDateString() === date.toDateString();
        });
      }
      default:
        return data;
    }
  };

  const applyFilter = (type, date = new Date()) => {
    setLoading(true);
    const filteredResult = filterData(originalData, type, date);
    setDataJobDone(filteredResult);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      OVG_spOfficer_Booking_List_By_Officer();
    }, []),
  );

  const renderFooter = () => <View style={styles.footer} />;

  return (
    /* Bùa */
    userLogin?.Phone === USER_TEST ? (
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataDoneDefault}
          renderItem={({ item, index }) => (
            <CardJobDone key={index} data={item} modalRef={modalJobDoneRef} />
          )}
          ListFooterComponent={renderFooter}
        />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <FilterComponent applyFilter={applyFilter} />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : dataJobDone?.length > 0 ? (
          <FlatList
            data={dataJobDone}
            renderItem={({ item, index }) => (
              <CardJobDone key={index} data={item} modalRef={modalJobDoneRef} />
            )}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <CardDefault title="Chưa có việc làm hoàn thành" />
        )}
      </View>
    )

  );
};

const styles = StyleSheet.create({
  footer: {
    height: SCREEN_HEIGHT * 0.05,
  },
});

TabJobDone.defaultProps = {
  modalJobDoneRef: null,
};
TabJobDone.propTypes = {
  modalJobDoneRef: PropTypes.object,
};

export default TabJobDone;
