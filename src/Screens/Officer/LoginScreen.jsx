import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LoginForm from '../../components/forms/LoginForm';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { colors } from '../../styles/Colors';
import MainStyles from '../../styles/MainStyle';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LoginScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyles.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          extraScrollHeight={200}
          enableOnAndroid={true}>
          <Text style={styles.title}>Đăng nhập</Text>
          <LoginForm />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.MAIN_BLUE_CLIENT,
    textAlign: 'center',
  },
});
export default LoginScreen;
