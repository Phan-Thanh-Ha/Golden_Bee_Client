import React, { useEffect } from "react";
import { View, Platform } from "react-native";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

// Mở rộng mảng permissions để bao gồm các quyền cho iOS
const permissions = Platform.select({
  android: [
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
  ],
  ios: [
    PERMISSIONS.IOS.PHOTO_LIBRARY,
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    PERMISSIONS.IOS.MICROPHONE,
    // PERMISSIONS.IOS.NOTIFICATIONS,
  ],
});

export const RequestPermission = () => {
  const requestPermission = async (permission) => {
    const status = await check(permission);
    if (status !== RESULTS.GRANTED) {
      const newStatus = await request(permission);
      return { permission, status: newStatus };
    }
    return { permission, status };
  };

  const requestAllPermissions = async () => {
    const permissionsStatus = {};
    for (let permission of permissions) {
      const { status } = await requestPermission(permission);
      permissionsStatus[permission] = status;
    }
  };

  useEffect(() => {
    requestAllPermissions();
    // Bạn có thể thêm thêm điều kiện cho các nền tảng khác nếu cần
  }, []);

  return <View />;
};
