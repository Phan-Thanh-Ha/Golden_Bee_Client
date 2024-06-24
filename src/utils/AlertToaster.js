import Toast from "react-native-toast-message";

export const AlertToaster = (typeAlt, title, subTitle = "") => {
  return Toast.show({
    type: typeAlt,
    text1: title,
    text2: subTitle,
  });
};
