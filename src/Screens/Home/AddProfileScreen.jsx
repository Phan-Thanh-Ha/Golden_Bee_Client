import {ScrollView, Text, View} from 'react-native';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import Header from '../../components/Header';
import {colors} from '../../styles/Colors';
import React, {useState} from 'react';
import MainStyles, {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/MainStyle';
import Button from '../../components/buttons/Button';
import {ScreenNames} from '../../Constants';
import CustomLabel from '../../components/forms/CustomLabel';
import LayoutBottom from '../../components/layouts/LayoutBottom';
import BtnGetImageModal from '../../components/BtnGetImageModal';
import ArrowRight from '../../components/svg/ArrowRight';
import {useDispatch, useSelector} from 'react-redux';
import {mainAction} from '../../Redux/Action';
import {setData} from '../../utils';
import ModalUserNotActive from '../../components/modal/ModalUserNotActive';
import {useNavigation} from '@react-navigation/native';
import AlertConfirm from '../../components/modal/AlertConfirm';
import StorageNames from '../../Constants/StorageNames';
import {PropTypes} from 'prop-types';

const AddProfileScreen = () => {
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
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const onConfirm = () => {
    navi.navigate(ScreenNames.MAIN_NAVIGATOR);
    setIsUpdate(false);
  };
  const validateForm = () => {
    if (avatar.length === 0 || avatar[0] === undefined || !avatar[0]) {
      setTitle(
        'Bạn cần cung cấp đầy đủ thông tin hồ sơ cá nhân để đăng ký sử dụng dịch vụ. Vui lòng thêm ảnh 3x4',
      );
      setIsModalVisible(true);
      // AlertToaster(
      //   'error',
      //   'Bạn cần cung cấp đủ thông tin',
      //   'Vui lòng thêm ảnh 3x4',
      // );
      setIsLoading(false);
      return false;
    } else if (
      cmndFront.length === 0 ||
      cmndFront[0] === undefined ||
      !cmndFront[0]
    ) {
      setTitle(
        'Bạn cần cung cấp đầy đủ thông tin hồ sơ cá nhân để đăng ký sử dụng dịch vụ. Vui lòng thêm CMND/CCCD mặt trước',
      );
      setIsModalVisible(true);

      // AlertToaster(
      //   'error',
      //   'Bạn cần cung cấp đủ thông tin',
      //   'Vui lòng thêm CMND/CCCD mặt trước',
      // );
      setIsLoading(false);
      return false;
    } else if (
      cmndBack.length === 0 ||
      cmndBack[0] === undefined ||
      !cmndBack[0]
    ) {
      setTitle(
        'Bạn cần cung cấp đầy đủ thông tin hồ sơ cá nhân để đăng ký sử dụng dịch vụ.Vui lòng thêm CMND/CCCD mặt sau',
      );
      setIsModalVisible(true);
      // AlertToaster(
      //   'error',
      //   'Bạn cần cung cấp đủ thông tin',
      //   'Vui lòng thêm CMND/CCCD mặt sau',
      // );
      setIsLoading(false);
      return false;
    } else if (confirmAddress.length === 0 || confirmAddress[0] === undefined) {
      setTitle(
        'Bạn cần cung cấp đầy đủ thông tin hồ sơ cá nhân để đăng ký sử dụng dịch vụ.Vui lòng thêm Giấy xác nhận cư trú',
      );
      setIsModalVisible(true);

      // AlertToaster(
      //   'error',
      //   'Bạn cần cung cấp đủ thông tin',
      //   'Vui lòng thêm Giấy xác nhận cư trú',
      // );
      setIsLoading(false);
      return false;
    } else if (background.length === 0 || background[0] === undefined) {
      setTitle(
        'Bạn cần cung cấp đầy đủ thông tin hồ sơ cá nhân để đăng ký sử dụng dịch vụ.Vui lòng thêm sơ yếu lý lịch',
      );
      setIsModalVisible(true);
      // AlertToaster(
      //   'error',
      //   'Bạn cần cung cấp đủ thông tin',
      //   'Vui lòng thêm sơ yếu lý lịch',
      // );
      setIsLoading(false);
      return false;
    } else return true;
  };
  // const testApp = () => {
  //   navi.navigate(ScreenNames.MAIN_NAVIGATOR);
  // }
  const CRM2_spProfileOfficer_Save = async () => {
    setIsLoading(true);
    const valid = validateForm();
    if (valid) {
      // console.log('valid : ', valid);
      try {
        // console.log('satus : ', cmndBack);
        const pr = {
          GroupUserId: 10060,
          IdProfileOfficer: 0,
          OfficerID: userLogin?.OfficerID,
          OfficerName: userLogin?.OfficerName,
          FilesCCCD: cmndFront.join(''),
          FilesCCCD_BackSide: cmndBack.join(''),
          FilesCV: confirmAddress.join(''),
          FilesImage: avatar.join(''),
          FilesBC: background.join(''),
        };
        const params = {
          Json: JSON.stringify(pr),
          func: 'OVG_spProfileOfficer_Save',
        };

        // console.log('params : ', params);
        const result = await mainAction.API_spCallServer(params, dispatch);
        console.log('result : ', result);
        // Cập nhật xuống localStore để lưu trạng thái đã cập nhật hồ sơ
        if (result?.Status === 'OK') {
          await setData(StorageNames.USER_PROFILE, {
            ...userLogin,
            FilesCCCD: cmndFront.join(''),
            FilesCCCD_BackSide: cmndBack.join(''),
            FilesCV: confirmAddress.join(''),
            FilesImage: avatar.join(''),
            FilesBC: background.join(''),
          });
          mainAction.userLogin(
            {
              ...userLogin,
              FilesCCCD: cmndFront.join(''),
              FilesCCCD_BackSide: cmndBack.join(''),
              FilesCV: confirmAddress.join(''),
              FilesImage: avatar.join(''),
              FilesBC: background.join(''),
            },
            dispatch,
          );
          // setIsLoading(false);
          // if (userLogin?.State === 10 || !userLogin?.State) {
          setTitle('Hồ sơ của bạn đã được cập nhật thành công !');
          setIsUpdate(true);
          // } else {
          //   setIsLoading(false);
          navi.reset({
            routes: [{name: ScreenNames.MAIN_NAVIGATOR}],
          });
          // navi.navigate(ScreenNames.MAIN_NAVIGATOR);
          // }
          setIsLoading(false);
        }
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <LayoutGradientBlue>
      <ScrollView>
        {/* <ImageUploadComponent setImageUrl={setImageUrl} /> */}
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
        {/* <Button
          onPress={testApp}
          bgColor={colors.PRIMARY_GREEN}
          icon={() => <ArrowRight color={colors.WHITE} />}
        >
          Tiếp tục
        </Button> */}
      </LayoutBottom>
      <ModalUserNotActive
        title={title}
        isModalVisible={isUpdate}
        setModalVisible={setIsUpdate}
        onConfirm={onConfirm}
      />
      <AlertConfirm
        title={title}
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm={() => {
          setIsModalVisible(false);
        }}
      />
    </LayoutGradientBlue>
  );
};

AddProfileScreen.defaultProps = {
  route: {},
};
AddProfileScreen.propTypes = {
  route: PropTypes.object,
};

export default AddProfileScreen;
