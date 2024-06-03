import SwiperFlatList from "react-native-swiper-flatlist";
import {colors} from "../../styles/Colors";
import {Image, StyleSheet, Text, View} from "react-native";
import MainStyles, {SCREEN_WIDTH} from "../../styles/MainStyle";

const CustomSwiper = ({dataSlider, currentIndex, setCurrentIndex, swiperRef}) => {
    return (
        <>
            <SwiperFlatList
                ref={swiperRef}
                index={currentIndex}
                onChangeIndex={({index}) => setCurrentIndex(index)}
                showPagination={false}
                paginationStyleItem={{width: 10, height: 10}}
                paginationStyle={{position: 'absolute', bottom: 16}}
                paginationActiveColor={colors.YELLOW}
                paginationDefaultColor={colors.WHITE}
            >
                {dataSlider.map((item, index) => (
                    <View style={styles.slide} key={index}>
                        <Image
                            source={item.image}
                            style={styles.image}
                        />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description1}</Text>
                        <Text style={styles.description}>{item.description2}</Text>
                    </View>
                ))}
            </SwiperFlatList>
            <View style={styles.pagination}>
                {dataSlider.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === currentIndex ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH
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
    }
});
export default CustomSwiper;
