import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import CustomInput from './CustomInput';
import CustomLabel from './CustomLabel';
import CustomFormError from "./CustomFormError";
import Button from "../buttons/Button";
import {ScreenNames} from "../../Constants";
import LogoBeeBox from "../LogoBeeBox";
import MainStyle from "../../styles/MainStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginForm = ({setSubmit, navigation, setData}) => {
    const validationSchema = yup.object().shape({
        phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ').required('Thông tin bắt buộc'),
        password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Thông tin bắt buộc'),
    });

    const handleSubmit = async  (values) => {
        try {
            await AsyncStorage.setItem('phoneNumber', values.phoneNumber);
            Toast.show({
                type: 'success',
                text1: 'Đăng nhập thành công !',
                // text2: JSON.stringify(values),
            });
            navigation.navigate(ScreenNames.HOME);
        } catch (error) {
            console.error('Failed to save the phone number to AsyncStorage:', error);
            Toast.show({
                type: 'error',
                text1: 'Lỗi đăng nhập ! liên hệ IT !',
                // text2: JSON.stringify(values),
            });
        }
    };

    return (
        <Formik
            initialValues={{phoneNumber: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                <View>
                    <View
                        style={MainStyle.containerForm}
                    >
                        <LogoBeeBox/>
                        <Text style={MainStyle.subTitleForm}>Chào mừng bạn trở lại</Text>
                        <CustomLabel>Số điện thoại:</CustomLabel>
                        <CustomInput
                            placeholder="Nhập số điện thoại"
                            onChangeText={handleChange('phoneNumber')}
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                        />
                        <CustomFormError>{touched.phoneNumber && errors.phoneNumber}</CustomFormError>

                        <CustomLabel>Mật khẩu:</CustomLabel>
                        <CustomInput
                            placeholder="Nhập mật khẩu"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        <CustomFormError>{touched.password && errors.password}</CustomFormError>
                        <View style={MainStyle.viewSubLinkForm}>
                            <Pressable onPress={() => navigation.navigate(ScreenNames.FORGOT_PASSWORD)}>
                                <Text style={MainStyle.subLinkForm}>Quên mật khẩu ?</Text>
                            </Pressable>
                        </View>
                        <Button onPress={handleSubmit}>
                            {'Đăng nhập'}
                        </Button>
                        <View style={MainStyle.regis}>
                            <Text style={MainStyle.regisSub}>Bạn chưa có tài khoản ?</Text>
                            <Pressable onPress={() => navigation.navigate(ScreenNames.REGISTER)}>
                                <Text style={MainStyle.regisBtn}>Đăng ký</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default LoginForm;
