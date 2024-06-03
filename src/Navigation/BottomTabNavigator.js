import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Layout, Text } from '@ui-kitten/components';
import HomeScreen from "../Screens/main/HomeScreen";
import EmailScreen from "../Screens/main/EmailScreen";
import AccountScreen from "../Screens/main/AccountScreen";
import BenefitsScreen from "../Screens/main/BenefitsScreen";
import { View, StyleSheet } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props) => <Icon {...props} name='home-outline' />;
const EmailIcon = (props) => <Icon {...props} name='email-outline' />;
const AccountIcon = (props) => <Icon {...props} name='person-outline' />;
const BenefitsIcon = (props) => <Icon {...props} name='gift-outline' />;

const NotificationBadge = () => (
    <View style={styles.badge}>
        <Text style={styles.badgeText}>1</Text>
    </View>
);

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}
        appearance='noIndicator'
    >
        <BottomNavigationTab title='Home' icon={HomeIcon} />
        <BottomNavigationTab title='Email' icon={EmailIcon} />
        <BottomNavigationTab title='Account' icon={AccountIcon} />
        <BottomNavigationTab title='Benefits' icon={BenefitsIcon} />
    </BottomNavigation>
);

const BottomTabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Email" component={EmailScreen} />
        <Screen name="Account" component={AccountScreen} />
        <Screen name="Benefits" component={BenefitsScreen} />
    </Navigator>
);

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'red',
        borderRadius: 6,
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
    },
});

export default BottomTabNavigator;
