import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Store} from './src/Redux';
import {LogBox, Platform} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import RootNavigator from './src/Navigation/RootNavigation';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
// import SplashScreen from 'react-native-splash-screen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
LogBox.ignoreAllLogs();

const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  return (
    <Provider store={Store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <MenuProvider>
          <BottomSheetModalProvider>
            <RootNavigator />
            <Toast />
          </BottomSheetModalProvider>
        </MenuProvider>
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
