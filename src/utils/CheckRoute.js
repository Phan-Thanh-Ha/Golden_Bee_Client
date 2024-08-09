import React, { useEffect } from "react";
import { getData } from "./LocalStorage";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";

const CheckRoute = () => {
  const navi = useNavigation();
  useEffect(() => {
    getRouter();
  }, []);

  const checkUploadCCCD = async (userLogin) => {
    if (
      userLogin?.FilesBC === "" ||
      userLogin?.FilesCCCD === "" ||
      userLogin?.FilesCCCD_BackSide === "" ||
      userLogin?.FilesCV === "" ||
      userLogin?.FilesImage === ""
    ) {
      navi.navigate(ScreenNames.UPDATE_PROFILE);
    } else {
      navi.navigate(ScreenNames.MAIN_NAVIGATOR);
    }
  };

  const getRouter = async () => {
    try {
      const userLogin = await getData(StorageNames.USER_PROFILE);
      if (!userLogin) {
        navi.navigate(ScreenNames.LOGIN);
      } else {
        checkUploadCCCD(userLogin);
      }
    } catch (error) {
      console.error("Failed to fetch the user from AsyncStorage:", error);
    }
  };

  return <View></View>;
};

export default CheckRoute;
