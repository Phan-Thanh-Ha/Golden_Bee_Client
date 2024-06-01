import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import CustomInput from './CustomInput'; // Import CustomInput component
import CustomLabel from './CustomLabel';
import {colors} from "../../styles/Colors";
import CustomFormError from "./CustomFormError";
import ArrowRight from "../svg/ArrowRight"; // Import CustomLabel component
import Button from "../buttons/Button";


const RegisterForm = ({setSubmit}) => {
    const validationSchema = yup.object().shape({
        fullName: yup.string().required('Thông tin bắt buộc'),
        idNumber: yup.string().matches(/^[0-9]{17}$/, 'CMND/CCCD phải là chuỗi 14 ký tự số').required('Thông tin bắt buộc'),
        phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ').required('Thông tin bắt buộc'),
        password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Thông tin bắt buộc'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không khớp').required('Thông tin bắt buộc'),
    });

    const handleSubmit = (values) => {
        Toast.show({
            type: 'success',
            text1: 'Thông tin đăng ký',
            text2: JSON.stringify(values),
        });
        setSubmit(true);
    };

    return (
        <Formik
            initialValues={{fullName: '', idNumber: '', phoneNumber: '', password: '', confirmPassword: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                <View>
                    <View
                        style={styles.container}
                    >
                        <CustomLabel>Họ và tên:</CustomLabel>
                        <CustomInput
                            placeholder="Nhập họ và tên"
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}
                        />
                        <CustomFormError>{touched.fullName && errors.fullName}</CustomFormError>

                        <CustomLabel>CMND/CCCD:</CustomLabel>
                        <CustomInput
                            placeholder="Nhập CMND/CCCD"
                            onChangeText={handleChange('idNumber')}
                            onBlur={handleBlur('idNumber')}
                            value={values.idNumber}
                        />
                        <CustomFormError>{touched.idNumber && errors.idNumber}</CustomFormError>

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

                        <CustomLabel>Xác nhận mật khẩu:</CustomLabel>
                        <CustomInput
                            placeholder="Xác nhận mật khẩu"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry
                        />
                        <CustomFormError>{touched.confirmPassword && errors.confirmPassword}</CustomFormError>
                    </View>
                    <View style={styles.pagination}>
                        <View style={styles.dotActive}/>
                        <View style={styles.dot}/>
                    </View>
                    <Button onPress={handleSubmit} bgColor={colors.PRIMARY_GREEN}
                            icon={() => <ArrowRight color={colors.WHITE}/>}>
                        {'Tiếp theo'}
                    </Button>
                </View>

            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15,
        backgroundColor: colors.WHITE,
        padding: 15,
        borderRadius: 10,
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
})

export default RegisterForm;
