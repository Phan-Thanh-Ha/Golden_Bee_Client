import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { colors } from "../../styles/Colors"

function Day({ color = colors.MAIN_BLUE_CLIENT, size = 32 }) {
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
      className="lucide lucide-calendar-range"
    >
      <Rect width={18} height={18} x={3} y={4} rx={2} />
      <Path d="M16 2v4M3 10h18M8 2v4M17 14h-6M13 18H7M7 14h.01M17 18h.01" />
    </Svg>
  )
}

export default Day
