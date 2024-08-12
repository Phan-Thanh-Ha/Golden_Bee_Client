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
import {PropTypes} from 'prop-types';

const CELL_COUNT = 4;

const FormOtpForgotPassword = ({setSubmit, data}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otpValue,
    setValue: setOtpValue,
  });
  const ref = useBlurOnFulfill({value: otpValue, cellCount: CELL_COUNT});
  const [submitted, setSubmitted] = useState(false);
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
  }, [submitted, countdown]);

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
    if (otpValue.length !== CELL_COUNT) {
      setErrorMessage('Vui lòng nhập đủ 4 ký tự');
    } else {
      setErrorMessage('');
      setSubmitted(true);
      setSubmit(true);
      setCountdown(0);
      Toast.show({
        type: 'success',
        text1: 'Đổi mật khẩu thành công !',
        text2: 'Vui lòng đăng nhập lại !',
        // text2: otpValue,
      });
    }
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
        Xin chào {data.fullName} {'\n'}
        MÃ KÍCH HOẠT đã được gửi đến số điện thoại {data.phoneNumber} của bạn
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
        <Button onPress={handleSubmit}>{'Kích hoạt'}</Button>
      )}
      <View style={MainStyles.boxFormActive} />
    </View>
  );
};
FormOtpForgotPassword.propTypes = {
  setSubmit: PropTypes.func,
  data: PropTypes.object,
};
export default FormOtpForgotPassword;
