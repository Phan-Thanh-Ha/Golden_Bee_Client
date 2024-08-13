import {Image, View} from 'react-native';
import {logo_bee_blue} from '../assets';
import React from 'react';
import {PropTypes} from 'prop-types';

const Logo = ({sizeImage = 120}) => {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image
          source={logo_bee_blue}
          style={{
            with: sizeImage,
            height: sizeImage,
            resizeMode: 'contain',
          }}
        />
      </View>
    </>
  );
};

Logo.defaultProps = {
  sizeImage: 120,
};
Logo.propTypes = {
  sizeImage: PropTypes.number,
};

export default Logo;
