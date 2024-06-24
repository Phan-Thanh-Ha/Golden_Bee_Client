import React from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { colors } from '../styles/Colors';
import MainStyles from '../styles/MainStyle';
import { FormatMoney } from '../utils/FormatMoney';
import { cirtificate, coin_icon, ic_chronometer, ic_clearning, ic_clearning_basic, ic_glass, ic_living_room, ic_location, ic_note, ic_person, ic_schedule } from '../assets';
import { FormatTime, parseTimeSql } from '../utils/FormatTime';
import Rating from './Rating';

export default CardJobDone = ({ data, modalRef }) => {
  // console.log("check data done", data);
  const openModal = () => {
    modalRef.current?.openModal(data);
  };

  return (
    <View>
      <Pressable onPress={openModal}>
        <View style={MainStyles.cardJob}>
          <View style={MainStyles.flexRowCenter}>
            <Text style={[MainStyles.titleCardJob, { textAlign: 'center' }]}>Dịch vụ {data?.ServiceName.toLowerCase()}</Text>
          </View>
          {
            data?.BookingServiceCode ? (
              <Text style={{ textAlign: 'center', fontSize: 12, color: colors.primary[700], fontWeight: 'bold' }}>{data?.BookingServiceCode}</Text>
            ) : null
          }
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <View style={MainStyles.flexRowFlexStart}>
                <Image
                  source={ic_person}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={MainStyles.textCardJob}>{data?.TotalStaff} nhân viên</Text>
              </View>
              {data?.TotalRoom ? (
                <View style={MainStyles.flexRowFlexStart}>
                  <Image
                    source={ic_living_room}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text style={MainStyles.textCardJob}>{data?.TotalRoom} phòng</Text>
                </View>
              ) : null
              }
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <View style={MainStyles.flexRowFlexEnd}>
                <Image
                  source={ic_glass}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={MainStyles.textCardJob}> trong {data?.TimeWorking || 1} giờ</Text>
              </View>
            </View>
          </View>
          {
            data?.DataService?.IsPremium ? (
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Image
                    source={cirtificate}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text style={MainStyles.textCardJob}>Dịch vụ Premium</Text>
                </View>
              </View>
            ) : (
              <View View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Image
                    source={ic_clearning_basic}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text style={MainStyles.textCardJob}>Dịch vụ thông thường</Text>
                </View>
              </View>
            )
          }
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image
                source={ic_location}
                style={{ width: 22, height: 22 }}
              />
              <Text style={MainStyles.textCardJob}>Địa chỉ: {data?.DataService?.Address || "Chưa cập nhật địa chỉ"}</Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image
                source={ic_clearning}
                style={{ width: 22, height: 22 }}
              />
              <Text style={MainStyles.textCardJob}>Dịch vụ thêm : {data?.Detail?.length > 0 ? "" : "Không kèm dịch vụ thêm"}</Text>
            </View>
            {
              data?.Detail?.length > 0 ? (
                data?.Detail.map(item => (
                  <View key={item.ServiceDetailId.toString()}>
                    <Text style={[MainStyles.textCardJob, { paddingLeft: 10 }]}>🔸{item.ServiceDetailName}</Text>
                  </View>
                ))
              ) : null
            }
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image
                source={ic_note}
                style={{ width: 22, height: 22 }}
              />
              <Text style={MainStyles.textCardJob}>{data?.Note ? "Ghi chú: " + data?.DataService?.NoteBooking.trim() : "Không có ghi chú"}</Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Image
                source={ic_schedule}
                style={{ width: 22, height: 22 }}
              />
              <Text style={MainStyles.textCardJob}>Ngày hoàn thành : {parseTimeSql(data?.BookingTime, 1)}</Text>
            </View>
          </View>
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Text style={MainStyles.textCardJob}>Được đánh giá : </Text>
              <Rating rating={4} />
            </View>
          </View>
        </View>
      </Pressable >
    </View >

  )
}