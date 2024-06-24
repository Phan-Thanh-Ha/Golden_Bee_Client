import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const responsivescreen = {
  width: (dpWidth) => wp(dpWidth),
  height: (dpHeight) => hp(dpHeight),
};
