import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from './CustomInput'; // Import CustomInput component
import CustomLabel from './CustomLabel';
import {colors} from '../../styles/Colors';
import CustomFormError from './CustomFormError';
import ArrowRight from '../svg/ArrowRight'; // Import CustomLabel component
import Button from '../buttons/Button';
import {ScreenNames} from '../../Constants';
import MainStyle from '../../styles/MainStyle';
import {mainAction} from '../../Redux/Action';
import {useDispatch} from 'react-redux';
import {AlertToaster} from '../../utils';
import {PropTypes} from 'prop-types';

const RegisterForm = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object().shape({
    fullName: yup.string().required('Thông tin bắt buộc'),
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

  const handleSubmit = async values => {
    setIsLoading(true);
    try {
      const pr = {
        OfficerName: values.fullName,
        Phone: values.phoneNumber,
        Password: values.password,
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spRegister_Officer',
      };
      // console.log(params);

      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result[0]?.Status === 'OK') {
        AlertToaster('success', 'Xác thực OTP để hoàn tất đăng ký !');
        navigation.navigate(ScreenNames.ACTIVE_ACCOUNT, {
          data: values,
        });
        setIsLoading(false);
      } else {
        AlertToaster(
          'error',
          'Đăng ký không thành công !',
          result[0]?.ResultMessage,
        );
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={MainStyle.containerForm}>
          <CustomLabel>Họ và tên:</CustomLabel>
          <CustomInput
            placeholder="Nhập họ và tên"
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            value={values.fullName}
            borderColor={
              touched.fullName && errors.fullName ? 'red' : '#E0E0E0'
            }
          />
          <CustomFormError>
            {touched.fullName && errors.fullName}
          </CustomFormError>

          <CustomLabel>Số điện thoại:</CustomLabel>
          <CustomInput
            placeholder="Nhập số điện thoại"
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            value={values.phoneNumber}
            borderColor={
              touched.phoneNumber && errors.phoneNumber ? 'red' : '#E0E0E0'
            }
          />
          <CustomFormError>
            {touched.phoneNumber && errors.phoneNumber}
          </CustomFormError>

          <CustomLabel>Mật khẩu:</CustomLabel>
          <CustomInput
            placeholder="Nhập mật khẩu"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            type="password"
            showPasswordToggle={true}
            borderColor={
              touched.password && errors.password ? 'red' : '#E0E0E0'
            }
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
            type="password"
            showPasswordToggle={true}
            borderColor={
              touched.confirmPassword && errors.confirmPassword
                ? 'red'
                : '#E0E0E0'
            }
          />
          <CustomFormError>
            {touched.confirmPassword && errors.confirmPassword}
          </CustomFormError>
          <Button
            isLoading={isLoading}
            disable={isLoading}
            onPress={handleSubmit}
            icon={() => <ArrowRight color={colors.WHITE} />}>
            Tiếp tục
          </Button>
          <View style={MainStyle.regis}>
            <Text style={MainStyle.regisSub}>Bạn đã có tài khoản ?</Text>
            <Pressable onPress={() => navigation.navigate(ScreenNames.LOGIN)}>
              <Text style={MainStyle.regisBtn}>Đăng nhập</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

// const styles = StyleSheet.create({
//   regis: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 10,
//   },
//   regisSub: {
//     fontSize: 15,
//     marginRight: 10,
//   },
//   regisBtn: {
//     fontSize: 15,
//     color: colors.MAIN_BLUE_CLIENT,
//   },
//   container: {
//     margin: 15,
//     backgroundColor: colors.WHITE,
//     padding: 15,
//     borderRadius: 10,
//   },
//   dot: {
//     width: 10,
//     height: 5,
//     borderRadius: 10,
//     margin: 2,
//     backgroundColor: colors.WHITE,
//   },
//   dotActive: {
//     backgroundColor: colors.YELLOW,
//     width: 20,
//     height: 5,
//     borderRadius: 5,
//     margin: 2,
//   },
//   pagination: {
//     flexDirection: 'row',
//     marginVertical: 10,
//     justifyContent: 'center',
//   },
// });
RegisterForm.propTypes = {
  navigation: PropTypes.object,
};
export default RegisterForm;
