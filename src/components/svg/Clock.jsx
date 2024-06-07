import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
import { colors } from "../../styles/Colors"

function Clock({ color = colors.MAIN_BLUE_CLIENT, size = 32 }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-clock-3"
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 6L12 12 16.5 12" />
    </Svg>
  )
}

export default Clock
