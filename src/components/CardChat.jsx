import { Image, Pressable, View } from "react-native"
import MainStyles from "../styles/MainStyle"
import { Text } from "react-native"

export default CardChat = ({ data }) => {
  const onpenModal = () => {
    // console.log("open")
  }
  return (
    <View>
      <Pressable onPress={onpenModal}>
        <View style={MainStyles.containerZaloChat}>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.titleChatZalo}>{data.name}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}