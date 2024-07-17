import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import { SCREEN_WIDTH } from "../styles/MainStyle";
import { menuData } from "../Screens/data";
import { getIconById } from "../utils/RoutingService";
import { colors, themeColors } from "../styles/Colors";

const ITEMS_PER_ROW = 2;
const ITEM_WIDTH = SCREEN_WIDTH * 0.3 + 10;
const PROGRESS_BAR_WIDTH = SCREEN_WIDTH * 0.08;

export const MenuScroll = () => {
  const navi = useNavigation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollViewRef = useRef(null);

  const renderItems = () => {
    const rows = [];
    for (let i = 0; i < menuData.length; i += ITEMS_PER_ROW) {
      const rowItems = menuData.slice(i, i + ITEMS_PER_ROW).map((item) => (
        <TouchableOpacity
          key={item?.ServiceCode}
          onPress={() => {
            navi.navigate(ScreenNames.SERVICE_ESTIMATE, {
              service: item,
            });
          }}
          style={styles.itemContainer}
        >
          <FastImage
            style={styles.image}
            source={
              getIconById(item.ServiceId)
                ? getIconById(item.ServiceId)
                : { uri: "https://picsum.photos/200" }
            }
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.ServiceName}</Text>
          </View>
        </TouchableOpacity>
      ));

      rows.push(
        <View key={i} style={styles.row}>
          {rowItems}
        </View>
      );
    }
    return rows;
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const contentWidth = event.nativeEvent.contentSize.width;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;

    const scrollPercentage = (contentOffset / (contentWidth - layoutWidth)) * 100;
    setScrollPosition(scrollPercentage);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {renderItems()}
      </ScrollView>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressDot,
              { left: `${scrollPosition}%` }
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.lightBackground,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollViewContent: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "column",
  },
  itemContainer: {
    width: SCREEN_WIDTH * 0.3,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  image: {
    width: 70,
    height: 70,
  },
  textContainer: {
    textAlign: "center",
    width: SCREEN_WIDTH * 0.25,
  },
  text: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
  },
  progressBarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  progressBar: {
    width: PROGRESS_BAR_WIDTH,
    height: 4,
    backgroundColor: colors.GRAY,
    borderRadius: 2,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: themeColors.primary,
    position: 'absolute',
    top: -1,
    marginLeft: -5,
  },
});