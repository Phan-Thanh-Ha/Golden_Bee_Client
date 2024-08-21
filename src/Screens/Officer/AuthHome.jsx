import LayoutAbout from '../../components/layouts/LayoutAbout';
import LogoBee from '../../components/LogoBee';
import { Text, View } from 'react-native';
import BtnAuth from '../../components/auth/BtnAuth';
import Footer from '../../components/Footer';
import { ScreenNames } from '../../Constants';
import { SCREEN_HEIGHT } from '../../styles/MainStyle';
import React, { useEffect } from 'react';
import { removeData } from '../../utils';
import StorageNames from '../../Constants/StorageNames';
import { mainAction } from '../../Redux/Action';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Box from '../../components/Box';
import { colors } from '../../styles/Colors';

const AuthHome = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    removeData(StorageNames.USER_PROFILE);
    removeData(StorageNames.ORDER_SERVICE);
    mainAction.userLogout(dispatch);
  }, []);
  const handleLogin = () => {
    navi.navigate(ScreenNames.LOGIN);
  };
  const handleRegister = () => {
    navi.navigate(ScreenNames.REGISTER);
  };
  return (
    <LayoutAbout>
      <Box height={SCREEN_HEIGHT * 0.07} />
      <LogoBee />
      <View
        style={{
          marginBottom: 100,
          alignItems: 'center',
        }}>
        <BtnAuth onPress={handleLogin}>{'Đăng nhập'}</BtnAuth>
        <Text
          style={{
            color: colors.BLACK,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 10,
            textAlign: 'center',
          }}>
          Hoặc
        </Text>
        <BtnAuth onPress={handleRegister}>{'Đăng ký'}</BtnAuth>
      </View>
    </LayoutAbout>
  );
};

export default AuthHome;
