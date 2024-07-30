import React, {useEffect, useRef, useState} from 'react';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import {colors} from '../../styles/Colors';
import {TabCustom} from '../../components/TabCustom';
import JobDetailsModal from '../../components/JobDetailsModal';
import {responsivescreen} from '../../utils/responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {mainAction} from '../../Redux/Action';
import JobDoneModal from '../../components/JobDoneModal';
import MyOrders from '../../components/firebaseListen/MyOrders';
import Geolocation from '@react-native-community/geolocation';
import ListenOrderTotal from '../../components/firebaseListen/ListenTotalOrder';
import {Linking} from 'react-native';
import ModalUserNotActive from '../../components/modal/ModalUserNotActive';
import {GROUP_USER_ID} from '../../utils';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.main.userLogin);
  const acceptedOrder = useSelector(state => state.main.acceptedOrder);
  const modalRef = useRef(null);
  const modalJobDoneRef = useRef(null);
  const myOrdersAccepted = useSelector(state => state.main.myOrdersAccepted);
  const initValueFirebase = useSelector(state => state.main.initValueFirebase);
  const locationIntervalRef = useRef(null);
  const [modalOrderTotalVisible, setModalOrderTotalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const onConfirm = () => {
    Linking.openURL(`tel:${'0922277782'}`);
    setIsUpdate(false);
  };

  useEffect(() => {
    if (initValueFirebase) {
      if (myOrdersAccepted?.length > 1) {
        setModalOrderTotalVisible(true);
      } else {
        setModalOrderTotalVisible(false);
      }
    }
    if (userLogin?.State === 5 || userLogin?.State === 10) {
      setIsUpdate(true);
    }
  }, [myOrdersAccepted]);

  useEffect(() => {
    if (userLogin) {
      updateLocation();
    }
  }, []);
  const handleConfirmOrderTotal = () => {
    Linking.openURL(`tel:${'0922277782'}`);
    setModalOrderTotalVisible(false);
  };

  const updateLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          if (position?.coords) {
            OVG_spOfficer_Update_LocationTime(position, userLogin?.OfficerID);
          }
        },
        error => {},
        {enableHighAccuracy: false, timeout: 20000},
      );
    } catch (e) {}
  };

  const OVG_spOfficer_Update_LocationTime = async (position, officerId) => {
    try {
      const pr = {
        UserId: officerId,
        Lat: position?.coords?.latitude,
        Lng: position?.coords?.longitude,
        GroupUserId: GROUP_USER_ID,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spOfficer_Update_LocationTime',
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      // console.log('OVG_spOfficer_Update_LocationTime', result);
      if (result[0]?.Result == 'OK') {
        const par = {
          latitude: pr.Lat,
          longitude: pr.Lng,
        };
        mainAction.locationUpdate(par, dispatch);
      }
    } catch (e) {}
  };

  // Hàm lắng nghe thay đổi việc Cập nhật vị tri nhân viên di chuyển
  useEffect(() => {
    if (acceptedOrder?.StatusOrder === 2) {
      try {
        const updateCurrentLocation = () => {
          Geolocation.getCurrentPosition(
            position => {
              if (position.coords) {
                const params = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                };
                // console.log('updateCurrentLocation', params);
                updateLocation(
                  acceptedOrder?.OrderId,
                  position.coords.latitude,
                  position.coords.longitude,
                );
                mainAction.locationUpdate(params, dispatch);
              }
            },
            error => {
              console.log('Error getting location:', error);
            },
            {enableHighAccuracy: false, timeout: 20000},
          );
        };

        if (acceptedOrder?.StatusOrder === 2) {
          updateCurrentLocation();
          locationIntervalRef.current = setInterval(
            updateCurrentLocation,
            10000,
          );
        } else {
          if (locationIntervalRef.current) {
            clearInterval(locationIntervalRef.current);
            locationIntervalRef.current = null;
          }
        }

        return () => {
          if (locationIntervalRef.current) {
            clearInterval(locationIntervalRef.current);
          }
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [acceptedOrder?.StatusOrder]);

  return (
    <LayoutGradientBlue>
      {userLogin ? <MyOrders /> : null}
      <LogoBeeBox color={colors.WHITE} sizeImage={70} sizeText={20} />
      <TabCustom
        modalRef={modalRef}
        modalJobDoneRef={modalJobDoneRef}
        height={responsivescreen.height('77%')}
      />
      <JobDetailsModal ref={modalRef} />
      <JobDoneModal ref={modalJobDoneRef} />
      <ListenOrderTotal
        myOrders={myOrdersAccepted}
        isModalVisible={modalOrderTotalVisible}
        setModalVisible={setModalOrderTotalVisible}
        onConfirm={handleConfirmOrderTotal}
      />
      <ModalUserNotActive
        title={
          userLogin?.State === 5
            ? 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên Ong Vàng để được hỗ trợ xử lý !'
            : 'Tài khoản của bạn chưa được kích hoạt, vui lòng liên hệ quản trị viên Ong Vàng để được hỗ trợ kích hoạt !'
        }
        isModalVisible={isUpdate}
        setModalVisible={setIsUpdate}
        onConfirm={onConfirm}
      />
    </LayoutGradientBlue>
  );
};

export default HomeScreen;
