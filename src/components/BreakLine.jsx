import {View} from 'react-native';
import {colors} from '../styles/Colors';
import React from 'react';
import {PropTypes} from 'prop-types';

const BreakLine = ({
  color = colors.MAIN_BLUE_CLIENT,
  height = 2,
  marginVertical = 10,
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        height: height,
        width: '100%',
        marginVertical: marginVertical,
      }}
    />
  );
};

BreakLine.defaultProps = {
  color: colors.MAIN_BLUE_CLIENT,
  height: 2,
  marginVertical: 10,
};
BreakLine.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  marginVertical: PropTypes.number,
};

export default BreakLine;
