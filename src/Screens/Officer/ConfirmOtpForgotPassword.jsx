import { StyleSheet, Text } from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import Header from '../../components/Header';
import { colors } from '../../styles/Colors';
import FormActiveAccount from '../../components/forms/FormActiveAccount';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { ScreenNames } from '../../Constants';
import { PropTypes } from 'prop-types';

const ConfirmOtpForgotPassword = ({ navigation, route }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (isSubmit === true) {
      navigation.navigate(ScreenNames.LOGIN);
      setIsSubmit(false);
    }
  }, [isSubmit]);
  return (
    <>
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          extraScrollHeight={140}
          enableOnAndroid={true}>
          <Text style={styles.title}>Xác thực tài khoản</Text>
          <FormActiveAccount
            setSubmit={setIsSubmit}
            data={route?.params?.data}
          />
        </KeyboardAwareScrollView>
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
});

ConfirmOtpForgotPassword.defaultProps = {
  navigation: {},
  route: {},
};
ConfirmOtpForgotPassword.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
export default ConfirmOtpForgotPassword;
