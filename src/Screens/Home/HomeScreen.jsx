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

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.main.userLogin);
  const acceptedOrder = useSelector(state => state.main.acceptedOrder);
  const location = useSelector(state => state.main.locationTime);
  const modalRef = useRef(null);
  const modalJobDoneRef = useRef(null);
  const [newOrders, setNewOrders] = useState([]);
  const myOrdersAccepted = useSelector(state => state.main.myOrdersAccepted);
  const locationIntervalRef = useRef(null);
  // console.log('-----------------------------------------')
  // console.log('user login : ', userLogin);
  // console.log('-----------------------------------------')

  const OVG_spOfficer_Booking_Save = useCallback(async fistOrder => {
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        BookingId: parseInt(fistOrder?.OrderId),
        LatOfficer: location?.latitude,
        LngOfficer: location?.longitude,
        OfficerName: userLogin?.OfficerName,
        IsConfirm: 1,
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: 'OVG_spOfficer_Booking_Save',
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.Status === 'OK') {
        const accepting = acceptOrder(fistOrder.OrderId, userLogin?.OfficerID, userLogin?.OfficerName, userLogin?.Phone, location?.latitude, location?.longitude);
        if (accepting) {
          setData(StorageNames.USER_PROFILE, {
            ...userLogin,
            OfficerStatus: 1
          })
          mainAction.userLogin({
            ...userLogin,
            OfficerStatus: 1
          }, dispatch);
          return;
        }
        // mainAction.acceptedOrder({
        //   ...fistOrder,
        //   StatusOrder: 1
        // }, dispatch);
        // setData(StorageNames.ORDER_SERVICE, {
        //   ...fistOrder,
        //   StatusOrder: 1
        // });
        return;
      }
      return;
    } catch (error) { }
  }, []);

  useEffect(() => {
    if (userLogin?.OfficerID) {
      if (
        userLogin?.StateOnline &&
        // userLogin?.Surplus > 200000 &&
        !acceptedOrder?.OrderId
      ) {
        listenForNewOrders(newOrders, setNewOrders);
      }
    }
  }, [
    userLogin?.StateOnline,
    acceptedOrder?.OrderId,
    acceptOrder?.StatusOrder,
    userLogin?.Surplus,
  ]);
  useEffect(() => {
    if (
      userLogin?.StateOnline &&
      !acceptedOrder?.OrderId &&
      userLogin?.OfficerStatus === 0
    ) {
      if (
        myOrdersAccepted === null ||
        (myOrdersAccepted?.length === 0 && userLogin?.StateOnline)
      ) {
        const orders = filterAndSortOrders(
          newOrders,
          location?.latitude,
          location?.longitude,
        );
        if (orders.length > 0) {
          const fistOrder = orders[0];
          OVG_spOfficer_Booking_Save(fistOrder);
        }
      }
    }
  }, [newOrders]);

  useEffect(() => {
    const updateCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          if (acceptedOrder?.StatusOrder === 1) {
            updateLocation(acceptedOrder?.OrderId, latitude, longitude);
          }
        },
        error => {
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    if (acceptedOrder?.StatusOrder === 1) {
      updateCurrentLocation(); // Cập nhật ngay lập tức
      locationIntervalRef.current = setInterval(updateCurrentLocation, 20000); // Cập nhật mỗi 20 giây
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
  }, [acceptedOrder?.StatusOrder]);

  return (
    <LayoutGradientBlue>
      {
        userLogin?.OfficerID ? (
          <MyOrders />
        ) : null
      }
      <LogoBeeBox color={colors.WHITE} sizeImage={70} sizeText={20} />
      <TabCustom
        modalRef={modalRef}
        modalJobDoneRef={modalJobDoneRef}
        height={responsivescreen.height('77%')}
      />
      <JobDetailsModal ref={modalRef} />
      <JobDoneModal ref={modalJobDoneRef} />
    </LayoutGradientBlue>
  );
};

export default HomeScreen;
