import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowLeft from "./svg/ArrowLeft";
import { colors } from "../styles/Colors";

const BackButton = ({ title, showBackButton = true, color = colors.WHITE }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft color={color} />
        </TouchableOpacity>
      )}
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    zIndex: 999,
  },
});

export default BackButton;
