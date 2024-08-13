import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import {SCREEN_HEIGHT} from '../styles/MainStyle';

const carouselItemComp = ({dataCarousel = []}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const width = Dimensions.get('window').width;
  const _renderItem = ({item}) => {
    return (
      <View style={{width: '100%'}}>
        <FastImage
          source={{uri: item.Links + item.ImageShow}}
          style={{
            height: SCREEN_HEIGHT * 0.2,
            borderRadius: 10,
            width: '100%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{alignItems: 'center', width: '100%'}}>
      <Carousel
        data={dataCarousel}
        renderItem={_renderItem}
        loop={true}
        autoplay={true}
        sliderWidth={width}
        itemWidth={width - 20}
        onSnapToItem={index => setActiveIndex(index)}
        removeClippedSubviews
      />
      <Pagination
        dotsLength={dataCarousel.length}
        activeDotIndex={activeIndex}
        containerStyle={{paddingVertical: 0, marginVertical: 5}}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export const CarouselItem = React.memo(carouselItemComp);
