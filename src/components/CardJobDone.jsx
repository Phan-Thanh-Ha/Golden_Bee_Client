import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import { colors } from '../styles/Colors';
import MainStyles from '../styles/MainStyle';
import { FormatMoney } from '../utils/FormatMoney';
import {
  coin_icon,
} from '../assets';
import { parseTimeSql } from '../utils/FormatTime';
import Rating from './Rating';
import { RoundUpNumber } from '../utils/RoundUpNumber';

const CardJobDone = ({ data }) => {
  return (
    <View>
      <Pressable>
        <View style={MainStyles.cardJob}>
          <View style={MainStyles.flexRowCenter}>
            <Text style={[MainStyles.titleCardJob, { textAlign: 'center' }]}>
              Dịch vụ {data?.ServiceName.toLowerCase()}
            </Text>
          </View>
          {
            data?.BookingServiceCode && (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: colors.primary[700],
                  fontWeight: 'bold',
                }}>
                {data?.BookingServiceCode}
              </Text>
            )
          }
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          {
            data?.ServiceOptionName && (
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill="#3366FF"
                    name="share-outline"
                  />
                  <Text style={MainStyles.textCardJob}>
                    Loại công việc : {data?.ServiceOptionName}
                  </Text>
                </View>
              </View>
            )
          }
          {
            data?.TotalStaff && (
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill="#3366FF"
                    name="people-outline"
                  />
                  <Text style={MainStyles.textCardJob}>
                    Số lượng nhân viên : {data?.TotalStaff} Nhân viên
                  </Text>
                </View>
              </View>
            )
          }
          {
            data?.TimeWorking && (
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowSpaceBetween}>
                  <View style={MainStyles.flexRowFlexEnd}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill="#3366FF"
                      name="clock-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      {' '}
                      Làm việc trong {RoundUpNumber(data?.TimeWorking || 0, 0)} giờ
                    </Text>
                  </View>
                </View>
              </View>
            )
          }
          {
            data?.AddressService && (
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill="#3366FF"
                    name="pin-outline"
                  />
                  <Text style={MainStyles.textCardJob}>
                    Địa chỉ : {data?.AddressService}
                  </Text>
                </View>
              </View>
            )
          }
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="plus-square-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Dịch vụ thêm :{' '}
                {data?.Detail?.length > 0
                  ? ''
                  : 'Không kèm dịch vụ thêm'}
              </Text>
            </View>
            {data?.Detail?.length > 0
              ? data?.Detail.map(item => (
                <View key={item?.ServiceDetailId?.toString()}>
                  <Text style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>
                    🔸{item.ServiceDetailName}
                  </Text>
                </View>
              ))
              : null}
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="message-circle-outline"
              />
              <Text style={MainStyles.textCardJob}>
                {data?.Note
                  ? 'Ghi chú: ' + data?.Note.trim()
                  : 'Không có ghi chú'}
              </Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="calendar-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Ngày hoàn thành : {parseTimeSql(data?.BookingTime, 3)}
              </Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="star-outline"
              />
              <Text style={MainStyles.textCardJob}>Được đánh giá : </Text>
              <Rating rating={data?.StartNumber || 5} />
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="message-square-outline"
              />
              <Text style={MainStyles.textCardJob}>
                {data?.Note
                  ? 'Feedback: ' + data?.Note.trim()
                  : 'Khách hàng không để lại Feedback'}
              </Text>
            </View>
          </View>
          <View style={MainStyles.cardContentJob}>
            <Text
              style={{
                color: colors.MAIN_BLUE_CLIENT,
                marginLeft: 10,
                fontSize: 18,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              Tổng tiền
            </Text>
            <View style={MainStyles.flexRowCenter}>
              <Image source={coin_icon} style={{ width: 22, height: 22 }} />
              <Text
                style={{
                  color: colors.MAIN_COLOR_CLIENT,
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                {FormatMoney(data?.TotalMoney)} VND
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CardJobDone;
