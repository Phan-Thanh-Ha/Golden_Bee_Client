import React, {useEffect} from 'react';
import {Image, SafeAreaView, View, StyleSheet} from 'react-native';
import LogoBee from '../components/LogoBee';
import {colors} from '../styles/Colors';
import {image_banner_1} from '../assets';
import {ScreenNames} from '../Constants';
import {getData} from '../utils';
import StorageNames from '../Constants/StorageNames';
import {useNavigation} from '@react-navigation/native';
import {mainAction} from '../Redux/Action';
import {useDispatch} from 'react-redux';

const First = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    getRouter();
  }, []);

  const checkUploadCCCD = async userLogin => {
    try {
      if (
        !userLogin?.FilesBC ||
        !userLogin?.FilesCCCD ||
        !userLogin?.FilesCCCD_BackSide ||
        !userLogin?.FilesCV ||
        !userLogin?.FilesImage
      ) {
        navi.reset({
          index: 0,
          routes: [{name: ScreenNames.UPDATE_PROFILE}],
        });
      } else {
        navi.reset({
          index: 0,
          routes: [{name: ScreenNames.MAIN_NAVIGATOR}],
        });
      }
    } catch (error) {
      console.error('Error in checkUploadCCCD:', error);
      navi.reset({
        index: 0,
        routes: [{name: ScreenNames.HOME_MAIN_SCREEN}],
      });
    }
  };

  const getRouter = async () => {
    const isOld = await getData(StorageNames.IS_OLD);
    if (isOld) {
      try {
        const userLogin = await getData(StorageNames.USER_PROFILE);
        if (userLogin?.OfficerID === 7347) {
          mainAction.userLogin(userLogin, dispatch);
          navi.reset({
            index: 0,
            routes: [{name: ScreenNames.ESTIMATE_PRICE}],
          });
          return;
        }
        if (!userLogin) {
          navi.reset({
            index: 0,
            routes: [{name: ScreenNames.HOME_MAIN_SCREEN}],
          });
        } else {
          mainAction.userLogin(userLogin, dispatch);
          checkUploadCCCD(userLogin);
        }
      } catch {
        navi.reset({
          index: 0,
          routes: [{name: ScreenNames.HOME_MAIN_SCREEN}],
        });
      }
    } else {
      navi.reset({
        index: 0,
        routes: [{name: ScreenNames.ABOUT}],
      });
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
