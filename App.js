import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Store} from './src/Redux';
import {LogBox, Platform, StatusBar} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import RootNavigator from './src/Navigation/RootNavigation';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import SplashScreen from 'react-native-splash-screen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
// import { RequestPermission } from "./src/Permission/RequestPermission";
import {SetupNotification} from './src/Firebase/SetupNotification';
import HealthCheck from './src/utils/HealthCheck';
import RequestPermissionV2 from './src/Permission/RequestPermissionV2';
LogBox.ignoreAllLogs();
const App = () => {
  if (__DEV__) {
    SplashScreen.hide();
  } else {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }
  return (
    <Provider store={Store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />
        <MenuProvider>
          <BottomSheetModalProvider>
            <RootNavigator />
            <RequestPermissionV2 />
            <SetupNotification />
            <HealthCheck />
          </BottomSheetModalProvider>
          <Toast />
        </MenuProvider>
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
