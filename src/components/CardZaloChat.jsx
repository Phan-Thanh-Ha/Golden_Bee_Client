import { Image, Pressable, View } from "react-native"
import { image_banner_4, zalo_icon } from "../assets"
import MainStyles from "../styles/MainStyle"
import { Text } from "react-native"
import { colors } from "../styles/Colors"

export default CardZaloChat = () => {
  const onpenModal = () => {
    // console.log("open")
  }
  return (
    <View>
      <Pressable onPress={onpenModal}>
        <View style={MainStyles.containerZaloChat}>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.titleChatZalo}>Chat với tổng đài</Text>
            <Image
              source={zalo_icon}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain'
              }}
            />
          </View>
        </View>
      </Pressable>
    </View>
  )
}