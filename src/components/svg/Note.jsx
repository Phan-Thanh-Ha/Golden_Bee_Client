import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colors } from "../../styles/Colors"

function Note({ color = colors.MAIN_BLUE_CLIENT, size = 32 }) {
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
      className="lucide lucide-notebook-pen"
    >
      <Path d="M13.4 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2v-7.4M2 6h4M2 10h4M2 14h4M2 18h4" />
      <Path d="M18.4 2.6a2.17 2.17 0 013 3L16 11l-4 1 1-4z" />
    </Svg>
  )
}

export default Note
