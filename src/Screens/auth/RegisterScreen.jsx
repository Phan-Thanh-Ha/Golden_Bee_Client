import {StyleSheet, Text, View} from "react-native";
import FormRegister from "../../components/forms/RegisterForm";
import Header from "../../components/Header";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import {colors} from "../../styles/Colors";
import Footer from "../../components/Footer";
import {ScreenNames} from "../../Constants";
import {KeyboardAwareScrollView} from "@codler/react-native-keyboard-aware-scroll-view";
import {useEffect, useState} from "react";

const RegisterScreen = ({navigation}) => {
    const [submit, setSubmit] = useState(false);
    useEffect(()=> {
        if(submit === true) {
            navigation.navigate(ScreenNames.ACTIVE_ACCOUNT);
            setSubmit(false);
        }
    },[submit])
    const handleNext = () => {
        navigation.navigate(ScreenNames.ACTIVE_ACCOUNT);
    }
    return (
        <>
            <Header showBackButton={true} color={colors.WHITE}/>
            <LayoutGradientBlue>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                    resetScrollToCoords={{x: 0, y: 0}}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.title}>Đăng ký</Text>
                    <FormRegister setSubmit={setSubmit} navigation={navigation}/>
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
export default RegisterScreen;
