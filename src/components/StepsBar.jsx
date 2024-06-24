import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../styles/Colors';

export default StepsBar = ({ rating = 5, fontSize = [20, 20], fillColor = colors.MAIN_BLUE_CLIENT, spa }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          key={i}
          width={fontSize[0]}
          height={fontSize[1]}
          fill={rating >= i ? fillColor : colors.GRAY}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={0.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-badge"
          style={{ marginLeft: 4 }}
        >
          <Path d="M3.85 8.62a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 4 4 0 01-4.77 4.78 4 4 0 01-6.75 0 4 4 0 01-4.78-4.77 4 4 0 010-6.76z" />
        </Svg>
      );
    }
    return stars;
  };

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: 4,
      padding: 5,
      borderColor: colors.GRAY,
      borderWidth: 1,
      borderRadius: 10
    }}>
      {renderStars()}
    </View>
  );
};

