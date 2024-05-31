import { StyleSheet, Text, View} from "react-native";
import FormRegister from "../../components/forms/FormRegister";
import Header from "../../components/Header";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import {colors} from "../../styles/Colors";
import BtnPrimary from "../../components/buttons/BtnPrimary";

const RegisterScreen = ({navigation}) => {
    const handleNext = () => {
        navigation.navigate('ActiveAccount');
    }
    return (
        <>
            <Header showBackButton={true} color={colors.WHITE}/>
            <LayoutGradientBlue>
                <Text style={styles.title}>
                    Đăng ký
                </Text>
                <FormRegister/>

                <View style={styles.pagination}>
                    <View
                        style={styles.dotActive}
                    />
                    <View
                        style={styles.dot}
                    />
                </View>
                <BtnPrimary onPress={handleNext}>
                    {"Tiếp theo"}
                </BtnPrimary>
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
    dot: {
        width: 10,
        height: 5,
        borderRadius: 10,
        margin: 2,
        backgroundColor: colors.WHITE
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