import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
const Button = ({ bgColor, textColor = 'white', fontSize = 20, fontWeight = 'normal', icon: Icon, children = 'default', onPress , ...props }) => {
    const gradientColors = bgColor ? [bgColor, bgColor] : ['#4c669f', '#3b5998', '#192f6a'];

    return (
        <Pressable
            {...props}
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            <View style={styles.gradientWrapper}>
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    <View style={styles.content}>
                        <Text style={{ ...styles.text, color: textColor , fontSize: fontSize, fontWeight: fontWeight}}>
                            {children}
                        </Text>
                        {Icon && <Icon style={{ ...styles.icon}} />}
                    </View>
                </LinearGradient>
            </View>
        </Pressable>
    );
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
    icon: {
    },
    text: {
        fontSize: 16,
        marginRight: 20
    },
});

export default Button;


// <Button
//     bgColor={colors.SUCCESS}
//     textColor={colors.RED}
//     icon={ ()=> (<ArrowRight color={colors.WHITE}/>)}
//     fontSize={15}
// >
//     Hello
// </Button>
