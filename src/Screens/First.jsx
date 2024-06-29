import { Image, SafeAreaView, View, StyleSheet } from 'react-native';
import LogoBee from '../components/LogoBee';
import { colors } from '../styles/Colors';
import { useEffect } from 'react';
import { image_banner_1 } from '../assets';
import { ScreenNames } from '../Constants';
import { getData } from '../utils';
import StorageNames from '../Constants/StorageNames';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { mainAction } from '../Redux/Action';
import Geolocation from '@react-native-community/geolocation';

const First = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const startUp = async () => {
      try {
        // Lấy vị trí người dùng
        Geolocation.getCurrentPosition(
          position => {
            if (position.coords) {
              const params = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              // Cập nhật vị trí trong Redux
              mainAction.locationUpdate(params, dispatch);
              // Tiếp tục xử lý logic sau khi lấy vị trí
              getRouter();
            }
          },
          error => {
            // console.log('Error getting location:', error);
            // Nếu không lấy được vị trí, tiếp tục xử lý logic
            getRouter();
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      } catch (error) {
        // console.error('Failed to fetch data:', error);
      }
    };

    startUp();
  }, []);

  const checkUploadCCCD = async (userLogin, serviceAccepted) => {
    // Nếu có thông tin người dùng, cập nhật thông tin người dùng và dịch vụ được chấp nhận trong Redux
    mainAction.userLogin(userLogin, dispatch);
    mainAction.acceptedOrder(serviceAccepted, dispatch);
    if (
      userLogin.FilesBC === '' ||
      userLogin.FilesCCCD === '' ||
      userLogin.FilesCCCD_BackSide === '' ||
      userLogin.FilesCV === '' ||
      userLogin.Avatar === ''
    ) {
      // Nếu chưa có thông tin CCCD, điều hướng đến màn hình cập nhật CCCD
      navi.navigate(ScreenNames.UPDATE_PROFILE, {
        data: {
          FilesBC: userLogin.FilesBC,
          FilesCCCD: userLogin.FilesCCCD,
          FilesCCCD_BackSide: userLogin.FilesCCCD_BackSide,
          FilesCV: userLogin.FilesCV,
          Avatar: userLogin.Avatar,
        },
      });
    } else {
      navi.navigate(ScreenNames.MAIN_NAVIGATOR);
    }
  };

  const getRouter = async () => {
    try {
      // Lấy thông tin người dùng và dịch vụ được chấp nhận từ AsyncStorage
      const userLogin = await getData(StorageNames.USER_PROFILE);
      const serviceAccepted = await getData(StorageNames.ORDER_SERVICE);
      // Nếu không có thông tin người dùng, điều hướng đến màn hình xác thực
      if (!userLogin) {
        navi.navigate(ScreenNames.AUTH_HOME);
      } else {
        checkUploadCCCD(userLogin, serviceAccepted);
      }
    } catch (error) {
      // console.error('Failed to fetch the user from AsyncStorage:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LogoBee />
        <View style={styles.imageContainer}>
          <Image source={image_banner_1} style={styles.image} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.WHITE,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
});

export default First;
