import {StyleSheet, Text, View} from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Header from "../../components/Header";
import {colors} from "../../styles/Colors";
import FormActiveAccount from "../../components/forms/FormActiveAccount";
import {useState} from "react";

const ActiveAccount = () => {
    const [isSubmit, setIsSubmit] = useState();
    return (
        <>
            <Header showBackButton={true} color={colors.WHITE}/>
            <LayoutGradientBlue>
                <Text style={styles.title}>
                    Kích hoạt tài khoản
                </Text>
                <FormActiveAccount isSubmit={setIsSubmit}/>
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
export default ActiveAccount;