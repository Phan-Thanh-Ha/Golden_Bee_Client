import React, { useCallback, useEffect, useRef, useState } from 'react';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors } from '../../styles/Colors';
import { TabCustom } from '../../components/TabCustom';
import JobDetailsModal from '../../components/JobDetailsModal';
import { responsivescreen } from '../../utils/responsive-screen';
import {
  acceptOrder,
  listenForNewOrders,
  updateLocation,
} from '../../firebaseService/HandleOrder';
import { useDispatch, useSelector } from 'react-redux';
import { filterAndSortOrders } from '../../utils/FilterOrder';
import { mainAction } from '../../Redux/Action';
import JobDoneModal from '../../components/JobDoneModal';
import MyOrders from '../../components/firebaseListen/MyOrders';
import Geolocation from '@react-native-community/geolocation';
import { setData } from '../../utils';
import StorageNames from '../../Constants/StorageNames';
import ListenOrderTotal from '../../components/firebaseListen/ListenTotalOrder';
import { Linking } from 'react-native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.main.userLogin);
  const acceptedOrder = useSelector(state => state.main.acceptedOrder);
  const location = useSelector(state => state.main.locationTime);
  const modalRef = useRef(null);
  const modalJobDoneRef = useRef(null);
  const [newOrders, setNewOrders] = useState([]);
  const myOrdersAccepted = useSelector(state => state.main.myOrdersAccepted);
  const initValueFirebase = useSelector(state => state.main.initValueFirebase);
  const locationIntervalRef = useRef(null);
  const [modalOrderTotalVisible, setModalOrderTotalVisible] = useState(false);
  const [log, setLog] = useState([]);

  // nếu chưa có đơn nào thì lấy danh sách đơn hàng chưa có ai nhận
  // useEffect(() => {
  //   if (userLogin) {
  //     if (
  //       userLogin?.StateOnline &&
  //       userLogin?.Surplus > 200000 &&
  //       userLogin?.OfficerStatus === 0 &&
  //       myOrdersAccepted?.length === 0
  //     ) {
  //       listenForNewOrders(newOrders, setNewOrders);
  //     }
  //   }
  // }, [
  //   userLogin?.StateOnline,
  //   userLogin?.Surplus,
  //   userLogin?.OfficerStatus,
  //   initValueFirebase,
  //   myOrdersAccepted?.length,
  // ]);

  // // fillter và nhận 1 đơn hàng gần nht'
  // useEffect(() => {
  //   if (initValueFirebase) {
  //     if (
  //       userLogin?.StateOnline &&
  //       myOrdersAccepted?.length === 0 &&
  //       userLogin?.Surplus > 200000 &&
  //       userLogin?.OfficerStatus === 0
  //     ) {
  //       if (newOrders.length > 0) {
  //         const ordersSnapshot = newOrders;
  //         const orders = filterAndSortOrders(
  //           ordersSnapshot,
  //           location?.latitude,
  //           location?.longitude,
  //         );
  //         if (orders.length > 0) {
  //           const fistOrder = orders[0];
  //           OVG_spOfficer_Booking_Save(fistOrder);
  //         }
  //       }
  //     }
  //   }
  // }, [
  //   newOrders,
  //   userLogin?.OfficerStatus,
  //   myOrdersAccepted?.length,
  //   userLogin?.Surplus,
  //   userLogin?.StateOnline,
  //   initValueFirebase,
  //   location
  // ]);

  useEffect(() => {
    if (initValueFirebase) {
      if (myOrdersAccepted?.length > 1) {
        setModalOrderTotalVisible(true);
      } else {
        setModalOrderTotalVisible(false);
      }
    }
  }, [myOrdersAccepted]);

  const handleConfirmOrderTotal = () => {
    Linking.openURL(`tel:${'0922277782'}`);
    setModalOrderTotalVisible(false);
  };

  // const OVG_spOfficer_Booking_Save = useCallback(async fistOrder => {
  //   try {
  //     const pr = {
  //       OfficerId: userLogin?.OfficerID,
  //       BookingId: parseInt(fistOrder?.OrderId),
  //       LatOfficer: location?.latitude,
  //       LngOfficer: location?.longitude,
  //       OfficerName: userLogin?.OfficerName,
  //       IsConfirm: 1,
  //       GroupUserId: 10060,
  //     };
  //     const params = {
  //       Json: JSON.stringify(pr),
  //       func: 'OVG_spOfficer_Booking_Save',
  //     };

  //     const result = await mainAction.API_spCallServer(params, dispatch);
  //     if (result?.Status === 'OK') {
  //       const accepting = acceptOrder(
  //         fistOrder.OrderId,
  //         userLogin?.OfficerID,
  //         userLogin?.OfficerName,
  //         userLogin?.Phone,
  //         location?.latitude,
  //         location?.longitude,
  //         userLogin?.Avatar,
  //       );
  //       if (accepting) {
  //         const userChange = {
  //           ...userLogin,
  //           OfficerStatus: 1,
  //         };
  //         setData(StorageNames.USER_PROFILE, userChange);
  //         mainAction.userLogin(userChange, dispatch);
  //         return;
  //       }
  //       return;
  //     }
  //     return;
  //   } catch (error) { }
  // }, []);

  // Hàm lắng nghe thay đổi việc Cập nhật vị tri njaan viên di chuyển
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
                updateLocation(acceptedOrder?.OrderId, position.coords.latitude, position.coords.longitude);
                mainAction.locationUpdate(params, dispatch);
              }
            },
            error => {
              console.log('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
        };

        if (acceptedOrder?.StatusOrder === 2) {
          updateCurrentLocation();
          locationIntervalRef.current = setInterval(updateCurrentLocation, 10000);
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
    </LayoutGradientBlue>
  );
};

export default HomeScreen;
