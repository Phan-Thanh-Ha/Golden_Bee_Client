import React, { useEffect } from 'react';
import { Image, SafeAreaView, View, StyleSheet, Alert } from 'react-native';
import LogoBee from '../components/LogoBee';
import { colors } from '../styles/Colors';
import { image_banner_1 } from '../assets';
import { ScreenNames } from '../Constants';
import { getData } from '../utils';
import StorageNames from '../Constants/StorageNames';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { mainAction } from '../Redux/Action';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const First = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const startUp = async () => {
      try {
        const permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (permission === RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          const requestResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          if (requestResult === RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            Alert.alert('Permission Denied', 'Location permission is required to proceed.');
            navi.navigate(ScreenNames.AUTH_HOME);
          }
        }
      } catch (error) {
        console.error('Failed to request location permission:', error);
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          if (position.coords) {
            const params = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            mainAction.locationUpdate(params, dispatch);
            getRouter();
          }
        },
        error => {
          console.error('Error getting location:', error);
          getRouter();
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    startUp();
  }, []);

  const checkUploadCCCD = async (userLogin, serviceAccepted) => {
    mainAction.userLogin(userLogin, dispatch);
    mainAction.acceptedOrder(serviceAccepted, dispatch);
    if (
      userLogin.FilesBC === '' ||
      userLogin.FilesCCCD === '' ||
      userLogin.FilesCCCD_BackSide === '' ||
      userLogin.FilesCV === '' ||
      userLogin.Avatar === ''
    ) {
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
      const userLogin = await getData(StorageNames.USER_PROFILE);
      const serviceAccepted = await getData(StorageNames.ORDER_SERVICE);
      if (!userLogin) {
        navi.navigate(ScreenNames.AUTH_HOME);
      } else {
        checkUploadCCCD(userLogin, serviceAccepted);
      }
    } catch (error) {
      console.error('Failed to fetch the user from AsyncStorage:', error);
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
