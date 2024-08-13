import {View} from 'react-native';
import React from 'react';
import {PropTypes} from 'prop-types';

const Box = ({height = 10, width = '100%', bgColor = 'transparent'}) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor,
      }}
    />
  );
};

Box.defaultProps = {
  height: 10,
  width: '100%',
  bgColor: 'transparent',
};
Box.propTypes = {
  height: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bgColor: PropTypes.string,
};

export default Box;
