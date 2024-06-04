import { StyleSheet, Text, View } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Header from "../../components/Header";
import { colors } from "../../styles/Colors";
import Footer from "../../components/Footer";
import LoginForm from "../../components/forms/LoginForm";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import MainStyle from "../../styles/MainStyle";

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
      <LayoutGradientBlue>
        <Header showBackButton={true} color={colors.WHITE} />
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyle.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          extraScrollHeight={140}
          enableOnAndroid={true}
        >
          <Text style={MainStyle.titleLogin}>
            Đăng nhập
          </Text>
          <LoginForm navigation={navigation} setSubmit={setIsSubmit} setData={setDataLogin} />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
      <Footer />
    </>
  );
};

export default LoginScreen;
