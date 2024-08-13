import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import LayoutAbout from '../../components/layouts/LayoutAbout';
import {colors, themeColors} from '../../styles/Colors';
import CustomSwiper from '../../components/about/CustomSwiper';
import {ScreenNames} from '../../Constants';
import {image_banner_2, image_banner_3, image_banner_4} from '../../assets';
import Button from '../../components/buttons/Button';
import ArrowRight from '../../components/svg/ArrowRight';
import {setData} from '../../utils';
import StorageNames from '../../Constants/StorageNames';
import {PropTypes} from 'prop-types';

const dataSlider = [
  {
    title: 'Thời gian linh động',
    description1:
      'Thời gian làm việc tùy thuộc vào lựa chọn của bạn. Chuyển hóa thời gian rảnh của bạn thành thu nhập!',
    description2: '',
    image: image_banner_2,
  },
  {
    title: 'Thu nhập hấp dẫn',
    description1:
      'Siêng năng và tích cực nhận việc. Thu nhập hấp dẫn đến 20 triệu/tháng!.',
    description2: '',
    image: image_banner_3,
  },
  {
    title: 'Chính sách đãi ngộ tốt',
    description1:
      'Kênh chia sẻ tôn vinh giá trị lao động và nghề cung cấp dịch vụ. Được hưởng chính sách hỗ trợ tuyệt vời từ Ong Vàng',
    description2: '',
    image: image_banner_4,
  },
];

const AboutScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleNext = async () => {
    if (currentIndex < dataSlider.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      swiperRef.current.scrollToIndex({index: nextIndex, animated: true});
    }
    if (currentIndex === 2) {
      await setData(StorageNames.IS_OLD, true);
      navigation.reset({
        routes: [{name: ScreenNames.LOGIN}],
      });
    }
  };

  return (
    <LayoutAbout>
      <CustomSwiper
        dataSlider={dataSlider}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        swiperRef={swiperRef}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleNext}
          bgColor={themeColors.secondary}
          icon={() => <ArrowRight color={colors.WHITE} />}>
          {currentIndex === 2 ? 'Bắt đầu ' : 'Tiếp theo'}
        </Button>
      </View>
    </LayoutAbout>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
  },
});

AboutScreen.defaultProps = {
  navigation: {},
};
AboutScreen.propTypes = {
  navigation: PropTypes.object,
};

export default AboutScreen;
