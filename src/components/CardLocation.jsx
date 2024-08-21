import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/Colors";
import { useNavigation } from "@react-navigation/native";
import MainStyles, { SCREEN_WIDTH } from "../styles/MainStyle";
import { Icon } from "@ui-kitten/components";

export const CardLocation = ({ location }) => {
  return (
    <TouchableOpacity
      style={styles.container}
    >
      <View style={MainStyles.rowMargin}>
        <View style={MainStyles.flexRowFlexStart}>
          <Icon
            style={MainStyles.CardIcon}
            fill="#3366FF"
            name="pin-outline"
          />
          <Text style={MainStyles.textCardLocation}>
            {location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CardLocation;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    minWidth: SCREEN_WIDTH * 0.95
  },
  containerContent: {},
  title: {
    color: colors.BLACK,
    paddingRight: 25,
    fontSize: 16,
  },
  subTitle: {
    color: colors.GRAY,
    fontSize: 13,
  },
  iconLeft: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
});
