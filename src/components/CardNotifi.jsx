import React from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { colors } from '../styles/Colors';
import MainStyles from '../styles/MainStyle';
import {
  ic_location,
  ic_note,
  ic_schedule,
} from '../assets';
import { FormatTime, parseTimeSql } from '../utils/FormatTime';
import Rating from './Rating';

const CardNotifi = ({ data }) => {
  return (
    <View>
      <View style={MainStyles.cardJob}>
        <View style={MainStyles.flexRowCenter}>
          <Text style={[MainStyles.titleCardJob, { textAlign: 'center', color: colors.MAIN_BLUE_CLIENT }]}>
            Thông báo hoàn thành dịch vụ
          </Text>
        </View>
        <View style={MainStyles.flexRowCenter}>
          <View style={MainStyles.line} />
        </View>
        <View style={MainStyles.flexRowCenter}>
          <Text style={[MainStyles.titleCardJob, { textAlign: 'center' }]}>
            Dịch vụ {data?.ServiceName.toLowerCase()}
          </Text>
        </View>
        {data?.BookingServiceCode ? (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: colors.primary[700],
              fontWeight: 'bold',
            }}>
            {data?.BookingServiceCode}
          </Text>
        ) : null}
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Image source={ic_note} style={{ width: 22, height: 22 }} />
            <Text style={MainStyles.textCardJob}>
              {data?.Note
                ? 'Ghi chú: ' + data?.DataService?.NoteBooking?.trim()
                : 'Không có ghi chú'}
            </Text>
          </View>
        </View>
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={MainStyles.textCardJob}>Được đánh giá : </Text>
            <Rating rating={4} />
          </View>
        </View>
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Image source={ic_schedule} style={{ width: 22, height: 22 }} />
            <Text style={MainStyles.textCardJob}>
              Ngày hoàn thành : {parseTimeSql(data?.BookingTime, 1)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardNotifi;