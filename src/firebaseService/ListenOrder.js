import { firebase } from "@react-native-firebase/database";
import { deepEqualObject } from "../utils/Equals";

export const databaseOrder = firebase
  .app()
  .database(
    "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app"
  )
  .ref("/order");

export const acceptOrder = async (
  orderId,
  staffId,
  staffName,
  staffPhone,
  LatitudeStaff,
  LongitudeStaff
) => {
  if (!staffId || orderId === null) {
    console.error("Invalid value for staffId or orderId:", staffId, orderId);
    return false;
  }
  try {
    await databaseOrder.child(orderId).update({
      StaffId: staffId,
      StaffName: staffName,
      StaffPhone: staffPhone,
      LatitudeStaff: LatitudeStaff,
      LongitudeStaff: LongitudeStaff,
      StatusOrder: 1,
    });
    console.log("Order accepted successfully:", { orderId, staffId });
    return true;
  } catch (error) {
    console.error("Error accepting order: ", error);
    return false;
  }
};

export const OVG_FBRT_ListenMyOrders = (
  staffId,
  setMyOrders,
  setOrderChange,
  setModalOrderChangeVisible,
  setOrderRemove,
  setModalOrderRemoveVisible,
  setOrderAdd,
  setModalOrderAddVisible
) => {
  if (!staffId) {
    console.error("Invalid value for staffId:", staffId);
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
        // setModalOrderChangeVisible(true);
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
      // if (updatedOrders.length === 0) {
      //   // Tự động nhận đơn hàng mới khi không có đơn hàng nào
      //   acceptNewOrderForStaff(staffId);
      // }
      return updatedOrders;
    });
  };

  // const acceptNewOrderForStaff = async (staffId) => {
  //   // Giả sử có một hàm tìm đơn hàng mới chưa được nhận
  //   const newOrder = await findNewOrder();
  //   if (newOrder) {
  //     const { OrderId, StaffName, StaffPhone, LatitudeStaff, LongitudeStaff } =
  //       newOrder;
  //     const success = await acceptOrder(
  //       OrderId,
  //       staffId,
  //       StaffName,
  //       StaffPhone,
  //       LatitudeStaff,
  //       LongitudeStaff
  //     );
  //     if (success) {
  //       console.log("New order accepted for staff:", staffId);
  //     } else {
  //       console.error("Failed to accept new order for staff:", staffId);
  //     }
  //   } else {
  //     console.log("No new order available to accept.");
  //   }
  // };

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
