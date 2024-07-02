import React, { useEffect } from "react";
import { View, Platform } from "react-native";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

const permissions = [
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.CAMERA,
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, // Add this line
];

export const RequestPermission = () => {
  const requestPermission = async (permission) => {
    const status = await check(permission);
    if (status !== RESULTS.GRANTED) {
      return request(permission);
    }
  };

  const requestAllPermissions = async () => {
    for (let permission of permissions) {
      await requestPermission(permission);
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      requestAllPermissions();
    }
    // Add iOS permissions here
  }, []);

  return <View />;
};
