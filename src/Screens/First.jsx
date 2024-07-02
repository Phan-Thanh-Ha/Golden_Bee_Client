import React, { useEffect } from 'react';
import { Image, SafeAreaView, View, StyleSheet, Alert } from 'react-native';
import LogoBee from '../components/LogoBee';
import { colors } from '../styles/Colors';
import { image_banner_1 } from '../assets';
import { ScreenNames } from '../Constants';
import { getData } from '../utils';
import StorageNames from '../Constants/StorageNames';
import { useNavigation } from '@react-navigation/native';

const First = () => {
  const navi = useNavigation();

  useEffect(() => {
    getRouter();
  }, []);

  const checkUploadCCCD = async (userLogin) => {
    try {
      if (
        !userLogin?.FilesBC ||
        !userLogin?.FilesCCCD ||
        !userLogin?.FilesCCCD_BackSide ||
        !userLogin?.FilesCV ||
        !userLogin?.FilesImage
      ) {
        console.log('Missing user files, navigating to UPDATE_PROFILE');
        navi.navigate(ScreenNames.UPDATE_PROFILE);
      } else {
        console.log('All user files present, navigating to MAIN_NAVIGATOR');
        navi.navigate(ScreenNames.MAIN_NAVIGATOR);
      }
    } catch (error) {
      console.error('Error in checkUploadCCCD:', error);
      navi.navigate(ScreenNames.AUTH_HOME);
    }
  };

  const getRouter = async () => {
    try {
      const userLogin = await getData(StorageNames.USER_PROFILE);
      console.log('User login data:', userLogin);
      if (!userLogin) {
        console.log('User not found, navigating to AUTH_HOME');
        navi.navigate(ScreenNames.AUTH_HOME);
      } else {
        checkUploadCCCD(userLogin);
      }
    } catch (error) {
      console.error('Failed to fetch the user from AsyncStorage:', error);
      navi.navigate(ScreenNames.AUTH_HOME);
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
