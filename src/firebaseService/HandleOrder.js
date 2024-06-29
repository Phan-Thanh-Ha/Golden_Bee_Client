import { firebase } from "@react-native-firebase/database";

export const databaseOrder = firebase
  .app()
  .database(
    "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app"
  )
  .ref("/order");

export const listenForAcceptedOrders = (
  staffId,
  acceptedOrder,
  setAcceptedOrders
) => {
  if (
    staffId !== null &&
    staffId !== undefined &&
    typeof staffId !== "string" &&
    typeof staffId !== "number" &&
    typeof staffId !== "boolean"
  ) {
    console.error("Invalid value for customerId:", staffId);
    return;
  }
  try {
    console.log("Listening for accepted orders for staff:", staffId);
    databaseOrder
      .orderByChild("StaffId")
      .equalTo(staffId)
      .on("value", (snapshot) => {
        const orders = snapshot.val();
        // console.log("Accepted orders snapshot received:", orders);
        if (orders && orders !== acceptedOrder) {
          const acceptedOrders = [];
          Object.keys(orders).forEach((orderId) => {
            const order = orders[orderId];
            acceptedOrders.push(order);
          });
          setAcceptedOrders(acceptedOrders); // Cập nhật danh sách đơn hàng đã nhận
        } else {
          setAcceptedOrders([]); // Nếu không có đơn hàng nào đã nhận
        }
      });
  } catch (error) {
    console.error("Error listening for accepted orders: ", error);
  }
};

// Lắng nghe đơn hàng mới cho nhân viên
export const listenForNewOrders = (newOrders, setNewOrders) => {
  console.log("Listening for new orders with StaffId equal to ''");
  try {
    databaseOrder
      .orderByChild("StaffId")
      .equalTo("")
      .on("value", (snapshot) => {
        const orders = snapshot.val();
        console.log("New orders snapshot received:", orders);
        if (orders && orders !== newOrders) {
          const newOrders = [];
          Object.keys(orders).forEach((orderId) => {
            const order = orders[orderId];
            newOrders.push(order);
          });
          setNewOrders(newOrders); // Cập nhật danh sách đơn hàng mới
        } else {
          setNewOrders([]); // Nếu không có đơn hàng nào mới
        }
      });
  } catch (error) {
    console.error("Error listening for new orders: ", error);
  }
};
// Nhận đơn hàng
export const acceptOrder = async (
  orderId,
  staffId,
  staffName,
  staffPhone,
  LatitudeStaff,
  LongitudeStaff,
  staffAvatar = ""
) => {
  if (
    typeof staffId !== "string" &&
    typeof staffId !== "number" &&
    typeof staffId !== "boolean" &&
    orderId !== null
  ) {
    console.error("Invalid value for customerId:", staffId);
    return;
  }
  try {
    await databaseOrder.child(orderId).update({
      StaffId: staffId,
      StaffName: staffName,
      StaffPhone: staffPhone,
      LatitudeStaff: LatitudeStaff,
      LongitudeStaff: LongitudeStaff,
      StaffAvatar: staffAvatar,
      StatusOrder: 1,
    });
    console.log("Order accepted successfully:", { orderId, staffId });
    return true;
  } catch (error) {
    console.error("Error accepting order: ", error);
    return false;
  }
};

//CẬp nhật lat lng
export const updateLocation = async (
  orderId,
  LatitudeStaff,
  LongitudeStaff
) => {
  const location = {
    LatitudeStaff: LatitudeStaff,
    LongitudeStaff: LongitudeStaff,
  };

  if (
    typeof orderId !== "string" &&
    typeof orderId !== "number" &&
    typeof orderId !== "boolean" &&
    orderId !== null
  ) {
    console.error("Invalid value for customerId:", orderId);
    return;
  }
  try {
    await databaseOrder.child(orderId).update(location);
    console.log("location updated successfully:", location);
    return location;
  } catch (error) {
    console.error("Error placing location: ", error);
    return false;
  }
};

