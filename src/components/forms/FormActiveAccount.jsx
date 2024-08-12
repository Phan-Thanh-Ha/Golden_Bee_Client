import {Image, Text, View} from 'react-native';
import {image_banner_5} from '../../assets';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import React, {useEffect, useState} from 'react';
import Button from '../buttons/Button';
import MainStyles from '../../styles/MainStyle';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../Constants';
import {AlertToaster} from '../../utils';
import {PropTypes} from 'prop-types';

const CELL_COUNT = 4;

const FormActiveAccount = ({data}) => {
  const navi = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otpValue,
    setValue: setOtpValue,
  });
  const ref = useBlurOnFulfill({value: otpValue, cellCount: CELL_COUNT});
  const [countdown, setCountdown] = useState(60);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    if (pending && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setCountdown(60);
            setErrorMessage('');
            setPending(false);
            return 0;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdown]);

  const handleOtpChange = value => {
    if (value.length === CELL_COUNT) {
      setErrorMessage('');
    }
    setOtpValue(value);
  };

  const handleSendCode = () => {
    setCountdown(60);
    setPending(true);
    setErrorMessage('');
    setOtpValue('');
    Toast.show({
      type: 'success',
      text1: 'Mã OTP đã được gửi lại !',
    });
  };
  const handleSubmit = () => {
    AlertToaster(
      'success',
      'Đăng ký thành công !',
      'Hãy đăng nhập để dùng ứng dụng',
    );
    navi.reset({
      routes: [{name: ScreenNames.LOGIN}],
    });
  };

  return (
    <View style={MainStyles.containerFormActive}>
      <View style={MainStyles.viewImgFormActive}>
        <Image
          source={image_banner_5}
          style={{
            width: 400,
            height: 200,
            resizeMode: 'contain',
          }}
        />
      </View>
      <Text style={MainStyles.titleFormActive}>
        Xin chào {data?.fullName} {'\n'}
        MÃ KÍCH HOẠT đã được gửi đến số điện thoại {data?.phoneNumber} của bạn
        qua tin nhắn. Vui lòng nhập MÃ KÍCH HOẠT vào bên dưới!
      </Text>
      <Text style={MainStyles.titleOtpFormActive}>Mã kích hoạt</Text>
      <View style={MainStyles.otpFormActive}>
        <CodeField
          ref={ref}
          {...props}
          value={otpValue}
          onChangeText={handleOtpChange}
          cellCount={CELL_COUNT}
          rootStyle={MainStyles.codeFieldRootFormActive}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[
                MainStyles.cellRootFormActive,
                isFocused && MainStyles.focusCellFormActive,
              ]}>
              <Text>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
          )}
        />
        {countdown === 0 ? (
          <Text style={MainStyles.countdownTextFormActive}>
            Mã kích hoạt đã hết hạn
          </Text>
        ) : (
          <Text style={MainStyles.countdownTextFormActive}>
            Mã kích hoạt sẽ hết hạn trong {countdown}s
          </Text>
        )}
      </View>
      <Text style={MainStyles.textErrFormActive}>{errorMessage}</Text>
      {countdown === 0 ? (
        <Button onPress={handleSendCode}>Gửi lại mã OTP</Button>
      ) : (
        <Button onPress={handleSubmit}>Bỏ qua bước này</Button>
      )}
      <View style={MainStyles.boxFormActive} />
    </View>
  );
};
FormActiveAccount.prototype = {
  data: PropTypes.object,
};
export default FormActiveAccount;
