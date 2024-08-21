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
import { image_banner_4 } from "../../assets";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { Icon } from "@ui-kitten/components";
import { colors, themeColors } from "../../styles/Colors";
import Box from "../../components/Box";

const PremiumPartnerDetail = () => {
  return (
    <LayoutGradientBlue>
      <HeaderComp headerTitle="Nhân viên Premium" />
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Image
            source={image_banner_4}
            style={{ width: SCREEN_WIDTH, height: 210 }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.subtitle}>
            {`"Trở thành nhân viên Premium của Ong Vàng và khám phá những đặc quyền dành riêng cho bạn!"`}
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
              Chính sách dành cho Nhân viên Premium
            </Text>
          </View>
          <Text style={styles.paragraph}>Nhân viên Kính mến,</Text>
          <Text style={[styles.paragraph]}>
            Chúng tôi tự hào giới thiệu chính sách Nhân viên Premium của Ong Vàng – một chương trình đặc biệt nhằm ghi nhận và thưởng cho những nhân viên xuất sắc, đóng góp tích cực cho sự phát triển của công ty.
          </Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={styles.sectionTitle}>
              Lợi ích dành cho Nhân viên Premium
            </Text>
          </View>
          <Text style={styles.paragraph}>
            Khi trở thành Nhân viên Premium của Ong Vàng, bạn sẽ được hưởng những quyền lợi vượt trội như sau:
          </Text>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>
              1. Thu nhập Cao hơn
            </Text>
            <Text style={styles.paragraph}>
              Nhân viên Premium sẽ nhận được mức thu nhập cao hơn, tương xứng với những nỗ lực và đóng góp của bạn trong công việc.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>2. Ưu Tiên Thăng Tiến</Text>
            <Text style={styles.paragraph}>
              Bạn sẽ được ưu tiên trong việc xét duyệt các cơ hội thăng tiến, cũng như tham gia các khóa đào tạo phát triển kỹ năng chuyên môn.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>3. Chế Độ Phúc Lợi Đặc Biệt</Text>
            <Text style={styles.paragraph}>
              Nhân viên Premium sẽ được hưởng các chế độ phúc lợi đặc biệt như bảo hiểm cao cấp, chương trình du lịch hàng năm, và nhiều quyền lợi hấp dẫn khác.
            </Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={styles.sectionTitle}>
              Điều Kiện Trở Thành Nhân viên Premium
            </Text>
          </View>
          <Text style={styles.paragraph}>
            Để trở thành Nhân viên Premium của Ong Vàng, bạn cần đạt được những tiêu chí sau:
          </Text>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>
              1. Thành Tích Công Việc Xuất Sắc
            </Text>
            <Text style={styles.paragraph}>
              Bạn cần đạt được các chỉ tiêu công việc vượt trội và đóng góp tích cực cho sự phát triển chung của công ty.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>2. Tinh Thần Làm Việc Cao</Text>
            <Text style={styles.paragraph}>
              Tinh thần làm việc tích cực, trách nhiệm và sự cam kết với công việc là những yếu tố quan trọng để trở thành Nhân viên Premium.
            </Text>
          </View>
          <Text style={styles.paragraph}>
            Chúng tôi hy vọng rằng chương trình này sẽ là nguồn động viên lớn để bạn tiếp tục phấn đấu, nỗ lực hết mình và đạt được nhiều thành công hơn nữa trong sự nghiệp tại Ong Vàng.
          </Text>
          <Text style={styles.signature}>Trân trọng,</Text>
          <Text style={styles.signature}>Ban Giám Đốc Ong Vàng</Text>
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

export default PremiumPartnerDetail;
