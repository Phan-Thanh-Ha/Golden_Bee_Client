import { Image, StatusBar, Text, View } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import Header from "../../components/Header";
import { colors } from "../../styles/Colors";
import Footer from "../../components/Footer";
import MainStyles from "../../styles/MainStyle";
import { image_banner_5 } from "../../assets";
import Button from "../../components/buttons/Button";
import Box from "../../components/Box";
import { ScreenNames } from "../../Constants";
import ProgressBar from "../../components/ProgressBar";
import { useNavigation } from "@react-navigation/native";
import StatusBarCustom from "../../components/StatusBarCustom";
import { responsivescreen } from "../../utils/responsive-screen";

const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const handleUpdate = () => {
    navigation.navigate(ScreenNames.ADD_PROFILE);
  }
  return (
    <LayoutGradientBlue>
      <Box height={responsivescreen.height(5)} />
      <View style={MainStyles.containerFormActive}>
        <View style={MainStyles.viewImgFormActive}>
          <Image
            source={image_banner_5}
            style={{
              width: 400,
              height: 200,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text style={MainStyles.titleUpdateProfile}>
          Cập nhật hồ sơ
        </Text>
        <Text style={MainStyles.subTitleUpdateProfile}>
          Chúc mừng bạn đã trở thành chú ong chăm chỉ !
          Hãy cập nhật hồ sơ để bắt đầu hành trình của chúng ta ban nhé !
        </Text>
        <ProgressBar total={5} pass={0} />
        <Box height={30} />
        <Button onPress={handleUpdate}>
          Cập nhật
        </Button>
      </View>
      <Footer />
    </LayoutGradientBlue>
  );
};

export default UpdateProfileScreen;
