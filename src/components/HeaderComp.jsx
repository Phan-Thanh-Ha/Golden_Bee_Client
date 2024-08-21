import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, themeColors } from "../styles/Colors";
import MainStyles, { SCREEN_HEIGHT } from "../styles/MainStyle";
import ArrowLeft from "./svg/ArrowLeft";
import ArrowRight from "./svg/ArrowRight";
import { useNavigation } from "@react-navigation/native";

const HeaderComp = ({
  backBtnVisible = true,
  headerTitle = "Tiêu đề",
  iconRightVisible = false,
}) => {
  const navi = useNavigation();
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? SCREEN_HEIGHT * 0.01 : SCREEN_HEIGHT * 0.03,
        backgroundColor: themeColors.background,
        paddingHorizontal: 10,
        paddingBottom: 10
      }}
    >
      <View style={[MainStyles.flexRowSpaceBetween]}>
        {
          backBtnVisible && (
            <TouchableOpacity
              onPress={() => {
                navi.goBack();
              }}
            >
              <ArrowLeft color={colors.MAIN_BLUE_CLIENT} size={28} />
            </TouchableOpacity>
          )
        }
        <Text style={styles.textTitle}>{headerTitle}</Text>
        <View>
          {
            iconRightVisible && (
              <TouchableOpacity>
                <ArrowRight color={colors.MAIN_BLUE_CLIENT} size={28} />
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    color: colors.MAIN_BLUE_CLIENT,
    fontSize: 18,
    fontWeight: "600",
  }
})
export default HeaderComp;