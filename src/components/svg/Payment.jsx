import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { colors } from "react-native-swiper-flatlist/src/themes"

function Payment({ color = colors.MAIN_BLUE_CLIENT, size = 32 }) {
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
      className="lucide lucide-credit-card"
    >
      <Rect width={20} height={14} x={2} y={5} rx={2} />
      <Path d="M2 10L22 10" />
    </Svg>
  )
}

export default Payment
