import {Image, StatusBar, Text, View} from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import Footer from '../../components/Footer';
import MainStyles from '../../styles/MainStyle';
import {image_banner_5} from '../../assets';
import Button from '../../components/buttons/Button';
import Box from '../../components/Box';
import {ScreenNames} from '../../Constants';
import ProgressBar from '../../components/ProgressBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {responsivescreen} from '../../utils/responsive-screen';

const UpdateProfileScreen = () => {
  const route = useRoute();
  const userLogin = useSelector(state => state.main.userLogin);
  const total = () => {
    let i = 0;
    if (userLogin?.FilesBC) {
      i += 1;
    }
    if (userLogin?.FilesCCCD) {
      i += 1;
    }
    if (userLogin?.FilesCCCD_BackSide) {
      i += 1;
    }
    if (userLogin?.FilesCV) {
      i += 1;
    }
    if (userLogin?.FilesImage) {
      i += 1;
    }
    return i;
  }
  const UserProfile =
    route.params && route.params.data ? route.params.data : undefined;
  const navigation = useNavigation();
  const handleUpdate = () => {
    navigation.navigate(ScreenNames.ADD_PROFILE, {data: {UserProfile}});
  };
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
        <Text style={MainStyles.titleUpdateProfile}>Cập nhật hồ sơ</Text>
        <Text style={MainStyles.subTitleUpdateProfile}>
          Chúc mừng bạn đã trở thành chú ong chăm chỉ ! Hãy cập nhật hồ sơ để
          bắt đầu hành trình của chúng ta ban nhé !
        </Text>
        <ProgressBar total={5} pass={0} UserProfile={UserProfile} />
        <Box height={30} />
        <Button onPress={handleUpdate}>Cập nhật</Button>
      </View>
      <Footer />
    </LayoutGradientBlue>
  );
};

export default UpdateProfileScreen;
