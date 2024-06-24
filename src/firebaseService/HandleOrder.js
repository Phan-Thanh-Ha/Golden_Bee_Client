import { firebase } from "@react-native-firebase/database";
import { removeData } from "../utils";
import StorageNames from "../Constants/StorageNames";
import { filterAndSortOrders } from "../utils/FilterOrder";

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
  LongitudeStaff
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
      StatusOrder: 1,
    });
    console.log("Order accepted successfully:", { orderId, staffId });
    return true;
  } catch (error) {
    console.error("Error accepting order: ", error);
    return false;
  }
};

// Đặt đơn hàng
export const placeOrder = async (
  customerId,
  orderId,
  latitudeCustomer,
  longitudeCustomer
) => {
  const newOrder = {
    CustomerId: customerId,
    OrderId: orderId,
    StaffId: "",
    StaffName: "",
    StaffPhone: "",
    LatitudeCustomer: latitudeCustomer,
    LongitudeCustomer: longitudeCustomer,
    createAt: Date.now(),
  };
  if (
    typeof customerId !== "string" &&
    typeof customerId !== "number" &&
    typeof customerId !== "boolean" &&
    customerId !== null
  ) {
    console.error("Invalid value for customerId:", customerId);
    return;
  }
  try {
    await databaseOrder.child(orderId).set(newOrder);
    console.log("Order placed successfully:", newOrder);
    return newOrder;
  } catch (error) {
    console.error("Error placing order: ", error);
    return null;
  }
};

