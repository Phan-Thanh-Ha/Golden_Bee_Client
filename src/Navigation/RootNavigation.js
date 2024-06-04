import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
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
import Demo from '../Screens/Demo';
import {BottomTabNavigator} from './BottomTabNavigator';
import UpdateProfileScreen from '../Screens/main/UpdateProfileScreen';
import AddProfileScreen from '../Screens/main/AddProfileScreen';
import First from '../Screens/First';
import {ScreenNames} from '../Constants';
const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialRouteName={ScreenNames.FIRST}>
        <MainStack.Screen name={ScreenNames.DEMO} component={Demo} />
        <MainStack.Screen name={ScreenNames.FIRST} component={First} />
        <MainStack.Screen name={ScreenNames.SPLASH} component={SplashScreen} />
        <MainStack.Screen name={ScreenNames.AUTH_HOME} component={AuthHome} />
        <MainStack.Screen name={ScreenNames.ABOUT} component={AboutScreen} />
        <MainStack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
        <MainStack.Screen
          name={ScreenNames.REGISTER}
          component={RegisterScreen}
        />
        <MainStack.Screen
          name={ScreenNames.ACTIVE_ACCOUNT}
          component={ActiveAccount}
        />
        <MainStack.Screen
          name={ScreenNames.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />
        <MainStack.Screen
          name={ScreenNames.CONFIRM_OTP_PASSWORD}
          component={ConfirmOtpForgotPassword}
        />
        <MainStack.Screen name={ScreenNames.HOME} component={HomeScreen} />
        <MainStack.Screen name={ScreenNames.EMAIL} component={EmailScreen} />
        <MainStack.Screen
          name={ScreenNames.ACCOUNT}
          component={AccountScreen}
        />
        <MainStack.Screen
          name={ScreenNames.BENEFITS}
          component={BenefitsScreen}
        />
        <MainStack.Screen
          name={ScreenNames.MAIN_NAVIGATOR}
          component={BottomTabNavigator}
        />
        <MainStack.Screen
          name={ScreenNames.UPDATE_PROFILE}
          component={UpdateProfileScreen}
        />
        <MainStack.Screen
          name={ScreenNames.ADD_PROFILE}
          component={AddProfileScreen}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
