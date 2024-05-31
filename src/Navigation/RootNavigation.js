import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenNames from '../Constants/ScreenNames';
import {First} from '../Screens';
const Root = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Root.Navigator
        screenOptions={{headerShown: false, animationEnabled: false}}
        initialRouteName={ScreenNames.FIRST}>
        <Root.Screen name={ScreenNames.FIRST} component={First} />
      </Root.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
