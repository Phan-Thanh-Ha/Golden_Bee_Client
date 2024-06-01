import {StyleSheet, Text, View} from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Header from "../../components/Header";
import {colors} from "../../styles/Colors";
import Footer from "../../components/Footer";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import {KeyboardAwareScrollView} from "@codler/react-native-keyboard-aware-scroll-view";
import FormRegister from "../../components/forms/RegisterForm";

const ForgotPasswordScreen = ({navigation}) => {
    return (
        <>
            <Header showBackButton={true} color={colors.WHITE}/>

            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                resetScrollToCoords={{x: 0, y: 0}}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
            >
                <LayoutGradientBlue>
                    <Text style={styles.title}>
                        Đổi mật khẩu
                    </Text>
                    <ForgotPasswordForm navigation={navigation}/>
                </LayoutGradientBlue>
            </KeyboardAwareScrollView>
            <Footer/>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
})
export default ForgotPasswordScreen;
