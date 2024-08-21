import { firebase } from "@react-native-firebase/database";
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
    return;
  }

  let initialLoadComplete = false;

  const handleOrderChange = (snapshot) => {
    const order = snapshot.val();
    const orderId = snapshot.key;
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
    const myOrdersRef = databaseOrder.orderByChild("StaffId").equalTo(staffId);
    console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  myOrdersRef:", myOrdersRef);

    myOrdersRef.once("value", (snapshot) => {
      const orders = snapshot.val();
      console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  orders:", orders);
      if (orders) {
        const initialOrders = Object.keys(orders).map((orderId) => ({
          ...orders[orderId],
          OrderId: orderId,
        }));
        setMyOrders(initialOrders);
      } else {
        setMyOrders([]);
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

export const OVG_DeleteOrdersByBookingCode = async (bookingCode) => {
  if (typeof bookingCode !== "string" || !bookingCode.trim()) {
    console.error("Invalid BookingCode. It should be a non-empty string.");
    return false;
  }

  try {
    const snapshot = await databaseOrder.once("value");
    const orders = snapshot.val();
    const updates = {};

    if (orders) {
      for (const orderId in orders) {
        if (orders[orderId].BookingCode === bookingCode) {
          updates[orderId] = null;
        }
      }

      if (Object.keys(updates).length > 0) {
        await databaseOrder.update(updates);
        console.log(
          `Orders with BookingCode ${bookingCode} deleted successfully.`
        );
        return true;
      } else {
        console.log("No orders found with the given BookingCode.");
        return false;
      }
    } else {
      console.log("No orders found in the database.");
      return false;
    }
  } catch (error) {
    console.error("Error deleting orders:", error);
    return false;
  }
};

export const OVG_DeleteOrdersByBookingCodeAndStaffId = async (
  bookingCode,
  staffId
) => {
  if (typeof bookingCode !== "string" || !bookingCode.trim()) {
    console.error("Invalid BookingCode. It should be a non-empty string.");
    return false;
  }

  if (typeof staffId !== "number") {
    console.error("Invalid StaffId. It should be a number.");
    return false;
  }

  const database = getDatabase();
  const ordersRef = ref(database, "/order");

  try {
    const snapshot = await get(ordersRef);
    const orders = snapshot.val();
    const updates = {};

    if (orders) {
      for (const orderId in orders) {
        const order = orders[orderId];
        if (order.BookingCode === bookingCode && order.StaffId === staffId) {
          updates[orderId] = null;
        }
      }

      if (Object.keys(updates).length > 0) {
        await update(ordersRef, updates);
        console.log(
          `Orders with BookingCode ${bookingCode} and StaffId ${staffId} deleted successfully.`
        );
        return true;
      } else {
        console.log("No orders found with the given BookingCode and StaffId.");
        return false;
      }
    } else {
      console.log("No orders found in the database.");
      return false;
    }
  } catch (error) {
    console.error("Error deleting orders:", error);
    return false;
  }
};
