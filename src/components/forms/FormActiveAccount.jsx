import {Image, StyleSheet, Text, View} from "react-native";
import {colors} from "../../styles/Colors";
import {image_banner_1, image_banner_4, image_banner_5} from "../../assets";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import React, {useEffect, useState} from "react";
import ArrowRight from "../svg/ArrowRight";
import Button from "../buttons/Button";

const CELL_COUNT = 4;
const FormActiveAccount = ({isSubmit}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [otpValue, setOtpValue] = useState('');
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: otpValue,
        setValue: setOtpValue,
    });
    const ref = useBlurOnFulfill({value: otpValue, cellCount: CELL_COUNT});
    const [submitted, setSubmitted] = useState(false);
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        if (submitted && countdown > 0) {
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown === 0) {
                        clearInterval(interval);
                        setSubmitted(false);
                        setCountdown(60);
                        setErrorMessage('');
                        return 0;
                    } else {
                        return prevCountdown - 1;
                    }
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [submitted, countdown]);

    const handleOtpChange = (value) => {
        if (value.length === 4) {
            setErrorMessage('');
        }
        setOtpValue(value);
    };

    const handleSubmit = () => {
        if (otpValue.length !== 4) {
            setErrorMessage('Vui lòng nhập đủ 4 ký tự');
        } else {
            setSubmitted(true);
        }
    };
    return (
        <View style={styles.form}>
            <View style={styles.viewImg}>
                <Image
                    source={image_banner_5}
                    style={{
                        width: 400,
                        height: 200,
                        resizeMode: 'contain',
                    }}
                />
            </View>
            <Text style={styles.title}>
                Xin chào Nguyễn Văn A {"\n"}
                MÃ KÍCH HOẠT đã được gửi đến số điện thoại 0123456789 của bạn qua tin nhắn.
                Vui lòng nhập MÃ KÍCH HOẠT vào bên dưới!
            </Text>
            <Text style={styles.titleOtp}>
                Mã kích hoạt
            </Text>
            <View style={styles.otp}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={otpValue}
                    onChangeText={setOtpValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                        <View
                            onLayout={getCellOnLayoutHandler(index)}
                            key={index}
                            style={[styles.cellRoot, isFocused && styles.focusCell]}>
                            <Text style={styles.cellText}>
                                {symbol || (isFocused ? <Cursor/> : null)}
                            </Text>
                        </View>
                    )}
                />
                <Text style={styles.countdownText}>Mã kích hoạt sẽ hết hạn trong {countdown} giây</Text>

            </View>
            <Text style={styles.textErr}>
                {errorMessage}
            </Text>
            <Button onPress={handleSubmit}
            >
                {'Kích hoạt'}
            </Button>
            <View style={styles.box}/>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        justifyContent: 'center',
        margin: 15,
        borderRadius: 5,
        backgroundColor: colors.WHITE,
        padding: 10
    },
    textErr: {
        color: colors.ERROR,
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 20,
        marginTop: 20,
        color: colors.MAIN_BLUE_CLIENT
    },
    titleOtp: {
        color: colors.BLACK,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    subTitle: {
        fontSize: 16,
        marginTop: 20,
    },
    viewImg: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    otp: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    codeFieldRoot: {
        marginTop: 20,
        width: '70%',
        marginLeft: 20,
        marginRight: 20,
    },
    cellRoot: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    focusCell: {
        borderColor: 'blue',
    },
    countdownText: {
        fontSize: 14,
        margin: 30,
        color: colors.MAIN_BLUE_CLIENT
    },
    box: {
        height: 50
    }
})
export default FormActiveAccount;
