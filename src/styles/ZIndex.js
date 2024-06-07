import { Platform } from "react-native";

const ZIndex = Platform.select({
  ios: {
    zIndex: 100,
  },
  android: {
    elevation: 100,
  },
});

export default ZIndex;
