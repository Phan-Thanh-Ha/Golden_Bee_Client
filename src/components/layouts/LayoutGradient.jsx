import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from "../../styles/Colors";

const LayoutGradient = ({ children }) => {
    return (
        <LinearGradient
            colors={[colors.MAIN_COLOR_CLIENT, colors.Amber["100"]]}
            style={styles.container}
        >
            <SafeAreaView>
                {children}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default LayoutGradient;
