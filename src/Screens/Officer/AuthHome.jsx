import LayoutAbout from "../../components/layouts/LayoutAbout";
import LogoBee from "../../components/LogoBee";
import { Text, View } from "react-native";
import BtnAuth from "../../components/auth/BtnAuth";
import Footer from "../../components/Footer";
import { ScreenNames } from "../../Constants";
import MainStyle from "../../styles/MainStyle";
import { useEffect } from "react";
import { removeData } from "../../utils";
import StorageNames from "../../Constants/StorageNames";
import { mainAction } from "../../Redux/Action";
import { useDispatch } from "react-redux";

const AuthHome = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    removeData(StorageNames.USER_PROFILE);
    removeData(StorageNames.ORDER_SERVICE);
    mainAction.userLogout(dispatch);
  }, []);
  const handleLogin = () => {
    navigation.navigate(ScreenNames.LOGIN);
  }
  const handleRegister = () => {
    navigation.navigate(ScreenNames.REGISTER);
  }
  return (
    <LayoutAbout>
      <LogoBee />
      <View style={MainStyle.containerAuthHome}>
        <BtnAuth onPress={handleLogin}>
          {"Đăng nhập"}
        </BtnAuth>
        <Text style={MainStyle.textAuthHome}>Hoặc</Text>
        <BtnAuth onPress={handleRegister}>
          {"Đăng ký"}
        </BtnAuth>
      </View>
      <Footer />
    </LayoutAbout>
  )
}

export default AuthHome;
