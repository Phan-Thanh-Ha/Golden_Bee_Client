import React from 'react';
import {Text} from 'react-native';
import {colors} from '../../styles/Colors';
import {PropTypes} from 'prop-types';

const CustomLabel = ({
  children,
  fontSize = 15,
  color = colors.MAIN_BLUE_CLIENT,
  fontWeight = 'bold',
}) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        marginBottom: 5,
        color: color,
        fontSize: fontSize,
      }}>
      {children}
    </Text>
  );
};

CustomLabel.propTypes = {
  children: PropTypes.node,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
};

export default CustomLabel;
