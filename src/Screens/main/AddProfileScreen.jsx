import { Image, StyleSheet, Text, View } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Header from "../../components/Header";
import { colors } from "../../styles/Colors";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import MainStyles from "../../styles/MainStyle";
import { image_banner_5 } from "../../assets";
import Button from "../../components/buttons/Button";
import Box from "../../components/Box";
import { ScreenNames } from "../../Constants";

const AddProfileScreen = ({ navigation, route }) => {

  const handleUpdate = () => {
    navigation.navigate(ScreenNames.MAIN_NAVIGATOR);
  }
  return (
    <>
      <LayoutGradientBlue>
        <Header showBackButton={true} color={colors.WHITE} />
        <Box height={30} />
        <Text style={MainStyles.titleForgotPasswordForm}>
          Cập nhật thông tin
        </Text>
        <View style={MainStyles.containerFormActive}>

        </View>
        <Button onPress={handleUpdate} bgColor={colors.PRIMARY_GREEN}>
          Cập nhật
        </Button>
      </LayoutGradientBlue>
      <Footer />
    </>
  );
};

export default AddProfileScreen;
