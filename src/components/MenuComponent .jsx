import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import { SCREEN_WIDTH } from "../styles/MainStyle";
import { colors, themeColors } from "../styles/Colors";
import { Icon } from "@ui-kitten/components";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ModalRequired from "./modal/ModalRequired";

export const MenuComponent = () => {
  const navi = useNavigation();
  const userLogin = useSelector((state) => state.main.userLogin);
  const [isModalAlertVisible, setIsModalAlertVisible] = useState(false);
  return (
    <View style={styles.container} >
      <TouchableOpacity
        onPress={() => {
          userLogin ? navi.navigate(ScreenNames.BENEFITS) : setIsModalAlertVisible(true);
        }}
        style={styles.itemContainer}
      >
        <Icon
          name="gift-outline"
          fill={colors.YELLOW}
          style={{ width: 35, height: 35 }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Phúc lợi</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          userLogin ? navi.navigate(ScreenNames.ACCOUNT) : setIsModalAlertVisible(true);
        }}
        style={styles.itemContainer}
      >
        <Icon
          name="person-outline"
          fill={colors.YELLOW}
          style={{ width: 35, height: 35 }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Tài khoản</Text>
        </View>
      </TouchableOpacity>
      <ModalRequired
        title={"Bạn cần đăng nhập để sử dụng chức năng này"}
        isModalVisible={isModalAlertVisible}
        setModalVisible={setIsModalAlertVisible}
        onConfirm1={() => {
          setIsModalAlertVisible(false);
          navi.navigate(ScreenNames.LOGIN);
        }}
        onConfirm2={() => setIsModalAlertVisible(false)}
      />
    </View >
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 5,
    backgroundColor: themeColors.lightBackground,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContainer: {
    width: SCREEN_WIDTH * 0.2,
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    textAlign: "center",
    width: SCREEN_WIDTH * 0.2,
  },
  text: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 16,
  },
});
