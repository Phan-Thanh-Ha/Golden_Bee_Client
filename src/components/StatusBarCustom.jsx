import {StatusBar} from 'react-native';
import {themeColors} from '../styles/Colors';
import React from 'react';

const StatusBarCustom = () => {
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor={themeColors.background}
      translucent={false}
    />
  );
};

StatusBarCustom.displayName = 'StatusBarCustom';

export default StatusBarCustom;
