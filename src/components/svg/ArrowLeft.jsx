import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colors } from "../../styles/Colors";

function ArrowLeft({ color = colors.MAIN_BLUE_CLIENT }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-left"
    >
      <Path d="M12 19l-7-7 7-7M19 12H5" />
    </Svg>
  )
}

export default ArrowLeft;
