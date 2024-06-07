import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colors } from "react-native-swiper-flatlist/src/themes"

function Time({ color = colors.MAIN_BLUE_CLIENT, size = 32 }) {
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
      className="lucide lucide-timer-reset"
    >
      <Path d="M10 2h4M12 14v-4M4 13a8 8 0 018-7 8 8 0 11-5.3 14L4 17.6" />
      <Path d="M9 17H4v5" />
    </Svg>
  )
}

export default Time
