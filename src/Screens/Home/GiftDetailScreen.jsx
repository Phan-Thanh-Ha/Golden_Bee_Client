import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import HeaderComp from "../../components/HeaderComp";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { image_banner_3 } from "../../assets";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { Icon } from "@ui-kitten/components";
import { colors, themeColors } from "../../styles/Colors";
import Box from "../../components/Box";

const GiftDetailScreen = () => {
  return (
    <LayoutGradientBlue>
      <HeaderComp headerTitle="Chương Trình Tặng Quà" />
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Image
            source={image_banner_3}
            style={{ width: SCREEN_WIDTH, height: 210 }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.subtitle}>
            {`"Tham gia ngay chương trình tặng quà đặc biệt từ ứng dụng Ong Vàng và nhận những phần quà hấp dẫn!"`}
          </Text>
          <View style={styles.divider} />
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  textAlign: "center",
                  marginBottom: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                },
              ]}
            >
              Giới thiệu Chương Trình Tặng Quà Ong Vàng
            </Text>
          </View>
          <Text style={styles.paragraph}>Kính gửi Quý Khách Hàng,</Text>
          <Text style={[styles.paragraph]}>
            Chúng tôi rất vui mừng giới thiệu đến quý khách hàng chương trình
            tặng quà đặc biệt trên ứng dụng Ong Vàng – cơ hội nhận những phần
            quà giá trị khi sử dụng dịch vụ của chúng tôi.
          </Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={styles.sectionTitle}>Lợi Ích Của Chương Trình</Text>
          </View>
          <Text style={styles.paragraph}>
            Tham gia chương trình tặng quà của Ong Vàng, quý khách sẽ nhận được
            nhiều ưu đãi đặc biệt và những phần quà giá trị khi thực hiện các
            giao dịch trên ứng dụng. Dưới đây là những lợi ích cụ thể:
          </Text>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>1. Nhận Quà Tặng Hấp Dẫn</Text>
            <Text style={styles.paragraph}>
              Quý khách có thể nhận được các phần quà hấp dẫn khi đạt các mốc sử
              dụng dịch vụ nhất định trên ứng dụng Ong Vàng.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>2. Ưu Đãi Đặc Biệt</Text>
            <Text style={styles.paragraph}>
              Ngoài quà tặng, quý khách còn có cơ hội nhận được các mã giảm giá
              và ưu đãi đặc biệt từ các đối tác của Ong Vàng.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>3. Kết Nối Trực Tiếp</Text>
            <Text style={styles.paragraph}>
              Quý khách có thể dễ dàng sử dụng các phần quà và ưu đãi trực tiếp
              trên ứng dụng, mang lại trải nghiệm thuận tiện và nhanh chóng.
            </Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={styles.sectionTitle}>
              Cách Thức Tham Gia Chương Trình
            </Text>
          </View>
          <Text style={styles.paragraph}>
            Để tham gia chương trình tặng quà, quý khách chỉ cần thực hiện các
            giao dịch trên ứng dụng Ong Vàng và đạt các mốc nhất định. Hãy đảm
            bảo rằng bạn đã cập nhật phiên bản mới nhất của ứng dụng để nhận
            thông báo về các chương trình và sự kiện mới nhất.
          </Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={styles.sectionTitle}>
              Liên Hệ Để Biết Thêm Chi Tiết
            </Text>
          </View>
          <Text style={styles.paragraph}>
            Nếu quý khách cần thêm thông tin về chương trình hoặc gặp bất kỳ vấn
            đề nào, vui lòng liên hệ trực tiếp với tổng đài viên của chúng tôi:
          </Text>
          <Text style={styles.contactInfo}>Hotline: 09 222 777 82</Text>
          <Text style={styles.contactInfo}>Email: ongvangpro@gmail.com</Text>
          <Text style={styles.paragraph}>
            Tổng đài viên của chúng tôi luôn sẵn sàng hỗ trợ và tư vấn giúp quý
            khách hàng.
          </Text>
          <Text style={styles.signature}>Trân trọng,</Text>
          <Text style={styles.signature}>Đội ngũ Ong Vàng</Text>
        </View>
        <Box height={SCREEN_HEIGHT * 0.07} />
      </ScrollView>
      <LayoutBottom>
        <TouchableOpacity
          style={[styles.button, MainStyles.flexRowCenter]}
          onPress={() => {
            Linking.openURL(`tel:${"0922277782"}`);
          }}
        >
          <Icon
            style={MainStyles.CardIcon}
            fill="#FFFFFF"
            name="phone-outline"
          />
          <Text style={styles.buttonText}>Liên hệ ngay</Text>
        </TouchableOpacity>
      </LayoutBottom>
    </LayoutGradientBlue>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF9900",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  divider: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    // marginTop: 16,
    // marginBottom: 8,
    color: "#FF9900",
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.BLACK,
    marginBottom: 8,
    textAlign: "justify",
  },
  listItem: {
    marginBottom: 8,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF9900",
  },
  contactInfo: {
    fontSize: 16,
    lineHeight: 24,
    color: "#FF9900",
    marginBottom: 8,
  },
  signature: {
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 8,
    color: "#666",
  },
  button: {
    marginTop: 16,
    backgroundColor: themeColors.confirm,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    paddingLeft: 8,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GiftDetailScreen;
