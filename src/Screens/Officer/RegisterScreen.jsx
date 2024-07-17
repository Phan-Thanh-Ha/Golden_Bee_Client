import { StyleSheet, Text, View } from "react-native";
import FormRegister from "../../components/forms/RegisterForm";
import Header from "../../components/Header";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import { colors } from "../../styles/Colors";
import Footer from "../../components/Footer";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import MainStyles from "../../styles/MainStyle";
import BackButton from "../../components/BackButton";

const RegisterScreen = ({ navigation }) => {
  const [submit, setSubmit] = useState(false);

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
          <Text style={MainStyles.titleForgotPasswordForm}>
            Đăng ký
          </Text>
          <FormRegister setSubmit={setSubmit} navigation={navigation} />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
      <Footer />
    </>
  );
};

export default RegisterScreen;
