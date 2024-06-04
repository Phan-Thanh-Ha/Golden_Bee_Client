import { View } from "react-native";
import { colors } from "../styles/Colors";

const Box = ({ height = 10, width = '100%', bgColor = 'transparent' }) => {
  return (
    <View style={{
      width: width,
      height: height,
      backgroundColor: bgColor,
    }} />
  )
}


export default Box;
