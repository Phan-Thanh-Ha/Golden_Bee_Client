import {StyleSheet, Text, View} from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Header from "../../components/Header";
import {colors} from "../../styles/Colors";
import Footer from "../../components/Footer";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import {KeyboardAwareScrollView} from "@codler/react-native-keyboard-aware-scroll-view";
import MainStyles from "../../styles/MainStyle";
import { useState} from "react";
import MainStyle from "../../styles/MainStyle";

const ForgotPasswordScreen = ({navigation}) => {
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
                    enableAutomaticScroll={true}
                    extraScrollHeight={140}
                    enableOnAndroid={true}
                >
                    <Text style={MainStyles.titleForgotPasswordForm}>
                        Đổi mật khẩu
                    </Text>
                    <ForgotPasswordForm setSubmit={setSubmit} navigation={navigation}/>
                </KeyboardAwareScrollView>
            </LayoutGradientBlue>
            <Footer/>
        </>
    );
};
export default ForgotPasswordScreen;
