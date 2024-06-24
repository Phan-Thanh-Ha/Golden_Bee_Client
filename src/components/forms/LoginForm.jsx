import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from './CustomInput';
import CustomLabel from './CustomLabel';
import CustomFormError from './CustomFormError';
import Button from '../buttons/Button';
import {ScreenNames} from '../../Constants';
import LogoBeeBox from '../LogoBeeBox';
import MainStyle from '../../styles/MainStyle';
import {AlertToaster, GROUP_USER_ID} from '../../utils';
import {mainAction} from '../../Redux/Action';
import {useDispatch} from 'react-redux';
import {setData} from '../../utils/LocalStorage';
import StorageNames from '../../Constants/StorageNames';
import {useNavigation} from '@react-navigation/native';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navi = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const validationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .trim()
      .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
      .required('Thông tin bắt buộc'),
    password: yup
      .string()
      .trim()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Thông tin bắt buộc'),
  });

  const handleSubmit = async values => {
    setLoading(true);
    try {
      const pr = {
        UserName: values.phoneNumber,//0906702589
        Password: values.password, //'nx6PzqnunD6Lz1tLO0MoJA==',
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'AVG_spOfficer_Login',
      };
      console.log('-----> 💀💀💀💀💀💀💀💀💀 <-----  params:', params);

      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.Status === 'OK') {
        mainAction.userLogin(result.Result[0], dispatch);
        await setData(StorageNames.USER_PROFILE, result.Result[0]);
        AlertToaster('success', 'Đăng nhập thành công !');
        navi.navigate(ScreenNames.MAIN_NAVIGATOR);
        setLoading(false);
        const token = await mainAction.checkPermission(null, dispatch);
        if (token) {
          const paramsToken = {
            Token: token,
            OfficerId: result.Result[0]?.OfficerID,
            GroupUserId: GROUP_USER_ID,
          };
          const params = {
            Json: JSON.stringify(paramsToken),
            func: 'CPN_spOfficerTokenDevice_MB_Save',
          };
          await mainAction.API_spCallServer(params, dispatch);
        }
      } else {
        AlertToaster('error', result?.ReturnMess);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{phoneNumber: '', password: ''}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={MainStyle.containerForm}>
          <LogoBeeBox />
          <Text style={MainStyle.subTitleForm}>Chào mừng bạn trở lại</Text>
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

          <CustomLabel>Mật khẩu:</CustomLabel>
          <CustomInput
            placeholder="Nhập mật khẩu"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            type="password"
            showPasswordToggle={true}
          />
          <CustomFormError>
            {touched.password && errors.password}
          </CustomFormError>
          <View style={MainStyle.viewSubLinkForm}>
            <Pressable
              onPress={() => navi.navigate(ScreenNames.FORGOT_PASSWORD)}>
              <Text style={MainStyle.subLinkForm}>Quên mật khẩu ?</Text>
            </Pressable>
          </View>
          <Button onPress={handleSubmit} isLoading={loading} disable={loading}>
            {'Đăng nhập'}
          </Button>
          <View style={MainStyle.regis}>
            <Text style={MainStyle.regisSub}>Bạn chưa có tài khoản ?</Text>
            <Pressable onPress={() => navi.navigate(ScreenNames.REGISTER)}>
              <Text style={MainStyle.regisBtn}>Đăng ký</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
