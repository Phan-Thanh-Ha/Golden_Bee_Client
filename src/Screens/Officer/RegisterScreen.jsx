import { Text } from 'react-native';
import FormRegister from '../../components/forms/RegisterForm';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import Footer from '../../components/Footer';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
import MainStyles from '../../styles/MainStyle';
import React from 'react';
import { PropTypes } from 'prop-types';
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
          enableOnAndroid={true}>
          <Text style={MainStyles.pageTitle}>Đăng ký</Text>
          <FormRegister setSubmit={setSubmit} navigation={navigation} />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
    </>
  );
};

RegisterScreen.defaultProps = {
  navigation: {},
};
RegisterScreen.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterScreen;
