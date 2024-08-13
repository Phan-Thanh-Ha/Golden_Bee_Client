import {Image, SafeAreaView, View, StyleSheet} from 'react-native';
import LogoBee from '../components/LogoBee';
import {colors} from '../styles/Colors';
import React, {useEffect} from 'react';
import {image_banner_1} from '../assets';
import {ScreenNames} from '../Constants';
import {PropTypes} from 'prop-types';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ScreenNames.ABOUT);
    }, 3000);
  }, [navigation]);

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

SplashScreen.defaultProps = {
  navigation: {},
};
SplashScreen.propTypes = {
  navigation: PropTypes.object,
};

export default SplashScreen;
