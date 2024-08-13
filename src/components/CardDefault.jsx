import {Text, View} from 'react-native';
import MainStyles from '../styles/MainStyle';
import BeeFlying from './BeeFlying';
import React from 'react';
import {PropTypes} from 'prop-types';

const CardDefault = ({title = ''}) => {
  return (
    <View style={MainStyles.tabContainerDefault}>
      <BeeFlying />
      <Text style={MainStyles.textDefault}>{title}</Text>
    </View>
  );
};
CardDefault.defaultProps = {
  title: '',
};
CardDefault.propTypes = {
  title: PropTypes.string,
};

export default CardDefault;
