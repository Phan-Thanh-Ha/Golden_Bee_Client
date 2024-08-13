import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {useRoute} from '@react-navigation/native';
import {colors} from '../styles/Colors';
import MainStyles, {SCREEN_HEIGHT} from '../styles/MainStyle';
import {RoundUpNumber} from '../utils/RoundUpNumber';
import {priceClearning} from '../utils/PriceService';
import {FormatMoney} from '../utils/FormatMoney';
import FormService from './FormService';
import Box from './Box';
import {coin_icon} from '../assets';
import BackButton from './BackButton';

const ServiceEstimateScreen = () => {
  const route = useRoute();
  const {service} = route.params || {};
  const price = service.ServicePrice || 11;
  const workingTime = service.ServiceTime || 11;
  const [time, setTime] = useState(workingTime);
  const formikSubmitRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(price);
  const handleFormChange = values => {
    values.people ? setTime(workingTime / values.people) : setTime(workingTime);
    setTotalPrice(priceClearning(values, price, time));
  };

  return (
    <View style={styles.container}>
      <Box height={SCREEN_HEIGHT * 0.07} />
      <BackButton color="black" />
      <Text style={MainStyles.screenTitle}>{service.ServiceName}</Text>
      <ScrollView>
        <KeyboardAwareScrollView extraScrollHeight={40} enableOnAndroid>
          <FormService
            onSubmit={formikSubmitRef}
            timeWorking={time}
            onChange={handleFormChange}
            Service={service}
            TotalPrice={totalPrice}
          />
        </KeyboardAwareScrollView>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          elevation: 10,
          bottom: 0,
          backgroundColor: colors.PRIMARY_GREEN,
          width: '95%',
          margin: 10,
          padding: 10,
          borderRadius: 7,
        }}>
        <View
          style={{
            width: '98%',
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}>
          <View
            style={[
              MainStyles.flexRowCenter,
              {backgroundColor: 'transparent'},
            ]}>
            <Image
              source={coin_icon}
              style={{
                width: 28,
                height: 28,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
            <Text style={styles.btnTitle}>
              {FormatMoney(totalPrice) +
                ' VNĐ / ' +
                RoundUpNumber(time, 0) +
                ' giờ'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnTitle: {
    fontSize: 18,
    color: colors.WHITE,
  },
});

export default ServiceEstimateScreen;
