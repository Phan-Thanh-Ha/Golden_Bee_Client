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
import MainStyle from "../../styles/MainStyle";
import MainStyles from "../../styles/MainStyle";

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
                Xin chào Nguyễn Văn A {"\n"}
                MÃ KÍCH HOẠT đã được gửi đến số điện thoại 0123456789 của bạn qua tin nhắn.
                Vui lòng nhập MÃ KÍCH HOẠT vào bên dưới!
            </Text>
            <Text style={MainStyles.titleOtpFormActive}>
                Mã kích hoạt
            </Text>
            <View style={MainStyles.otpFormActive}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={otpValue}
                    onChangeText={setOtpValue}
                    cellCount={CELL_COUNT}
                    rootStyle={MainStyle.codeFieldRootFormActive}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                        <View
                            onLayout={getCellOnLayoutHandler(index)}
                            key={index}
                            style={[MainStyles.cellRootFormActive, isFocused && styles.focusCell]}>
                            <Text>
                                {symbol || (isFocused ? <Cursor/> : null)}
                            </Text>
                        </View>
                    )}
                />
                <Text style={MainStyles.countdownTextFormActive}>Mã kích hoạt sẽ hết hạn trong {countdown} giây</Text>

            </View>
            <Text style={MainStyles.textErrFormActive}>
                {errorMessage}
            </Text>
            <Button onPress={handleSubmit}
            >
                {'Kích hoạt'}
            </Button>
            <View style={MainStyles.boxFormActive}/>
        </View>
    )
}

export default FormActiveAccount;