// cập nhật Status
export const updateStatusOrder = async (orderId, statusOrder) => {
  const status = {
    StatusOrder: statusOrder,
  };
  if (
    typeof orderId !== "string" &&
    typeof orderId !== "number" &&
    typeof orderId !== "boolean" &&
    orderId !== null
  ) {
    console.error("Invalid value for customerId:", orderId);
    return;
  }
  try {
    await databaseOrder.child(orderId).update(status);
    console.log("location updated successfully:", status);
    return status;
  } catch (error) {
    console.error("Error placing status: ", error);
    return false;
  }
};

// Hoàn thành đơn hàng
export const completeOrder = async (orderId) => {
  try {
    await databaseOrder.child(orderId).remove();
    console.log("Order completed and removed successfully:", orderId);
    return true;
  } catch (error) {
    console.error("Error completing order: ", error);
    return false;
  }
};

// Kiểm tra và xóa đơn hàng chưa nhận sau 10 phút
export const checkAndDeleteExpiredOrders = () => {
  console.log("Checking and deleting expired orders");
  databaseOrder.on("value", (snapshot) => {
    const orders = snapshot.val();
    console.log("Orders snapshot received for deletion check:", orders);
    if (orders) {
      Object.keys(orders).forEach((orderId) => {
        const order = orders[orderId];
        if (order.StaffId === "") {
          deleteOrderIfNotAccepted(orderId, order.createAt);
        }
      });
    }
  });
};

// Hàm lắng nghe thay đổi và nhận đơn hàng cho nhân viên
export const listenNewOrders = (setNewOrders) => {
  console.log("Listening for new orders with StaffId equal to ''");
  try {
    databaseOrder
      .orderByChild("StaffId")
      .equalTo("")
      .on("value", (snapshot) => {
        const orders = snapshot.val();
        console.log("New orders snapshot received:", orders);
        if (orders) {
          const newOrdersArray = Object.keys(orders).map(
            (orderId) => orders[orderId]
          );
          setNewOrders(newOrdersArray);
        } else {
          setNewOrders([]); // Nếu không có đơn hàng nào mới
        }
      });
  } catch (error) {
    console.error("Error listening for new orders: ", error);
  }
};
// Hàm lắng nghe thay đổi và nhận đơn hàng cho nhân viên

// Hàm để so sánh hai mảng
export const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) return false;
  }
  return true;
};

export const useListenOrdersByStaffIdWithFlag = (isStaff) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (typeof isStaff !== "boolean") {
      console.error("Invalid value for isStaff:", isStaff);
      return;
    }

    console.log("Listening for orders with isStaff:", isStaff);

    const ordersRef = databaseOrder.orderByChild("isStaff").equalTo(isStaff);

    // Lấy dữ liệu ban đầu
    ordersRef.once("value", (snapshot) => {
      const initialOrders = snapshot.val()
        ? Object.keys(snapshot.val()).map((orderId) => ({
            ...snapshot.val()[orderId],
            orderId,
          }))
        : [];
      setOrders(initialOrders);
    });

    const handleOrderChange = (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const orderId = childSnapshot.key;
        const orderData = childSnapshot.val();

        // Kiểm tra loại thay đổi và log ra
        if (childSnapshot.exists()) {
          if (orders.some((order) => order.orderId === orderId)) {
            // Đơn hàng đã tồn tại, đây là sự kiện sửa đổi
            console.log(`Order modified: ${orderId}`, orderData);
          } else {
            // Đơn hàng mới được thêm vào
            console.log(`Order added: ${orderId}`, orderData);
          }
        } else {
          // Đơn hàng bị xóa
          console.log(`Order removed: ${orderId}`);
        }
      });

      // Cập nhật danh sách đơn hàng
      const updatedOrders = snapshot.val()
        ? Object.keys(snapshot.val()).map((orderId) => ({
            ...snapshot.val()[orderId],
            orderId,
          }))
        : [];
      setOrders(updatedOrders);
    };

    // Bắt đầu lắng nghe khi mount component
    ordersRef.on("child_added", handleOrderChange);
    ordersRef.on("child_changed", handleOrderChange);
    ordersRef.on("child_removed", handleOrderChange);

    // Cleanup khi unmount component
    return () => {
      ordersRef.off("child_added", handleOrderChange);
      ordersRef.off("child_changed", handleOrderChange);
      ordersRef.off("child_removed", handleOrderChange);
    };
  }, [isStaff]);

  return orders;
};
