import { StatusBar } from "react-native"
import { colors } from "../styles/Colors"

export default StatusBarCustom = () => {
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor={colors.MAIN_BLUE_CLIENT}
      translucent={false}
    />
  )
}