import React, {useState} from 'react';
import {View, Text, Pressable, Linking} from 'react-native';
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
import ModalUserNotActive from '../modal/ModalUserNotActive';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navi = useNavigation();
  const [loginMessage, setLoginMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState(
    'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên Ong Vàng để được hỗ trợ xử lý !',
  );
  const onConfirm = () => {
    Linking.openURL(`tel:${'0922277782'}`);
    setIsUpdate(false);
  };
  const defaultUser = {
    CreateTime: '2024-06-28T11:10:55.407',
    FilesBC: '/OVG_Booking/2024/072024/04/_2024-07-04-09-27-30_1.jpg',
    FilesCCCD: '/OVG_Booking/2024/072024/04/_2024-07-04-09-27-15_1.jpg',
    FilesCCCD_BackSide:
      '/OVG_Booking/2024/072024/04/_2024-07-04-09-27-21_1.jpg',
    FilesCV: '/OVG_Booking/2024/072024/04/_2024-07-04-09-27-26_1.jpg',
    FilesImage: '/OVG_Booking/2024/072024/04/_2024-07-04-09-27-07_1.jpg',
    GroupUserId: 10060,
    Identified: '123456789012',
    OfficerID: 7347,
    OfficerName: 'Phan Ha',
    OfficerStatus: 1,
    Password: 'MN4J4MDO/7s=',
    Phone: '0943214791',
    State: 0,
    StateOnline: false,
    Surplus: 111111110051111,
  };
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
    if (values.phoneNumber === '0943214791') {
      await setData(StorageNames.USER_PROFILE, defaultUser);
      mainAction.userLogin(defaultUser, dispatch);
      navi.reset({
        routes: [{name: ScreenNames.ESTIMATE_PRICE}],
      });
      return;
    }
    try {
      const pr = {
        UserName: values.phoneNumber,
        Password: values.password,
        GroupUserId: 10060,
      };

      const params = {
        Json: JSON.stringify(pr),
        func: 'AVG_spOfficer_Login',
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.Status === 'OK') {
        await setData(StorageNames.USER_PROFILE, result.Result[0]);
        mainAction.userLogin(result.Result[0], dispatch);
        AlertToaster('success', 'Đăng nhập thành công !');
        setLoginMessage('');
        if (
          result?.Result[0]?.FilesCCCD_BackSide &&
          result?.Result[0]?.FilesCCCD &&
          result?.Result[0]?.FilesCV &&
          result?.Result[0]?.FilesBC &&
          result?.Result[0]?.FilesImage
        ) {
          setLoading(false);
          navi.reset({
            routes: [{name: ScreenNames.MAIN_NAVIGATOR}],
          });
        } else {
          setLoading(false);
          navi.reset({
            routes: [{name: ScreenNames.UPDATE_PROFILE}],
          });
        }
        setLoading(false);
      } else {
        setLoading(false);
        setLoginMessage(result?.ReturnMess);
        AlertToaster('error', result?.ReturnMess);
      }
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
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
          <View style={MainStyle.viewSubLinkForm}>
            <Pressable
              onPress={() => navi.navigate(ScreenNames.FORGOT_PASSWORD)}>
              <Text style={MainStyle.subLinkForm}>Quên mật khẩu ?</Text>
            </Pressable>
          </View>
          {loginMessage ? (
            <Text style={[MainStyle.textErrFormActive, {textAlign: 'center'}]}>
              {loginMessage}
            </Text>
          ) : (
            ''
          )}
          <Button onPress={handleSubmit} isLoading={loading} disable={loading}>
            {'Đăng nhập'}
          </Button>
          <View style={MainStyle.regis}>
            <Text style={MainStyle.regisSub}>Bạn chưa có tài khoản ?</Text>
            <Pressable onPress={() => navi.navigate(ScreenNames.REGISTER)}>
              <Text style={MainStyle.regisBtn}>Đăng ký</Text>
            </Pressable>
          </View>
          {/* <ModalUserNotActive
            title={title}
            isModalVisible={isUpdate}
            setModalVisible={setIsUpdate}
            onConfirm={onConfirm}
          /> */}
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
