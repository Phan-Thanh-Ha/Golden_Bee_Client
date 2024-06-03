// Layout gradient xanh dương

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from "../../styles/Colors";

const LayoutGradientBlue = ({children}) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.MAIN_BLUE_CLIENT, colors.SECOND_BLUE_CLIENT]}
                style={styles.gradient}
            />
            <SafeAreaView>
                {children}
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});

export default LayoutGradientBlue;
