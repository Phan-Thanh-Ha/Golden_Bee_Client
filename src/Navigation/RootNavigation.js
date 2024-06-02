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
import Demo from '../Screens/Demo';

const Root = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Root.Navigator
        screenOptions={{headerShown: false, animationEnabled: false}}
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
      </Root.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
