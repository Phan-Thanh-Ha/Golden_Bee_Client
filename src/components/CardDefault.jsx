import { Text, View } from "react-native"
import MainStyles from "../styles/MainStyle";
import BeeFlying from "./BeeFlying";

const CardDefault = ({ title = "" }) => {
  return (
    <View style={MainStyles.tabContainerDefault}>
      <BeeFlying />
      <Text style={MainStyles.textDefault}>{title}</Text>
    </View>
  )
};

export default CardDefault;