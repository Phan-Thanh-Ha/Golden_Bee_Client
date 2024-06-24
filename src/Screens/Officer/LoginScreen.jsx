import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Footer from "../../components/Footer";
import LoginForm from "../../components/forms/LoginForm";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import Box from "../../components/Box";
import BackButton from "../../components/BackButton";
import { colors } from "../../styles/Colors";
import MainStyles from "../../styles/MainStyle";
import { Text } from "react-native";

const LoginScreen = () => {
  return (
    <>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyles.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          extraScrollHeight={200}
          enableOnAndroid={true}
        >
          <BackButton color={colors.WHITE} />
          <Text style={MainStyles.titleForgotPasswordForm}>
            Đăng Nhập
          </Text>
          <LoginForm />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
      <Footer />
    </>
  );
};
export default LoginScreen;
