import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Store} from './src/Redux';
import {LogBox, Text, View} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import RootNavigator from './src/Navigation/RootNavigation';
const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);
  return (
    <Provider store={Store}>
      <MenuProvider>
        <RootNavigator />
      </MenuProvider>
    </Provider>
  );
};

export default App;
