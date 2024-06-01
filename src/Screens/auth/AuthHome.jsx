import LayoutAbout from "../../components/layouts/LayoutAbout";
import LogoBee from "../../components/LogoBee";
import {Text, View} from "react-native";
import BtnAuth from "../../components/auth/BtnAuth";
import Header from "../../components/Header";
import {colors} from "../../styles/Colors";
import Footer from "../../components/Footer";
import {ScreenNames} from "../../Constants";

const AuthHome = ({navigation}) => {
    const handleLogin = () => {
        navigation.navigate(ScreenNames.LOGIN);
    }
    const handleRegister = () => {
        navigation.navigate(ScreenNames.REGISTER);
    }
    return(
        <LayoutAbout>
            <Header showBackButton={true} color={colors.WHITE}/>
            <LogoBee/>
            <View style={{
                marginBottom: 100,
                alignItems: 'center'
            }}>
                <BtnAuth onPress={handleLogin}>
                    {"Đăng nhập"}
                </BtnAuth>
                <Text style={{
                    color: colors.WHITE,
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginBottom: 10,
                    textAlign: 'center',
                }}>Hoặc</Text>
                <BtnAuth onPress={handleRegister}>
                    {"Đăng ký"}
                </BtnAuth>
            </View>
            <Footer/>
        </LayoutAbout>
    )
}

export default AuthHome;
