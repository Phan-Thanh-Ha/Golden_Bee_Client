import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
import { colors } from "../../styles/Colors"

function Money({ color = colors.MAIN_BLUE_CLIENT, size = 32 }) {
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
      className="lucide lucide-hand-coins"
    >
      <Path d="M11 15h2a2 2 0 100-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
      <Path d="M7 21l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 00-2.75-2.91l-4.2 3.9M2 16l6 6" />
      <Circle cx={16} cy={9} r={2.9} />
      <Circle cx={6} cy={5} r={3} />
    </Svg>
  )
}

export default Money
