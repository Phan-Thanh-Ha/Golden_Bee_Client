import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SplashScreen from "../Screens/SplashScreen";
import AuthHome from "../Screens/Officer/AuthHome";
import AboutScreen from "../Screens/Officer/AboutScreen";
import LoginScreen from "../Screens/Officer/LoginScreen";
import RegisterScreen from "../Screens/Officer/RegisterScreen";
import ActiveAccount from "../Screens/Officer/ActiveAccount";
import ForgotPasswordScreen from "../Screens/Officer/ForgotPasswordScreen";
import ConfirmOtpForgotPassword from "../Screens/Officer/ConfirmOtpForgotPassword";
import HomeScreen from "../Screens/Home/HomeScreen";
import EmailScreen from "../Screens/Home/EmailScreen";
import AccountScreen from "../Screens/Home/AccountScreen";
import BenefitsScreen from "../Screens/Home/BenefitsScreen";
import Demo from "../Screens/Demo";
import { BottomTabNavigator } from "./BottomTabNavigator";
import UpdateProfileScreen from "../Screens/Home/UpdateProfileScreen";
import AddProfileScreen from "../Screens/Home/AddProfileScreen";
import First from "../Screens/First";
import { ScreenNames } from "../Constants";
import TakeJobScreen from "../Screens/Home/TakeJobScreen";
import CashScreen from "../Screens/Job/CashScreen";
import PaymentScreen from "../Screens/Job/PaymentScreen";
import BookingTimeScreen from "../Screens/Home/BookingTimeScreen";
import Check from "../Screens/firebaseCheck/Check";
import CongratulationsScreen from "../Screens/Job/CongratulationsScreen";
import HomeMainScreen from "../Screens/HomeMainScreen";
import AdminWebView from "../Screens/AdminWebView";
import EstimatePriceScreen from "../Screens/EstimatePriceScreen";
import ServiceEstimateScreen from "../components/ServiceEstimateScreen";
import PremiumPartnerDetail from "../Screens/Home/PremiumPartnerDetail";
import GiftDetailScreen from "../Screens/Home/GiftDetailScreen";
import ViewMyMap from "../Screens/Home/ViewMyMap";
const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialRouteName={ScreenNames.FIRST}
      >
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
        <MainStack.Screen
          name={ScreenNames.TAKE_JOB}
          component={TakeJobScreen}
        />
        <MainStack.Screen name={ScreenNames.CASH} component={CashScreen} />
        <MainStack.Screen
          name={ScreenNames.PAYMENT}
          component={PaymentScreen}
        />
        <MainStack.Screen
          name={ScreenNames.BOOKING_TIME}
          component={BookingTimeScreen}
        />
        <MainStack.Screen name={ScreenNames.FIRE_STORE} component={Check} />
        <MainStack.Screen
          name={ScreenNames.CONGRATULATION}
          component={CongratulationsScreen}
        />
        <MainStack.Screen
          name={ScreenNames.HOME_MAIN_SCREEN}
          component={HomeMainScreen}
        />
        <MainStack.Screen
          name={ScreenNames.ADMIN_SCREEN}
          component={AdminWebView}
        />
        <MainStack.Screen
          name={ScreenNames.ESTIMATE_PRICE}
          component={EstimatePriceScreen}
        />
        <MainStack.Screen
          name={ScreenNames.SERVICE_ESTIMATE}
          component={ServiceEstimateScreen}
        />

        <MainStack.Screen
          name={ScreenNames.PREMIUM_PARTNER}
          component={PremiumPartnerDetail}
        />
        <MainStack.Screen
          name={ScreenNames.GIFT_DETAIL}
          component={GiftDetailScreen}
        />
        <MainStack.Screen
          name={ScreenNames.VIEW_MY_MAP}
          component={ViewMyMap}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
