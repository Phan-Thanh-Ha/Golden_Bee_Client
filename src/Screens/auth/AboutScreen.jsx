import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LogoBee from "../../components/LogoBee";
import LayoutAbout from "../../components/layouts/LayoutAbout";
import { colors } from "../../styles/Colors";
import CustomSwiper from "../../components/about/CustomSwiper";
import { ScreenNames } from "../../Constants";
import { image_banner_2, image_banner_3, image_banner_4 } from "../../assets";
import Button from "../../components/buttons/Button";
import ArrowRight from "../../components/svg/ArrowRight";

const dataSlider = [
  {
    title: 'Thời gian linh động',
    description1: 'Thời gian làm việc tùy thuộc vào lựa chọn của bạn.',
    description2: 'Chuyển hóa thời gian rảnh của bạn thành thu nhập!',
    image: image_banner_2,
  },
  {
    title: 'Thu nhập hấp dẫn',
    description1: 'Siêng năng và tích cực nhận việc.',
    description2: 'Thu nhập hấp dẫn đến 20 triệu/tháng!.',
    image: image_banner_3,
  },
  {
    title: 'Chính sách đãi ngộ tốt',
    description1: 'Kênh chia sẻ tôn vinh giá trị lao động và nghề cung cấp dịch vụ.',
    description2: 'Được hưởng chính sách hỗ trợ tuyệt vời từ Ong Vàng',
    image: image_banner_4,
  },
];

const AboutScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < dataSlider.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      swiperRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
    if (currentIndex === 2) {
      navigation.navigate(ScreenNames.AUTH_HOME);
    }
  };

  return (
    <LayoutAbout>
      <LogoBee />
      <CustomSwiper dataSlider={dataSlider} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} swiperRef={swiperRef} />
      <View>
        <View>
          <Button
            onPress={handleNext}
            bgColor={colors.PRIMARY_GREEN}
            icon={() => <ArrowRight color={colors.WHITE} />}
          >
            {currentIndex === 2 ? "Bắt đầu " : "Tiếp theo"}
          </Button>
        </View>
      </View>
    </LayoutAbout>
  );
};

export default AboutScreen;
