import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image'; // Hoặc thư viện hình ảnh khác nếu cần
import { themeColors, colors } from '../styles/Colors';
import { SCREEN_HEIGHT } from '../styles/MainStyle';
import { PropTypes } from 'prop-types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;

const ServiceCarousel = ({ dataNewService = [] }) => {
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <FastImage
          style={styles.image}
          source={{ uri: item.ImageNewsShow }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.MetaDescription}</Text>
          <Text style={styles.description}>{item.NewsDescriptionEn}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📣 Dịch vụ nổi bật</Text>
      <Carousel
        data={dataNewService}
        renderItem={renderItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={ITEM_WIDTH}
        loop
        autoplay
        autoplayDelay={3000}
        autoplayInterval={3000}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        contentContainerCustomStyle={styles.carouselContentContainer}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: themeColors.lightBackground,
    overflow: 'hidden',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.MAIN_BLUE_CLIENT,
  },
  cardContainer: {
    height: SCREEN_HEIGHT * 0.35,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: SCREEN_HEIGHT * 0.35,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: ITEM_WIDTH * 0.96,
    height: 180,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    padding: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.MAIN_BLUE_CLIENT,
  },
  description: {
    fontSize: 14,
    color: themeColors.secondaryText,
    marginTop: 5,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: themeColors.paginationDot,
  },
  activeDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.MAIN_BLUE_CLIENT,
  },
  carouselContentContainer: {
    // paddingHorizontal: SCREEN_WIDTH * (1 - 0.8) / 2, // Padding để đảm bảo item nằm ở lề trái
  },
});

ServiceCarousel.defaultProps = {
  dataNewService: [],
};
ServiceCarousel.propTypes = {
  dataNewService: PropTypes.array,
};

export default ServiceCarousel;
