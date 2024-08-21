import { Text } from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import MainStyles from '../../styles/MainStyle';
import React, { useState } from 'react';
import MainStyle from '../../styles/MainStyle';
import { PropTypes } from 'prop-types';

const ForgotPasswordScreen = ({ navigation }) => {
  const [submit, setSubmit] = useState(false);
  return (
    <>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyle.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          extraScrollHeight={140}
          enableOnAndroid={true}>
          <Text style={MainStyles.pageTitle}>Đổi mật khẩu</Text>
          <ForgotPasswordForm setSubmit={setSubmit} navigation={navigation} />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
    </>
  );
};

ForgotPasswordScreen.defaultProps = {
  navigation: {},
};
ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ForgotPasswordScreen;
