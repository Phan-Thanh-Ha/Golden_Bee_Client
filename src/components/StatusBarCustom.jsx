import { StatusBar } from "react-native"
import { colors, themeColors } from "../styles/Colors"

export default StatusBarCustom = () => {
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor={themeColors.background}
      translucent={false}
    />
  )
}