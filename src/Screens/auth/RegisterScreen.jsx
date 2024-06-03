import {StyleSheet, Text, View} from "react-native";
import FormRegister from "../../components/forms/RegisterForm";
import Header from "../../components/Header";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import {colors} from "../../styles/Colors";
import Footer from "../../components/Footer";
import {ScreenNames} from "../../Constants";
import {KeyboardAwareScrollView} from "@codler/react-native-keyboard-aware-scroll-view";
import {useEffect, useState} from "react";
import MainStyle from "../../styles/MainStyle";

const RegisterScreen = ({navigation}) => {
    const [submit, setSubmit] = useState(false);

    return (
        <>
            <Header showBackButton={true} color={colors.WHITE}/>
            <LayoutGradientBlue>
                <KeyboardAwareScrollView
                    contentContainerStyle={MainStyle.containerLogin}
                    resetScrollToCoords={{x: 0, y: 0}}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    extraHeight={140}
                    enableOnAndroid={true}
                >
                    <Text style={MainStyle.titleLogin}>Đăng ký</Text>
                    <FormRegister setSubmit={setSubmit} navigation={navigation}/>
                </KeyboardAwareScrollView>
            </LayoutGradientBlue>
            <Footer/>
        </>
    );
};

export default RegisterScreen;
