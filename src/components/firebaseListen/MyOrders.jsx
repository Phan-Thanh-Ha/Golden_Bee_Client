import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {OVG_FBRT_ListenMyOrders} from '../../firebaseService/ListenOrder';
import {useDispatch, useSelector} from 'react-redux';
import ListenOrderChange from './ListenOrderChange';
import ListenOrderRemove from './ListenOrderRemove'; // Sửa import này
import ListenOrderAdd from './ListenOrderAdd'; // Sửa import này
import {mainAction} from '../../Redux/Action';
import {setData} from '../../utils';
import StorageNames from '../../Constants/StorageNames';
import ListenOrderTotal from './ListenTotalOrder';

const MyOrders = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.main.userLogin);
  const myOrdersAccepted = useSelector(state => state.main.myOrdersAccepted);
  const [myOrders, setMyOrders] = useState(myOrdersAccepted);

  /* change */
  const [orderChange, setOrderChange] = useState({});
  const [modalOrderChangeVisible, setModalOrderChangeVisible] = useState(false);

  const handleConfirmOrderChange = () => {
    console.log('handleConfirmOrderChange');
  };

  /* remove */
  const [orderRemove, setOrderRemove] = useState({});
  const [modalOrderRemoveVisible, setModalOrderRemoveVisible] = useState(false);

  const handleConfirmOrderRemove = () => {
    console.log('handleConfirmOrderRemove');
  };

  /* Add */
  const [orderAdd, setOrderAdd] = useState({});
  const [modalOrderAddVisible, setModalOrderAddVisible] = useState(false);

  const handleConfirmOrderAdd = () => {
    console.log('handleConfirmOrderAdd');
  };

  /* Total */
  const [modalOrderTotalVisible, setModalOrderTotalVisible] = useState(false);

  const handleConfirmOrderTotal = () => {
    console.log('handleConfirmOrderTotal');
  };

  useEffect(() => {
    const unsubscribe = OVG_FBRT_ListenMyOrders(
      userLogin?.OfficerID,
      setMyOrders,
      setOrderChange,
      setModalOrderChangeVisible,
      setOrderRemove,
      setModalOrderRemoveVisible,
      setOrderAdd,
      setModalOrderAddVisible,
    );

    return () => {
      unsubscribe();
    };
  }, [userLogin?.OfficerID]);

  useEffect(() => {
    if (myOrders?.length > 0) {
      mainAction.setMyOrdersAccepted(myOrders, dispatch);
      setData(StorageNames.MY_ORDER_ACCEPTED, myOrders);
    }
    if (myOrders?.length === 0) {
      mainAction.setMyOrdersAccepted([], dispatch);
      setData(StorageNames.MY_ORDER_ACCEPTED, []);
    }
    if (myOrders?.length > 2) {
      setModalOrderTotalVisible(true);
    } else {
      setModalOrderTotalVisible(false);
    }
    if (myOrders?.length === 1) {
      mainAction.acceptedOrder(myOrders[0], dispatch);
      setData(StorageNames.ORDER_SERVICE, myOrders[0]);
    }
    if (myOrders?.length === 0) {
      mainAction.acceptedOrder({}, dispatch);
      setData(StorageNames.ORDER_SERVICE, {});
    }
  }, [myOrders]);
  console.log('-----------------------------------------------------');
  console.log('myOrders', myOrders);
  console.log('-----------------------------------------------------');

  return (
    <View>
      <ListenOrderChange
        orderChange={orderChange}
        isModalVisible={modalOrderChangeVisible}
        setModalVisible={setModalOrderChangeVisible}
        onConfirm={handleConfirmOrderChange}
      />
      <ListenOrderRemove
        orderRemove={orderRemove} // Sửa prop tên thành orderRemove
        isModalVisible={modalOrderRemoveVisible}
        setModalVisible={setModalOrderRemoveVisible}
        onConfirm={handleConfirmOrderRemove}
      />
      <ListenOrderAdd
        orderAdd={orderAdd} // Sửa prop tên thành orderAdd
        isModalVisible={modalOrderAddVisible}
        setModalVisible={setModalOrderAddVisible}
        onConfirm={handleConfirmOrderAdd}
      />
      <ListenOrderTotal
        myOrders={myOrders}
        isModalVisible={modalOrderTotalVisible}
        setModalVisible={setModalOrderTotalVisible}
        onConfirm={handleConfirmOrderTotal}
      />
    </View>
  );
};

export default MyOrders;
