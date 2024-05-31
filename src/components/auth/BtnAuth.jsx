import {Pressable, StyleSheet, Text, View} from "react-native";
import {colors} from "../../styles/Colors";
import React from "react";

const BtnAuth = ({ children, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? colors.TEXT_WHITE_CLIENT: colors.TEXT_WHITE_CLIENT,
                },
                styles.button,
            ]}
        >
            <View style={styles.content}>
                <Text style={styles.text}>{children}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: 330
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginRight: 10,
        fontSize: 20,
        color: colors.MAIN_BLUE_CLIENT,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    icon: {
        marginLeft: 5,
    },
});

export default BtnAuth;