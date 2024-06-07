import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Rating = ({ rating = 5, fontSize = [20, 20] }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Svg
          key={i}
          width={fontSize[0]}
          height={fontSize[1]}
          viewBox="0 0 22 20"
          fill={rating >= i ? 'gold' : 'gray'}
          style={{ marginLeft: 4 }}
        >
          <Path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </Svg>
      );
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
      {renderStars()}
    </View>
  );
};

export default Rating;
