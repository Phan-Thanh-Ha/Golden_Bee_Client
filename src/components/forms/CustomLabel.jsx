import React from 'react';
import { Text } from 'react-native';
import { colors } from "../../styles/Colors";

const CustomLabel = ({ children, fontSize = 15, color = colors.MAIN_BLUE_CLIENT, fontWeight = 'bold' }) => {
  return (
    <Text style={{
      fontWeight: fontWeight,
      marginBottom: 5,
      color: color,
      fontSize: fontSize,
    }}>
      {children}
    </Text>
  );
};

export default CustomLabel;
