import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../Constants';
import Button from '../../components/buttons/Button';
import BottomTabNavigator from '../../Navigation/BottomTabNavigator';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('phoneNumber');
      navigation.navigate(ScreenNames.AUTH_HOME);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Button onPress={handleLogout}>Đăng xuất</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
