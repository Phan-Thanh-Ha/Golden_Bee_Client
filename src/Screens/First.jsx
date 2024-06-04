import { Image, SafeAreaView, View, StyleSheet } from "react-native";
import LogoBee from "../components/LogoBee";
import { colors } from "../styles/Colors";
import { useEffect, useState } from "react";
import { image_banner_1 } from "../assets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenNames } from "../Constants";

const First = ({ navigation }) => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkPhoneNumber = async () => {
      try {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (phoneNumber) {
          console.log('Phone Number found:', phoneNumber);
          setInitialRoute(ScreenNames.UPDATE_PROFILE);
        } else {
          console.log('No Phone Number found, navigating to Login');
          setInitialRoute(ScreenNames.ABOUT);
        }
      } catch (error) {
        console.error('Failed to fetch the phone number from AsyncStorage:', error);
        setInitialRoute(ScreenNames.ABOUT);
      }
    };

    checkPhoneNumber();
  }, []);

  useEffect(() => {
    if (initialRoute !== null) {
      setTimeout(() => {
        navigation.navigate(initialRoute);
      }, 3000);
    }
  }, [initialRoute, navigation]);

  if (initialRoute === null) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LogoBee />
        <View style={styles.imageContainer}>
          <Image
            source={image_banner_1}
            style={styles.image}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.WHITE
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
