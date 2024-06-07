import { View } from "react-native";
import { colors } from "../styles/Colors";

const BreakLine = ({ color = colors.MAIN_BLUE_CLIENT, height = 2, marginVertical = 10 }) => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: color,
      height: height,
      width: "100%",
      marginVertical: marginVertical
    }} />
  );
};

export default BreakLine;