// Lắng nghe thay đổi đơn hàng cho khách hàng
export const listenForOrderUpdates = (customerId, setCustomerOrder) => {
  if (
    typeof customerId !== "string" &&
    typeof customerId !== "number" &&
    typeof customerId !== "boolean" &&
    customerId !== null
  ) {
    console.error("Invalid value for customerId:", customerId);
    return;
  }
  console.log("Listening for order updates for client:", customerId);
  databaseOrder
    .orderByChild("CustomerId")
    .equalTo(customerId)
    .on("value", (snapshot) => {
      const orders = snapshot.val();
      console.log("Orders snapshot received:", orders);
      if (orders) {
        Object.keys(orders).forEach((orderId) => {
          const order = orders[orderId];
          setCustomerOrder(order); // Cập nhật trạng thái đơn hàng cho khách hàng
        });
      } else {
        setCustomerOrder(null); // Nếu không có đơn hàng nào
      }
    });

  // Lắng nghe sự kiện xóa đơn hàng
  databaseOrder
    .orderByChild("CustomerId")
    .equalTo(customerId)
    .on("child_removed", (snapshot) => {
      console.log("Order removed:", snapshot.val());
      setCustomerOrder(null); // Khi đơn hàng bị xóa, cập nhật trạng thái
      removeData(StorageNames.ORDER_SERVICE);
      // xóa dưới database
    });
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

// Lắng nghe các đơn hàng mà nhân viên đã nhận

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

// Xóa đơn hàng sau 10 phút
export const deleteOrderIfNotAccepted = (orderId, createAt) => {
  const currentTime = Date.now();
  if (currentTime - createAt > 10 * 60 * 1000) {
    databaseOrder.child(orderId).remove();
    console.log("Order deleted due to timeout:", orderId);
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

// Phương thức tự động nhận đơn cho nhân viên trong thời gian thực
export const autoAcceptOrder = (staffId, staffName, staffPhone, myLocation) => {
  console.log("Attempting to auto-accept order for staff:", staffId);

  // Lắng nghe các đơn hàng mà nhân viên đã nhận
  databaseOrder
    .orderByChild("StaffId")
    .equalTo(staffId)
    .on("value", (snapshot) => {
      const orders = snapshot.val();
      console.log("Current accepted orders snapshot received:", orders);

      if (orders && Object.keys(orders).length > 1) {
        console.error("Error: Staff has more than one accepted order.", orders);
        return null; // Nhân viên có hơn một đơn hàng được nhận, đây là lỗi
      } else if (orders && Object.keys(orders).length === 1) {
        console.log("Staff already has an accepted order.");
        const orderId = Object.keys(orders)[0];
        return orders[orderId]; // Trả về đơn hàng đã được nhận
      } else {
        console.log("Staff has no accepted orders, checking for new orders.");

        // Nếu không có đơn hàng nào đã nhận, lắng nghe đơn hàng mới
        databaseOrder
          .orderByChild("StaffId")
          .equalTo("")
          .once("value", async (snapshot) => {
            const orders = snapshot.val();
            console.log("New orders snapshot received:", orders);

            if (orders) {
              const newOrders = [];
              Object.keys(orders).forEach((orderId) => {
                const order = orders[orderId];
                newOrders.push(order);
              });

              // Sort đơn hàng theo khoảng cách
              filterAndSortOrders(
                newOrders,
                myLocation.latitude,
                myLocation.longitude
              );
              const sortedOrders = filterAndSortOrders(
                newOrders,
                myLocation.latitude,
                myLocation.longitude
              );
              if (sortedOrders.length > 0) {
                const orderToAccept = sortedOrders[0];
                const { OrderId } = orderToAccept;

                // Nhận đơn hàng
                const accepted = await acceptOrder(
                  OrderId,
                  staffId,
                  staffName,
                  staffPhone
                );
                if (accepted) {
                  console.log("Order accepted automatically:", OrderId);
                  return orderToAccept; // Trả về đơn hàng được nhận
                } else {
                  return null; // Không nhận được đơn hàng
                }
              } else {
                return null; // Không có đơn hàng nào để nhận
              }
            }
          });
      }
    });
};

// Hàm lắng nghe thay đổi và nhận đơn hàng cho nhân viên
// export const OVG_FBRT_ListenOdersForStaff = (
//   staffId,
//   previousStaffOrders,
//   setStaffOrders
// ) => {
//   if (
//     typeof staffId !== "string" &&
//     typeof staffId !== "number" &&
//     typeof staffId !== "boolean" &&
//     staffId !== null
//   ) {
//     console.error("Invalid value for staffId:", staffId);
//     return;
//   }

//   console.log("Listening for orders with StaffId:", staffId);

//   // Tạo một truy vấn để lắng nghe các đơn hàng có StaffId là staffId
//   const staffOrdersRef = databaseOrder.orderByChild("StaffId").equalTo(staffId);

//   // Lắng nghe sự kiện value để nhận danh sách các đơn hàng ban đầu
//   staffOrdersRef.on("value", (snapshot) => {
//     const orders = snapshot.val();
//     if (orders) {
//       const ordersArray = Object.keys(orders).map((orderId) => orders[orderId]);
//       // Kiểm tra xem danh sách đơn hàng có thay đổi không
//       if (!arraysEqual(ordersArray, previousStaffOrders)) {
//         setStaffOrders(ordersArray); // Cập nhật danh sách đơn hàng cho nhân viên
//       }
//     } else {
//       if (previousStaffOrders.length > 0) {
//         setStaffOrders([]); // Nếu không có đơn hàng nào
//       }
//     }
//   });

//   // Lắng nghe sự kiện child_changed để nhận các thay đổi trên đơn hàng
//   staffOrdersRef.on("child_changed", (snapshot) => {
//     const orderId = snapshot.key;
//     const updatedOrder = snapshot.val();
//     console.log(`Order ${orderId} has been updated:`, updatedOrder);
//     // Thực hiện các xử lý khác khi đơn hàng được cập nhật
//     // Ví dụ: cập nhật giao diện người dùng, thông báo, ...

//     // Sau khi xử lý, nếu cần cập nhật lại danh sách đơn hàng, hãy thực hiện như sau:
//     const updatedOrdersArray = previousStaffOrders.map((order) => {
//       if (order.OrderId === orderId) {
//         return updatedOrder;
//       }
//       return order;
//     });
//     setStaffOrders(updatedOrdersArray);
//     previousStaffOrders = updatedOrdersArray;
//   });

//   // Lắng nghe sự kiện child_removed để nhận thông báo khi đơn hàng bị xóa
//   staffOrdersRef.on("child_removed", (snapshot) => {
//     const removedOrder = snapshot.val();
//     console.log("Order removed:", removedOrder);
//     // Thực hiện các xử lý khác khi đơn hàng bị xóa
//     // Ví dụ: cập nhật giao diện người dùng, thông báo, ...

//     // Sau khi xử lý, nếu cần cập nhật lại danh sách đơn hàng, hãy thực hiện như sau:
//     const updatedOrdersArray = previousStaffOrders.filter(
//       (order) => order.OrderId !== snapshot.key
//     );
//     setStaffOrders(updatedOrdersArray);
//     previousStaffOrders = updatedOrdersArray;
//   });
// };

// Hàm để so sánh hai mảng

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
export const OVG_FBRT_ListenOdersForStaff = (
  staffId,
  setStaffOrders,
  userLogin,
  location,
  acceptOrder,
  OVG_spOfficer_Booking_Save
) => {
  if (
    typeof staffId !== "string" &&
    typeof staffId !== "number" &&
    typeof staffId !== "boolean" &&
    staffId !== null
  ) {
    console.error("Invalid value for staffId:", staffId);
    return;
  }

  console.log("Listening for orders with StaffId:", staffId);

  // Tạo một truy vấn để lắng nghe các đơn hàng có StaffId là staffId
  const staffOrdersRef = databaseOrder.orderByChild("StaffId").equalTo(staffId);

  // Biến để lưu trữ danh sách đơn hàng trước khi thay đổi
  let previousStaffOrders = [];

  // Lắng nghe sự kiện value để nhận danh sách các đơn hàng ban đầu
  staffOrdersRef.on("value", (snapshot) => {
    const orders = snapshot.val();
    if (orders) {
      const ordersArray = Object.keys(orders).map((orderId) => orders[orderId]);
      // Kiểm tra xem danh sách đơn hàng có thay đổi không
      if (!arraysEqual(ordersArray, previousStaffOrders)) {
        setStaffOrders(ordersArray); // Cập nhật danh sách đơn hàng cho nhân viên
        previousStaffOrders = ordersArray; // Cập nhật danh sách đơn hàng trước khi thay đổi

        // Nếu không có đơn hàng nào được nhân viên nhận, lắng nghe đơn hàng mới (StaffId là "")
        if (ordersArray.length === 0) {
          listenNewOrders((newOrders) => {
            const nearestOrder = findNearestOrder(newOrders, location);
            if (nearestOrder) {
              const accepting = acceptOrder(
                nearestOrder.OrderId,
                userLogin?.OfficerID,
                userLogin?.OfficerName,
                userLogin?.Phone,
                location?.latitude,
                location?.longitude
              );
              if (accepting) {
                // OVG_spOfficer_Booking_Save(nearestOrder);
              }
            }
          });
        }
      }
    } else {
      if (previousStaffOrders.length > 0) {
        setStaffOrders([]); // Nếu không có đơn hàng nào
        previousStaffOrders = [];

        // Nếu không có đơn hàng nào được nhân viên nhận, lắng nghe đơn hàng mới (StaffId là "")
        listenNewOrders((newOrders) => {
          const nearestOrder = findNearestOrder(newOrders, location);
          if (nearestOrder) {
            const accepting = acceptOrder(
              nearestOrder.OrderId,
              userLogin?.OfficerID,
              userLogin?.OfficerName,
              userLogin?.Phone,
              location?.latitude,
              location?.longitude
            );
            if (accepting) {
              // OVG_spOfficer_Booking_Save(nearestOrder);
            }
          }
        });
      }
    }
  });

  // Lắng nghe sự kiện child_changed để nhận các thay đổi trên đơn hàng
  staffOrdersRef.on("child_changed", (snapshot) => {
    const orderId = snapshot.key;
    const updatedOrder = snapshot.val();
    console.log(`Order ${orderId} has been updated:`, updatedOrder);
    // Thực hiện các xử lý khác khi đơn hàng được cập nhật

    // Sau khi xử lý, nếu cần cập nhật lại danh sách đơn hàng, hãy thực hiện như sau:
    const updatedOrdersArray = previousStaffOrders.map((order) => {
      if (order.OrderId === orderId) {
        return updatedOrder;
      }
      return order;
    });
    setStaffOrders(updatedOrdersArray);
    previousStaffOrders = updatedOrdersArray;
  });

  // Lắng nghe sự kiện child_removed để nhận thông báo khi đơn hàng bị xóa
  staffOrdersRef.on("child_removed", (snapshot) => {
    const removedOrder = snapshot.val();
    console.log("Order removed:", removedOrder);
    // Thực hiện các xử lý khác khi đơn hàng bị xóa

    // Sau khi xử lý, nếu cần cập nhật lại danh sách đơn hàng, hãy thực hiện như sau:
    const updatedOrdersArray = previousStaffOrders.filter(
      (order) => order.OrderId !== snapshot.key
    );
    setStaffOrders(updatedOrdersArray);
    previousStaffOrders = updatedOrdersArray;
  });

  // Hàm để tìm đơn hàng gần nhất
  const findNearestOrder = (orders, location) => {
    if (!orders || orders.length === 0) {
      return null;
    }

    // Sắp xếp các đơn hàng theo vị trí gần tôi nhất
    const sortedOrders = filterAndSortOrders(
      orders,
      location?.latitude,
      location?.longitude
    );
    // Trả về đơn hàng gần nhất (đơn hàng đầu tiên sau khi đã sắp xếp)
    return sortedOrders[0];
  };
};

// Hàm để so sánh hai mảng
export const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) return false;
  }
  return true;
};
