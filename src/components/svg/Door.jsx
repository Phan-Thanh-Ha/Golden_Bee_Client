import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colors } from "../../styles/Colors"

function Door({ color = colors.MAIN_BLUE_CLIENT, size = 32, strokeWidth = 2 }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-door-open"
    >
      <Path d="M13 4h3a2 2 0 012 2v14M2 20h3M13 20h9M10 12v.01M13 4.562v16.157a1 1 0 01-1.242.97L5 20V5.562a2 2 0 011.515-1.94l4-1A2 2 0 0113 4.561z" />
    </Svg>
  )
}

export default Door;
