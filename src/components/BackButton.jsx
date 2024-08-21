import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowLeft from './svg/ArrowLeft';
import { colors } from '../styles/Colors';
import { PropTypes } from 'prop-types';

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
    paddingVertical: Platform.OS === 'ios' ? 80 : 40,
    zIndex: 999,
  },
});
BackButton.defaultProps = {
  title: '',
  showBackButton: true,
  color: colors.WHITE,
};
BackButton.propTypes = {
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
  color: PropTypes.string,
};

export default BackButton;
