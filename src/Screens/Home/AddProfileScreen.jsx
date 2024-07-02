import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import Header from '../../components/Header';
import { colors } from '../../styles/Colors';
import React, { useEffect, useState } from 'react';
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/MainStyle';
import { camera_icon, image_banner_5 } from '../../assets';
import Button from '../../components/buttons/Button';
import { ScreenNames } from '../../Constants';
import CustomLabel from '../../components/forms/CustomLabel';
import LayoutBottom from '../../components/layouts/LayoutBottom';
import BtnGetImageModal from '../../components/BtnGetImageModal';
import { AlertToaster } from '../../utils/AlertToaster';
import ArrowRight from '../../components/svg/ArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import { mainAction } from '../../Redux/Action';
import { setData } from '../../utils';
import ModalUserNotActive from '../../components/modal/ModalUserNotActive';
import { useNavigation } from '@react-navigation/native';

const AddProfileScreen = ({ navigation, route }) => {
  const [cmndFront, setCmndFront] = useState([]);
  const [cmndBack, setCmndBack] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState([]);
  const [background, setBackground] = useState([]);
  const [avatar, setAvartar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userLogin = useSelector(state => state.main.userLogin);
  const dispatch = useDispatch();
  const navi = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const UserProfile =
    route.params && route.params.data ? route.params.data : undefined;
  const onConfirm = () => {
    Linking.openURL(`tel:${'0922277782'}`);
    navi.navigate(ScreenNames.MAIN_NAVIGATOR);
    setIsModalVisible(false);
  }
  const validateForm = () => {
    if (avatar.length === 0 || avatar[0] === undefined) {
      AlertToaster(
        'error',
        'Bạn cần cung cấp đủ thông tin',
        'Vui lòng thêm ảnh 3x4',
      );
      setIsLoading(false);
      return false;
    } else if (cmndFront.length === 0 || cmndFront[0] === undefined) {
      AlertToaster(
        'error',
        'Bạn cần cung cấp đủ thông tin',
        'Vui lòng thêm CMND/CCCD mặt trước',
      );
      setIsLoading(false);
      return false;
    } else if (cmndBack.length === 0 || cmndBack[0] === undefined) {
      AlertToaster(
        'error',
        'Bạn cần cung cấp đủ thông tin',
        'Vui lòng thêm CMND/CCCD mặt sau',
      );
      setIsLoading(false);
      return false;
    } else if (confirmAddress.length === 0 || confirmAddress[0] === undefined) {
      AlertToaster(
        'error',
        'Bạn cần cung cấp đủ thông tin',
        'Vui lòng thêm Giấy xác nhận cư trú',
      );
      setIsLoading(false);
      return false;
    } else if (background.length === 0 || background[0] === undefined) {
      AlertToaster(
        'error',
        'Bạn cần cung cấp đủ thông tin',
        'Vui lòng thêm sơ yếu lý lịch',
      );
      setIsLoading(false);
      return false;
    } else return true;
  };
  const CRM2_spProfileOfficer_Save = async () => {
    const valid = validateForm();
    // console.log("is valid : ", valid);
    if (valid) {
      try {
        const pr = {
          GroupUserId: 10060,
          IdProfileOfficer: 0,
          OfficerID: userLogin.OfficerID,
          OfficerName: userLogin.OfficerName,
          FilesCCCD: cmndFront.join(''),
          FilesCCCD_BackSide: cmndBack.join(''),
          FilesCV: confirmAddress.join(''),
          FilesImage: avatar.join(''),
          FilesBC: background.join(''),
        };
        console.log('pr : ', pr);
        const params = {
          Json: JSON.stringify(pr),
          func: 'CRM2_spProfileOfficer_Save',
        };

        const result = await mainAction.API_spCallServer(params, dispatch);
        console.log('result : ', result);
        // Cập nhật xuống localStore để lưu trạng thái đã cập nhật hồ sơ
        if (result.Status === 'Success') {
          await setData(StorageNames.USER_PROFILE, {
            ...userLogin,
            FilesBC: background.join(''),
            FilesCCCD: cmndFront.join(''),
            FilesCCCD_BackSide: cmndBack.join(''),
            FilesCV: confirmAddress.join(''),
            Avatar: avatar.join(''),
          });
          console.log('check result ', result);
          setIsLoading(false);
          AlertToaster('success', 'Cập nhật hồ sơ thành công !');
          if (userLogin?.State === 10 || !userLogin?.State) {
            // setTitle("Hồ sơ của bạn đã được cập nhật thành công ! Vui lòng liên hệ Admin Ong Vàng để được hỗ trợ kích hoạt tài khoản");
            setIsModalVisible(true);
          } else {
            navi.navigate(ScreenNames.MAIN_NAVIGATOR);
          }
        }
      } catch (error) {
        console.log('-----> 💀💀💀💀💀💀💀💀💀 <-----  error:', error);
      }
    }
  };
  return (
    <LayoutGradientBlue>
      <ScrollView>
        <Header showBackButton={true} color={colors.WHITE} />
        <Text style={MainStyles.titleForgotPasswordForm}>Bổ sung hồ sơ</Text>
        <View style={MainStyles.containerFormUpload}>
          <View>
            <View style={MainStyles.rowBtnUpload}>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>
                  Ảnh 3x4
                </CustomLabel>
              </View>
            </View>
            <BtnGetImageModal
              setImageUrl={setAvartar}
              btnWidth={SCREEN_WIDTH * 0.4}
              btnHeight={SCREEN_HEIGHT * 0.2}
            />
          </View>
          <View>
            <View style={MainStyles.rowBtnUpload}>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>
                  Ảnh CMND/CCCD
                </CustomLabel>
              </View>
            </View>
            <View style={MainStyles.rowBtnUpload}>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>
                  Mặt trước
                </CustomLabel>
              </View>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>
                  Mặt sau
                </CustomLabel>
              </View>
            </View>
            <View style={MainStyles.rowBtnUpload}>
              <BtnGetImageModal
                setImageUrl={setCmndFront}
                btnWidth={SCREEN_WIDTH * 0.4}
                btnHeight={SCREEN_HEIGHT * 0.15}
              />
              <BtnGetImageModal
                setImageUrl={setCmndBack}
                btnWidth={SCREEN_WIDTH * 0.4}
                btnHeight={SCREEN_HEIGHT * 0.15}
              />
            </View>
          </View>
          <View>
            <View style={MainStyles.rowBtnUpload}>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>
                  Giấy xác nhận cư trú
                </CustomLabel>
              </View>
              <View style={MainStyles.columnBtn}>
                <CustomLabel fontSize={15} color={colors.MAIN_BLUE_CLIENT}>
                  Sơ yếu lý lịch
                </CustomLabel>
              </View>
            </View>
            <View style={MainStyles.rowBtnUpload}>
              <BtnGetImageModal
                setImageUrl={setConfirmAddress}
                btnWidth={SCREEN_WIDTH * 0.4}
                btnHeight={SCREEN_HEIGHT * 0.15}
              />
              <BtnGetImageModal
                setImageUrl={setBackground}
                btnWidth={SCREEN_WIDTH * 0.4}
                btnHeight={SCREEN_HEIGHT * 0.15}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <LayoutBottom>
        <Button
          onPress={CRM2_spProfileOfficer_Save}
          bgColor={colors.PRIMARY_GREEN}
          icon={() => <ArrowRight color={colors.WHITE} />}
          isLoading={isLoading}
          disable={isLoading}>
          Cập nhật
        </Button>
      </LayoutBottom>
      <ModalUserNotActive
        title={"Hồ sơ của bạn đã được cập nhật thành công, vui lòng liên hệ quản trị viên Ong Vàng để được kích hoạt tìa khoản và sử dụng các dịch vụ của chúng tôi !"}
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm={onConfirm}
      />
    </LayoutGradientBlue>
  );
};

export default AddProfileScreen;
