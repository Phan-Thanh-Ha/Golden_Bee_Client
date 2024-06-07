import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../Constants';
import Button from '../../components/buttons/Button';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';

const AccountScreen = () => {
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
    <LayoutGradientBlue>
      <Button onPress={handleLogout}>Đăng xuất</Button>
    </LayoutGradientBlue>
  );
};

export default AccountScreen;
