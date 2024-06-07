import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Header from "../../components/Header";
import { colors } from "../../styles/Colors";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import MainStyles from "../../styles/MainStyle";
import { camera_icon, image_banner_5 } from "../../assets";
import Button from "../../components/buttons/Button";
import Box from "../../components/Box";
import { ScreenNames } from "../../Constants";
import CustomLabel from "../../components/forms/CustomLabel";

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
          Bổ sung hồ sơ
        </Text>

        <View style={MainStyles.containerFormUpload}>
          <View>
            <View style={MainStyles.rowBtnUpload}>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>Ảnh 3x4</CustomLabel>
              </View>
            </View>
            <View style={MainStyles.rowBtnUpload}>
              <Pressable style={[MainStyles.columnBtnUpload, { height: 220 }]}>
                <Image source={camera_icon} width={500} />
                <Text>Tải lên hình ảnh</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <View style={MainStyles.rowBtnUpload}>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>Ảnh CMND/CCCD</CustomLabel>
              </View>
            </View>
            <View style={MainStyles.rowBtnUpload}>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>Mặt trước</CustomLabel>
              </View>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>Mặt sau</CustomLabel>
              </View>
            </View>
            <View style={MainStyles.rowBtnUpload}>
              <Pressable style={MainStyles.columnBtnUpload}>
                <Image source={camera_icon} width={500} />
                <Text>Tải lên hình ảnh</Text>
              </Pressable>
              <Pressable style={MainStyles.columnBtnUpload}>
                <Image source={camera_icon} />
                <Text>Tải lên hình ảnh</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <View style={MainStyles.rowBtnUpload}>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>Giấy xác nhận cư trú</CustomLabel>
              </View>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>Sơ yếu lý lịch</CustomLabel>
              </View>
            </View>
            <View style={MainStyles.rowBtnUpload}>
              <Pressable style={MainStyles.columnBtnUpload}>
                <Image source={camera_icon} width={500} />
                <Text>Tải lên hình ảnh</Text>
              </Pressable>
              <Pressable style={MainStyles.columnBtnUpload}>
                <Image source={camera_icon} />
                <Text>Tải lên hình ảnh</Text>
              </Pressable>
            </View>
          </View>
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
