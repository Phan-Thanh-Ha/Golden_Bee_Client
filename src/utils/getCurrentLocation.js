// import { useDispatch } from "react-redux";
// import { mainAction } from "../Redux/Action";
// import { updateLocation } from "../firebaseService/HandleOrder";

// export const getCurrentLocation = ({ orderId = "" }) => {
//   const dispatch = useDispatch();
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const newLocation = {
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       };
//       mainAction.locationUpdate(params, dispatch);
//       if (orderId) {
//         updateLocation(orderId, newLocation.latitude, newLocation.longitude);
//       }
//     },
//     (error) => console.error(error),
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   );
// };
