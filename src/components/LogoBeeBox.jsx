import { Image, Text, View } from "react-native";
import { logo_bee_blue } from "../assets";
import { colors } from "../styles/Colors";

const LogoBeeBox = ({ color = colors.MAIN_BLUE_CLIENT, sizeImage = 100, sizeText = 28 }) => {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image
          source={logo_bee_blue}
          style={{
            with: sizeImage,
            height: sizeImage,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            color: color,
            fontWeight: 'bold',
            fontSize: sizeText,
          }}
        >
          Ong Vàng
        </Text>
      </View>
    </>
  )
}

export default LogoBeeBox;
