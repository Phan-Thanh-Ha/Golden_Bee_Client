import { firebase } from "@react-native-firebase/database";
import { deepEqualObject } from "../utils/Equals";
import { setInitValueFirebase } from "../Redux/Action/mainAction";

export const databaseOrder = firebase
  .app()
  .database(
    "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app"
  )
  .ref("/order");

export const OVG_FBRT_ListenMyOrders = (
  staffId,
  setMyOrders,
  setOrderChange,
  setModalOrderChangeVisible,
  setOrderRemove,
  setModalOrderRemoveVisible,
  setOrderAdd,
  setModalOrderAddVisible,
  dispatch
) => {
  if (!staffId) {
    console.log("Invalid value for staffId:", staffId);
    return;
  }

  let initialLoadComplete = false;

  const handleOrderChange = (snapshot) => {
    const order = snapshot.val();
    const orderId = snapshot.key;
    console.log("Order changed:", { ...order, orderId });

    setOrderChange({ ...order, orderId });

    setMyOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (o) => o.OrderId === orderId
      );

      if (existingOrderIndex > -1) {
        const updatedOrders = [...prevOrders];
        updatedOrders[existingOrderIndex] = { ...order, OrderId: orderId };
        return updatedOrders;
      } else {
        return prevOrders;
      }
    });
  };

  const handleOrderAdd = (snapshot) => {
    if (!initialLoadComplete) return;

    const order = snapshot.val();
    const orderId = snapshot.key;

    setMyOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (o) => o.OrderId === orderId
      );
      if (existingOrderIndex > -1) {
        return prevOrders;
      } else {
        const updatedOrders = [...prevOrders, { ...order, OrderId: orderId }];
        const orderAdded = { ...order, orderId };
        console.log("Order added:", orderAdded);

        if (
          orderAdded?.StatusOrder === 0 ||
          orderAdded?.StatusOrder === 1 ||
          !orderAdded?.StatusOrder
        ) {
          setModalOrderAddVisible(true);
        }
        setOrderAdd(orderAdded);
        return updatedOrders;
      }
    });
  };

  const handleOrderRemove = (snapshot) => {
    const order = snapshot.val();
    const orderId = snapshot.key;
    const orderRemoved = { ...order, orderId };
    console.log("Order removed:", orderRemoved);

    setMyOrders((prevOrders) => {
      const updatedOrders = prevOrders.filter((o) => o.OrderId !== orderId);

      if (order?.StatusOrder === 1) {
        setModalOrderRemoveVisible(true);
      }

      setOrderRemove(orderRemoved);
      return updatedOrders;
    });
  };

  try {
    console.log("Initializing and listening for orders for staff:", staffId);

    const myOrdersRef = databaseOrder.orderByChild("StaffId").equalTo(staffId);

    myOrdersRef.once("value", (snapshot) => {
      const orders = snapshot.val();
      if (orders) {
        const initialOrders = Object.keys(orders).map((orderId) => ({
          ...orders[orderId],
          OrderId: orderId,
        }));
        setMyOrders(initialOrders);
        console.log("Initial orders loaded:", initialOrders);
      } else {
        setMyOrders([]);
        console.log("No initial orders found.");
      }

      // Đặt initValueFirebase thành true sau khi tải dữ liệu
      dispatch(setInitValueFirebase(true, dispatch));

      initialLoadComplete = true;

      myOrdersRef.on("child_changed", handleOrderChange);
      myOrdersRef.on("child_added", handleOrderAdd);
      myOrdersRef.on("child_removed", handleOrderRemove);
    });

    return () => {
      myOrdersRef.off("child_changed", handleOrderChange);
      myOrdersRef.off("child_added", handleOrderAdd);
      myOrdersRef.off("child_removed", handleOrderRemove);
    };
  } catch (error) {
    console.error("Error listening for orders: ", error);
  }
};
