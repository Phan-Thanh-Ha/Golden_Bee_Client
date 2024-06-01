import { StyleSheet, Text, View } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Header from "../../components/Header";
import { colors } from "../../styles/Colors";
import Footer from "../../components/Footer";
import LoginForm from "../../components/forms/LoginForm";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const LoginScreen = ({ navigation }) => {
    const [dataLogin, setDataLogin] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    console.log((dataLogin));

    useEffect(() => {
        if (isSubmit) {
            Toast.show({
                type: 'success',
                text1: 'Đăng nhập thành công !'
            })
        }
    }, [dataLogin]);

    return (
        <>
            <Header showBackButton={true} color={colors.WHITE} />
            <LayoutGradientBlue>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    enableAutomaticScroll={true}
                    extraScrollHeight={140}
                    enableOnAndroid={true}
                >
                    <Text style={styles.title}>
                        Đăng nhập
                    </Text>
                    <LoginForm navigation={navigation} setSubmit={setIsSubmit} setData={setDataLogin} />
                </KeyboardAwareScrollView>
            </LayoutGradientBlue>
            <Footer />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
});

export default LoginScreen;
