import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LogoBee from "../../components/LogoBee";
import LayoutAbout from "../../components/layouts/LayoutAbout";
import { colors } from "../../styles/Colors";
import BtnPrimary from "../../components/buttons/BtnPrimary";
import CustomSwiper from "../../components/about/CustomSwiper";

const dataSlider = [
    {
        title: 'Thời gian linh động',
        description1: 'Thời gian làm việc tùy thuộc vào lựa chọn của bạn.',
        description2: 'Chuyển hóa thời gian rảnh của bạn thành thu nhập!',
        image: require('../../assets/images/tmp-client-1.png'),
    },
    {
        title: 'Thu nhập hấp dẫn',
        description1: 'Siêng năng và tích cực nhận việc.',
        description2: 'Thu nhập hấp dẫn đến 20 triệu/tháng!.',
        image: require('../../assets/images/tmp-client-2.png'),
    },
    {
        title: 'Chính sách đãi ngộ tốt',
        description1: 'Kênh chia sẻ tôn vinh giá trị lao động và nghề cung cấp dịch vụ.',
        description2: 'Được hưởng chính sách hỗ trợ tuyệt vời từ Ong Vàng',
        image: require('../../assets/images/tmp-client-3.png'),
    },
];

const AboutScreen = ({navigation}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);

    const handleNext = () => {
        if (currentIndex < dataSlider.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            swiperRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
        if(currentIndex === 2) {
            navigation.navigate("AuthHome");
        }
    };

    return (
        <LayoutAbout>
            <LogoBee />
            <CustomSwiper dataSlider={dataSlider} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} swiperRef={swiperRef}/>
            <View style={styles.buttonContainer}>
                <BtnPrimary onPress={handleNext}>
                    {currentIndex === 2 ? "Bắt đầu ": "Tiếp theo"}
                </BtnPrimary>
            </View>
        </LayoutAbout>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 280,
        height: 280,
        resizeMode: 'contain',
    },
    title: {
        color: colors.TEXT_WHITE_CLIENT,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        color: colors.TEXT_WHITE_CLIENT,
        fontSize: 15,
        textAlign: 'center',
        marginHorizontal: 20,
    },
    pagination: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'center',
    },
    dot: {
        width: 10,
        height: 5,
        borderRadius: 5,
        margin: 2,
    },
    activeDot: {
        backgroundColor: colors.YELLOW,
        width: 20,
    },
    inactiveDot: {
        backgroundColor: colors.WHITE,
    },
});

export default AboutScreen;
