import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Image,
} from "react-native";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";
import { Icon } from "@ui-kitten/components";
import { ScreenNames } from "../Constants";
import HomeScreen from "../Screens/Home/HomeScreen";
import EmailScreen from "../Screens/Home/EmailScreen";
import BenefitsScreen from "../Screens/Home/BenefitsScreen";
import AccountScreen from "../Screens/Home/AccountScreen";
import { logo_bee_blue } from "../assets";
import { colors } from "../styles/Colors";

export const BottomTabNavigator = () => {
  const _renderIcon = (routeName, selectedTab) => {
    let iconName = "";
    let displayName = "";

    switch (routeName) {
      case ScreenNames.HOME:
        iconName = "home-outline";
        displayName = "Trang chủ";
        break;
      case ScreenNames.EMAIL:
        iconName = "email-outline";
        displayName = "Thông báo";
        break;
      case ScreenNames.BENEFITS:
        iconName = "gift-outline";
        displayName = "Phúc lợi";
        break;
      case ScreenNames.ACCOUNT:
        iconName = "person-outline";
        displayName = "Tài khoản";
        break;
      default:
        iconName = "home-outline";
        displayName = "Trang chủ";
    }

    return (
      <>
        <Icon
          name={iconName}
          fill={
            routeName === selectedTab
              ? colors.TEXT_COLOR_BLUE_TAB
              : colors.TEXT_COLOR_GRAY_TAB
          }
          style={{ width: 25, height: 25 }}
        />
        <Text
          style={{
            color:
              routeName === selectedTab
                ? colors.TEXT_COLOR_BLUE_TAB
                : colors.TEXT_COLOR_GRAY_TAB,
          }}
        >
          {displayName}
        </Text>
      </>
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={[
          styles.tabbarItem,
          routeName === selectedTab && styles.tabbarItemSelected,
        ]}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor="white"
      initialRouteName={ScreenNames.HOME}
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            // onPress={() => navigate(ScreenNames.HOME)}
          >
            <Image source={logo_bee_blue} style={styles.circleIcon} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <CurvedBottomBar.Screen
        name={ScreenNames.HOME}
        position="LEFT"
        component={() => <HomeScreen />}
      />
      <CurvedBottomBar.Screen
        name={ScreenNames.EMAIL}
        component={() => <EmailScreen />}
        position="RIGHT"
      />
      <CurvedBottomBar.Screen
        name={ScreenNames.BENEFITS}
        component={() => <BenefitsScreen />}
        position="LEFT"
      />
      <CurvedBottomBar.Screen
        name={ScreenNames.ACCOUNT}
        component={() => <AccountScreen />}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.WHITE,
    bottom: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  tabbarItemSelected: {},
  icon: {
    width: 32,
    height: 32,
  },
  circleIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
