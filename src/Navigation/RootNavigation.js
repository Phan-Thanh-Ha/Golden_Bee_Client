import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenNames from '../Constants/ScreenNames';
import {First} from '../Screens';
import SplashScreen from '../Screens/SplashScreen';
import AuthHome from '../Screens/auth/AuthHome';
import AboutScreen from '../Screens/auth/AboutScreen';
import LoginScreen from '../Screens/auth/LoginScreen';
import RegisterScreen from '../Screens/auth/RegisterScreen';
import ActiveAccount from '../Screens/auth/ActiveAccount';
import ForgotPasswordScreen from '../Screens/auth/ForgotPasswordScreen';
import ConfirmOtpForgotPassword from '../Screens/auth/ConfirmOtpForgotPassword';
import HomeScreen from '../Screens/main/HomeScreen';
import EmailScreen from '../Screens/main/EmailScreen';
import AccountScreen from '../Screens/main/AccountScreen';
import BenefitsScreen from '../Screens/main/BenefitsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Demo from '../Screens/Demo';

const Root = createStackNavigator();

const RootNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkPhoneNumber = async () => {
      try {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (phoneNumber) {
          console.log('Phone Number found:', phoneNumber);
          setInitialRoute(ScreenNames.HOME);
        } else {
          console.log('No Phone Number found, navigating to Login');
          setInitialRoute(ScreenNames.SPLASH);
        }
      } catch (error) {
        console.error(
          'Failed to fetch the phone number from AsyncStorage:',
          error,
        );
        setInitialRoute(ScreenNames.SPLASH);
      }
    };

    checkPhoneNumber();
  }, []);

  if (initialRoute === null) {
    // Optionally, you can return a loading screen or null while checking AsyncStorage
    return null;
  }

  return (
    <NavigationContainer>
      <Root.Navigator
        screenOptions={{headerShown: false, animationEnabled: false}}
        initialRouteName={initialRoute}>
        initialRouteName={ScreenNames.DEMO}>
        {/*màn hình demo*/}
        <Root.Screen name={ScreenNames.DEMO} component={Demo} />
        {/*màn hình first*/}
        <Root.Screen name={ScreenNames.FIRST} component={First} />
        {/*màn hình mở đầu*/}
        <Root.Screen name={ScreenNames.SPLASH} component={SplashScreen} />
        {/*Màn hình chính đăng nhập*/}
        <Root.Screen name={ScreenNames.AUTH_HOME} component={AuthHome} />
        {/*Màn hình giới thệu lúc bắt đầu trước khi đăng nhập*/}
        <Root.Screen name={ScreenNames.ABOUT} component={AboutScreen} />
        {/*màn hình đăng nhập*/}
        <Root.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
        {/*Màn hình đăng ksy*/}
        <Root.Screen name={ScreenNames.REGISTER} component={RegisterScreen} />
        {/*Màn hình kích hoạt tòi khoản*/}
        <Root.Screen
          name={ScreenNames.ACTIVE_ACCOUNT}
          component={ActiveAccount}
        />
        {/*Màn hình đổi ật khẩu*/}
        <Root.Screen
          name={ScreenNames.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />
        <Root.Screen
          name={ScreenNames.CONFIRM_OTP_PASSWORD}
          component={ConfirmOtpForgotPassword}
        />
        <Root.Screen name={ScreenNames.HOME} component={HomeScreen} />
        <Root.Screen name={ScreenNames.EMAIL} component={EmailScreen} />
        <Root.Screen name={ScreenNames.ACCOUNT} component={AccountScreen} />
        <Root.Screen name={ScreenNames.BENEFITS} component={BenefitsScreen} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
