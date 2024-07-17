import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, View } from "react-native";
import RNPermissions, {
  check,
  PERMISSIONS,
  RESULTS,
  request,
} from "react-native-permissions";
export const RequestPermission = () => {
  const androidReadMediaImages = async () => {
    const statusAndroid = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    if (statusAndroid !== RESULTS.GRANTED && Platform.Version >= 33) {
      request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(() => {
        androidWriteStorage();
      });
    } else {
      androidWriteStorage();
    }
  };
  const androidWriteStorage = async () => {
    const statusAndroid = await check(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    );
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(() => {
        androidCamera();
      });
    } else {
      androidCamera();
    }
  };
  const androidCamera = async () => {
    const statusAndroid = await check(PERMISSIONS.ANDROID.CAMERA);
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.CAMERA).then(() => {
        androidReadStorage();
      });
    } else {
      androidReadStorage();
    }
  };
  const androidReadStorage = async () => {
    const statusAndroid = await check(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    );
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(() => {
        androidFineLocation();
      });
    } else {
      androidFineLocation();
    }
  };
  const androidFineLocation = async () => {
    const statusAndroid = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (statusAndroid !== RESULTS.GRANTED) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
  };
  const androidRecordAudio = async () => {
    const statusAndroid = await check(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    );
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(() => {
        androidFineLocation();
      });
    } else {
      androidFineLocation();
    }
  };
  const androidRecordVideo = async () => {
    const statusAndroid = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    } else {
      androidMocked();
    }
  };
  const androidMocked = async () => {
    const statusAndroid = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    } else {
      androidBluetoothConnect();
    }
  };
  const androidBluetoothConnect = async () => {
    const statusAndroid = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    } else {
      androidBluetoothScan();
    }
  };
  const androidBluetoothScan = async () => {
    const statusAndroid = await check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
    } else {
      androidBluetooth();
    }
  };
  const androidBluetooth = async () => {
    const statusAndroid = await check(PERMISSIONS.ANDROID.BLUETOOTH);
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.BLUETOOTH);
    } else {
      androidBluetoothAccess();
    }
  };
  const androidBluetoothAccess = async () => {
    const statusAndroid = await check(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
    );
    if (statusAndroid !== RESULTS.GRANTED) {
      request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    }
  };
  const iosCamera = async () => {
    const statusIOS = await check(PERMISSIONS.IOS.CAMERA);
    if (statusIOS !== RESULTS.GRANTED) {
      request(PERMISSIONS.IOS.CAMERA).then(() => iosPhotoLib());
    }
  };
  const iosLocation = async () => {
    const statusIOS = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (statusIOS !== RESULTS.GRANTED) {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(() => iosLocation());
    }
  };
  const iosRecord = async () => {
    const statusIOS = await check(PERMISSIONS.IOS.RECORD_AUDIO);
    if (statusIOS !== RESULTS.GRANTED) {
      request(PERMISSIONS.IOS.RECORD_AUDIO).then(() => iosLocation());
    }
  };
  const iosPhotoLib = async () => {
    const statusIOS = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (statusIOS !== RESULTS.GRANTED) {
      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(() => iosRecord());
    }
  };
  const iosMicroPhone = async () => {
    const statusIOS = await check(PERMISSIONS.IOS.MICROPHONE);
    if (statusIOS !== RESULTS.GRANTED) {
      request(PERMISSIONS.IOS.MICROPHONE).then(() => iosMicroPhone());
    }
  };

  useEffect(() => {
    Platform.OS === "android" && androidReadMediaImages();
    Platform.OS === "ios" && iosCamera();
  }, []);

  return <View />;
};
