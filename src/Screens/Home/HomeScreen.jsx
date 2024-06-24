import React, { useCallback, useEffect, useRef, useState } from 'react';
import LayoutGradientBlue from '../../components/layouts/LayoutGradientBlue';
import LogoBeeBox from '../../components/LogoBeeBox';
import { colors } from '../../styles/Colors';
import { TabCustom } from '../../components/TabCustom';
import JobDetailsModal from '../../components/JobDetailsModal';
import { responsivescreen } from '../../utils/responsive-screen';
import { acceptOrder, listenForAcceptedOrders, listenForNewOrders, updateLocation } from '../../firebaseService/HandleOrder';
import { useDispatch, useSelector } from 'react-redux';
import { filterAndSortOrders } from '../../utils/FilterOrder';
import { mainAction } from '../../Redux/Action';
import { AlertToaster, setData } from '../../utils';
import JobDoneModal from '../../components/JobDoneModal';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.main.userLogin);
  const acceptedOrder = useSelector((state) => state.main.acceptedOrder);
  const location = useSelector((state) => state.main.locationTime);
  const modalRef = useRef(null);
  const modalJobDoneRef = useRef(null);
  const [newOrders, setNewOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const OVG_spOfficer_Booking_Save = useCallback(async (fistOrder) => {
    try {
      const pr = {
        OfficerId: userLogin?.OfficerID,
        BookingId: parseInt(fistOrder?.OrderId),
        LatOfficer: location?.latitude,
        LngOfficer: location?.longitude,
        OfficerName: userLogin?.OfficerName,
        IsConfirm: 1,
        GroupUserId: 10060
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spOfficer_Booking_Save",
      };

      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.Status === "OK") {
        mainAction.acceptedOrder({
          ...fistOrder,
          StatusOrder: 1
        }, dispatch);
        setData(StorageNames.ORDER_SERVICE, {
          ...fistOrder,
          StatusOrder: 1
        });
        AlertToaster('success', 'Đơn dịch vụ của bạn', 'Mã đơn : ' + fistOrder?.OrderId)
        return;
      }
      return;
    } catch (error) {
    }
  }, []);

  /// tôi muốn cập nhật vị trí hiện tại của tôi tới firebase liên tục khi acceptedOrder?.SattusOrder = 1
  // phuơg hức gọi firebase để cập nhật : updateLocation = (orderId, LatitudeStaff,LongitudeStaff) cụ thể là updateLocation(acceptedOrder?.OrderId, newLocation.latitude, newLocation.longitude);

  useEffect(() => {
    if (
      userLogin?.OfficerID
    ) {
      if (
        userLogin?.StateOnline &&
        userLogin?.Surplus > 200000 &&
        !acceptedOrder?.OrderId
      ) {
        listenForNewOrders(newOrders, setNewOrders);
      }
      listenForAcceptedOrders(userLogin?.OfficerID, acceptedOrders, setAcceptedOrders);
    }
  }, [userLogin?.StateOnline, acceptedOrder?.OrderId, acceptOrder?.StatusOrder, userLogin?.Surplus]);
  useEffect(() => {
    if (
      userLogin?.StateOnline &&
      !acceptedOrder?.OrderId
    ) {
      if (
        acceptedOrders?.length === 1 &&
        userLogin?.StateOnline &&
        !acceptedOrder?.OrderId
      ) {
        const fistOrder = acceptedOrders[0];
        mainAction.acceptedOrder(fistOrder, dispatch);
        setData(StorageNames.ORDER_SERVICE, fistOrder);
        AlertToaster('success', 'Đơn dịch vụ của bạn', 'Mã đơn : ' + fistOrder?.OrderId)
      } else
        if (
          acceptedOrders === null ||
          acceptedOrders?.length === 0 &&
          userLogin?.StateOnline
        ) {
          const orders = filterAndSortOrders(newOrders, location?.latitude, location?.longitude);
          // console.log("=====================================");
          // console.log("list new order sort and fillter", orders);
          // console.log("=====================================");
          if (orders.length > 0) {
            const fistOrder = orders[0];
            const accepting = acceptOrder(fistOrder.OrderId, userLogin?.OfficerID, userLogin?.OfficerName, userLogin?.Phone, location?.latitude, location?.longitude);
            if (accepting) {
              OVG_spOfficer_Booking_Save(fistOrder);
              return;
            }
          }
        }
        else
          if (acceptedOrders?.length > 1) {
            // nhân viên đang nhận nhiều hơn 2 đơn ?
            AlertToaster('warning', 'Liên hệ CSKH', 'Bạn đang được nhận quá số đơn')
          }
    }
  }, [newOrders]);
  return (
    <LayoutGradientBlue>
      <LogoBeeBox color={colors.WHITE} sizeImage={70} sizeText={20} />
      <TabCustom modalRef={modalRef} modalJobDoneRef={modalJobDoneRef} height={responsivescreen.height("77%")} />
      <JobDetailsModal ref={modalRef} />
      <JobDoneModal ref={modalJobDoneRef} />
    </LayoutGradientBlue>
  );
};

export default HomeScreen;