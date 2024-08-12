import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import CustomInput from './CustomInput';
import CustomLabel from './CustomLabel';
import {colors} from '../../styles/Colors';
import CustomFormError from './CustomFormError';
import Button from '../buttons/Button';
import {ScreenNames} from '../../Constants';
import LogoBeeBox from '../LogoBeeBox';
import {PropTypes} from 'prop-types';

const ForgotPasswordForm = ({navigation}) => {
  const validationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
      .required('Thông tin bắt buộc'),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Thông tin bắt buộc'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không khớp')
      .required('Thông tin bắt buộc'),
  });

  const handleSubmit = values => {
    Toast.show({
      type: 'success',
      text1: 'Thông tin đăng ký',
      text2: JSON.stringify(values),
    });
    navigation.navigate(ScreenNames.CONFIRM_OTP_PASSWORD, {
      data: values,
    });
  };

  return (
    <Formik
      initialValues={{phoneNumber: '', password: '', confirmPassword: ''}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View>
          <View style={styles.container}>
            <LogoBeeBox />
            <Text style={styles.title}>
              Vui lòng cung cấp thông tin bên dưới để thay đổi mật khẩu nhé !
            </Text>
            <CustomLabel>Số điện thoại:</CustomLabel>
            <CustomInput
              placeholder="Nhập số điện thoại"
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
            />
            <CustomFormError>
              {touched.phoneNumber && errors.phoneNumber}
            </CustomFormError>

            <CustomLabel>Mật khẩu mới:</CustomLabel>
            <CustomInput
              placeholder="Nhập mật khẩu"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            <CustomFormError>
              {touched.password && errors.password}
            </CustomFormError>
            <CustomLabel>Xác nhận mật khẩu:</CustomLabel>
            <CustomInput
              placeholder="Xác nhận mật khẩu"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
            />
            <CustomFormError>
              {touched.confirmPassword && errors.confirmPassword}
            </CustomFormError>

            <Button onPress={handleSubmit}>{'Lấy mã OTP'}</Button>
            <View style={styles.regis}>
              <Text style={styles.regt}>Bạn có tài khoản ?</Text>
              <Pressable onPress={() => navigation.navigate(ScreenNames.LOGIN)}>
                <Text style={styles.regtt}>Đăng nhập</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};
ForgotPasswordForm.propTypes = {
  navigation: PropTypes.object,
};
const styles = StyleSheet.create({
  regis: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  regt: {
    fontSize: 15,
    marginRight: 10,
  },
  regtt: {
    fontSize: 15,
    color: colors.MAIN_BLUE_CLIENT,
  },
  container: {
    margin: 15,
    backgroundColor: colors.WHITE,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    color: colors.MAIN_BLUE_CLIENT,
    textAlign: 'center',
    margin: 10,
    fontSize: 15,
    marginBottom: 60,
    paddingRight: 30,
    paddingLeft: 30,
  },
  dot: {
    width: 10,
    height: 5,
    borderRadius: 10,
    margin: 2,
    backgroundColor: colors.WHITE,
  },
  dotActive: {
    backgroundColor: colors.YELLOW,
    width: 20,
    height: 5,
    borderRadius: 5,
    margin: 2,
  },
  pagination: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  forgot: {
    color: colors.MAIN_BLUE_CLIENT,
  },
  viewForgot: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
});

export default ForgotPasswordForm;
