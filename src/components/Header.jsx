import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ArrowLeft from './svg/ArrowLeft';
import {colors} from '../styles/Colors';
import {PropTypes} from 'prop-types';

const Header = ({
  title,
  showBackButton = true,
  color = colors.MAIN_BLUE_CLIENT,
}) => {
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
    top: 0,
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

Header.defaultProps = {
  title: 'Title',
  showBackButton: true,
  color: colors.MAIN_BLUE_CLIENT,
};
Header.propTypes = {
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
  color: PropTypes.string,
};

export default Header;
