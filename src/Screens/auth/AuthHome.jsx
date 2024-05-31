import LayoutAbout from "../../components/layouts/LayoutAbout";
import LogoBee from "../../components/LogoBee";
import {Text, View} from "react-native";
import BtnAuth from "../../components/auth/BtnAuth";
import Header from "../../components/Header";
import {colors} from "../../styles/Colors";
import Footer from "../../components/Footer";

const AuthHome = ({navigation}) => {
    const handleLogin = () => {
        navigation.navigate('LoginScreen');
    }
    const handleRegister = () => {
        navigation.navigate('RegisterScreen');
    }
    return(
        <LayoutAbout>
            <Header showBackButton={true} />
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