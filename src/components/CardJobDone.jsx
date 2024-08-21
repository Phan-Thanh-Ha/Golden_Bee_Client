import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import { colors } from '../styles/Colors';
import MainStyles from '../styles/MainStyle';
import { FormatMoney } from '../utils/FormatMoney';
import { coin_icon } from '../assets';
import { FormatDateJsonPro } from '../utils/FormatTime';
import Rating from './Rating';
import { RoundUpNumber } from '../utils/RoundUpNumber';
import { PropTypes } from 'prop-types';

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
          {data?.BookingServiceCode && (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: colors.primary[700],
                fontWeight: 'bold',
              }}>
              {data?.BookingServiceCode}
            </Text>
          )}
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          {data?.TotalStaff && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="people-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  Số lượng nhân viên: {data?.TotalStaff} nhân viên
                </Text>
              </View>
            </View>
          )}
          {data?.TimeWorking && (
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
                    Làm việc trong: {RoundUpNumber(
                      data?.TimeWorking || 0,
                      0,
                    )}{' '}
                    giờ
                  </Text>
                </View>
              </View>
            </View>
          )}
          {data?.AddressService && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill="#3366FF"
                  name="pin-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  Địa chỉ: {data?.AddressService}
                </Text>
              </View>
            </View>
          )}
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill="#3366FF"
                name="calendar-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Ngày hoàn thành: {FormatDateJsonPro(data?.BookingTime, 21)}
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
              <Text style={MainStyles.textCardJob}>Đánh giá: </Text>
              <Rating rating={data?.StartNumber || 5} />
            </View>
          </View>
          {
            data?.RatingNote ?
              (
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill="#3366FF"
                      name="message-square-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      {
                        data?.RatingNote
                          ? 'Phản hồi: ' + data?.RatingNote?.trim()
                          : ' Khách hàng không để lại phản hồi'
                      }
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill="#3366FF"
                      name="message-square-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      Khách hàng chưa đánh giá
                    </Text>
                  </View>
                </View>
              )
          }
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

CardJobDone.defaultProps = {
  data: {},
};

CardJobDone.propTypes = {
  data: PropTypes.object,
};

export default CardJobDone;
