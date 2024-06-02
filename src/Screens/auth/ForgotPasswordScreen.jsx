import {StyleSheet, Text, View} from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Header from "../../components/Header";
import {colors} from "../../styles/Colors";
import Footer from "../../components/Footer";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import {KeyboardAwareScrollView} from "@codler/react-native-keyboard-aware-scroll-view";

const ForgotPasswordScreen = ({navigation}) => {
    return (
        <>
            <Header showBackButton={true} color={colors.WHITE}/>
            <LayoutGradientBlue>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                    resetScrollToCoords={{x: 0, y: 0}}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    enableAutomaticScroll={true}
                    extraScrollHeight={140}
                    enableOnAndroid={true}
                >

                    <Text style={styles.title}>
                        Đổi mật khẩu
                    </Text>
                    <ForgotPasswordForm navigation={navigation}/>
                </KeyboardAwareScrollView>
            </LayoutGradientBlue>
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
