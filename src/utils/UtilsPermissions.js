// import { Platform } from "react-native";
// import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

// export const RequestPermission = async () => {
//   const locationPermission =
//     Platform.OS === "ios"
//       ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
//       : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
//   const cameraPermission =
//     Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
//   const backgroundLocationPermission =
//     PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;

//   const locationPermissionStatus = await check(locationPermission);
//   const cameraPermissionStatus = await check(cameraPermission);
//   const backgroundLocationPermissionStatus = await check(
//     backgroundLocationPermission
//   );

//   if (locationPermissionStatus !== RESULTS.GRANTED) {
//     const newLocationPermissionStatus = await request(locationPermission);
//     if (newLocationPermissionStatus !== RESULTS.GRANTED) {
//       return RESULTS.DENIED;
//     }
//   }

//   if (cameraPermissionStatus !== RESULTS.GRANTED) {
//     const newCameraPermissionStatus = await request(cameraPermission);
//     if (newCameraPermissionStatus !== RESULTS.GRANTED) {
//       return RESULTS.DENIED;
//     }
//   }

//   if (backgroundLocationPermissionStatus !== RESULTS.GRANTED) {
//     const newBackgroundLocationPermissionStatus = await request(
//       backgroundLocationPermission
//     );
//     if (newBackgroundLocationPermissionStatus !== RESULTS.GRANTED) {
//       return RESULTS.DENIED;
//     }
//   }

//   return RESULTS.GRANTED;
// };
