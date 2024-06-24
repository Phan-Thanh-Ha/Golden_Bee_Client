import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Store} from './src/Redux';
import {LogBox, View, Text} from 'react-native';
import RootNavigator from './src/Navigation/RootNavigation';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SetupNotification} from './src/Firebase/SetupNotification';
import {RequestPermission} from './src/Permission/RequestPermission';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  // useEffect(() => {
  //   LogBox.ignoreAllLogs(true);
  // }, []);
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  //   const getToken = async () => {
  //     const token = await messaging().getToken();
  //     console.log("token FCM", token);
  //   };
  //   getToken();
  //   useEffect(() => {
  //     requestUserPermission();
  //     getToken();
  //     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //       Alert.alert(
  //         "A new FCM message arrived!",
  //         JSON.stringify(remoteMessage)
  //       );
  //     });
  //     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //       console.log("Message handled in the background!", remoteMessage);
  //     });

  //     return unsubscribe;
  //   }, []);
  // }
  return (
    <Provider store={Store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <BottomSheetModalProvider>
          <RootNavigator />
          <SetupNotification />
          <RequestPermission />
        </BottomSheetModalProvider>
        <Toast />
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
