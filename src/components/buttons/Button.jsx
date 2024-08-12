import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Spinner, Text} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

const Button = ({
  bgColor,
  textColor = 'white',
  fontSize = 20,
  fontWeight = 'normal',
  disable = false,
  isLoading = false,
  icon: Icon,
  children = 'default',
  onPress,
  ...props
}) => {
  const gradientColors = bgColor
    ? [bgColor, bgColor]
    : ['#4c669f', '#3b5998', '#192f6a'];

  return (
    <TouchableOpacity
      {...props}
      style={({pressed}) => [styles.button, {}, pressed && styles.pressed]}
      onPress={onPress}
      disabled={disable}>
      <View style={styles.gradientWrapper}>
        <LinearGradient
          colors={gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}>
          {!isLoading ? (
            <View style={styles.content}>
              <Text
                style={{
                  ...styles.text,
                  color: textColor,
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                }}>
                {children}
              </Text>
              {Icon && <Icon style={{...styles.icon}} />}
            </View>
          ) : (
            <View style={styles.content}>
              <Spinner status="warning" />
            </View>
          )}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.oneOf([
    'normal',
    'bold',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ]),
  disable: PropTypes.bool,
  isLoading: PropTypes.bool,
  boderWidth: PropTypes.number,
  icon: PropTypes.elementType,
  children: PropTypes.node,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    overflow: 'hidden',
    margin: 8,
  },
  pressed: {
    opacity: 0.75,
  },
  gradientWrapper: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {},
  text: {
    fontSize: 16,
    marginRight: 20,
  },
});

export default Button;
