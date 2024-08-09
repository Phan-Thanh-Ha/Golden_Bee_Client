import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

export const SetupNotification = () => {
  const parseDate = (date) => {
    const newDate = new Date(parseInt(date));
    // return moment(newDate).format("DD-MM-YYYY hh:mm:ss");
  };

  useEffect(() => {
    Platform.OS === "ios" && showPermissions();
    PushNotification.createChannel(
      {
        channelId: "rn-push-notification-channel-id-4-default-300", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    messaging().onMessage(async (remoteMessage) => {
      Platform.OS === "android"
        ? notiAndroid(remoteMessage)
        : notifyiOS(remoteMessage);
      // countBadge();
    });
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios") {
      PushNotificationIOS.addEventListener("register", onRegistered);
      PushNotificationIOS.addEventListener(
        "registrationError",
        onRegistrationError
      );
      PushNotificationIOS.requestPermissions().then(
        (data) => {},
        (data) => {}
      );

      return () => {
        PushNotificationIOS.removeEventListener("register");
        PushNotificationIOS.removeEventListener("registrationError");
      };
    }
  }, []);

  // ***************** iOS ***********************

  const notifyiOS = async (remoteMessage) => {
    const noti = remoteMessage.notification;
    PushNotificationIOS.addNotificationRequest(
      {
        id: "notificationWithSound",
        title: noti && noti.title ? noti.title : "",
        body: noti && noti.body ? noti.body : "",
        badge: 1,
        playSound: true,
        // sound: "notification_sound.wav",
      },
      () => PushNotificationIOS.setApplicationIconBadgeNumber(noti.badge)
    );
  };

  const onRegistered = (deviceToken) => {};

  const onRegistrationError = (error) => {};
  const showPermissions = () => {
    PushNotificationIOS.checkPermissions((permissions) => {});
  };

  // ***************** iOS ***********************

  const notiAndroid = (remoteMessage) => {
    const noti = remoteMessage.notification;
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: "rn-push-notification-channel-id-4-default-300",
      autoCancel: true,
      id: this.lastId,
      showWhen: true,
      largeIconUrl: noti.android.imageUrl,
      smallIcon: "ic_stat_name",
      vibrate: true,
      vibration: 600,
      invokeApp: true,
      alertAction: "view",
      category: "",
      userInfo: remoteMessage ? remoteMessage : {},
      title: noti && noti.title ? noti.title : "",
      message: noti && noti.body ? noti.body : "",
      onlyAlertOnce: false,
      playSound: true,
      priority: "max",
      soundName: "notification_sound",
      number: 1,
      largeIcon: "ic_stat_name",
      subText: parseDate(remoteMessage.sentTime),
      bigLargeIcon: "ic_stat_name",
      color: "#60a941",
    });
  };

  return <View />;
};
