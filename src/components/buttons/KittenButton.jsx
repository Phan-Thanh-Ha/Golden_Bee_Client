import React from 'react';
import {Button, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PropTypes} from 'prop-types';

const KittenButton = ({bgColor, textColor = 'white', children, ...props}) => {
  const gradientColors = bgColor
    ? [bgColor, bgColor]
    : ['#4c669f', '#3b5998', '#192f6a'];

  return (
    <Button {...props} style={styles.button}>
      {() => (
        <LinearGradient
          colors={gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}>
          <Text style={{...styles.text, color: textColor}}>{children}</Text>
        </LinearGradient>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 0,
    borderRadius: 5,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});
KittenButton.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};
export default KittenButton;
