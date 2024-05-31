import {StyleSheet, Text, View} from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Header from "../../components/Header";
import {colors} from "../../styles/Colors";

const LoginScreen = () => {
    return (
        <>
            <Header showBackButton={true} color={colors.WHITE}/>
            <LayoutGradientBlue>
                <Text style={styles.title}>
                    Đăng nhập
                </Text>
            </LayoutGradientBlue>
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
export default LoginScreen;