// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  onValue,
  orderByChild,
  equalTo,
  update,
  remove,
} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_rVEn4ImOdNFGoUPNCj-UrXE3tygWIEY",
  authDomain: "golden-bee-651eb.firebaseapp.com",
  databaseURL:
    "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "golden-bee-651eb",
  storageBucket: "golden-bee-651eb.appspot.com",
  messagingSenderId: "616914078130",
  appId: "1:616914078130:web:602db051750307802ebcab",
  measurementId: "G-NWK8EZ7GQX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the orders in the database
const databaseOrder = ref(database, "/order");

// Function to place an order
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

  try {
    await set(child(databaseOrder, orderId), newOrder);
    console.log("Order placed successfully:", newOrder);
    return newOrder;
  } catch (error) {
    console.error("Error placing order: ", error);
    return null;
  }
};

// Function to listen for order updates for a customer
export const listenForOrderUpdates = (customerId, setCustomerOrder) => {
  console.log("Listening for order updates for client:", customerId);
  const customerOrdersQuery = query(
    databaseOrder,
    orderByChild("CustomerId"),
    equalTo(customerId)
  );

  onValue(customerOrdersQuery, (snapshot) => {
    const orders = snapshot.val();
    console.log("Orders snapshot received:", orders);
    if (orders) {
      Object.keys(orders).forEach((orderId) => {
        const order = orders[orderId];
        setCustomerOrder(order); // Update customer order state
      });
    } else {
      setCustomerOrder(null); // If no orders found
    }
  });

  // Listen for order removal
  onChildRemoved(customerOrdersQuery, (snapshot) => {
    console.log("Order removed:", snapshot.val());
    setCustomerOrder(null); // When an order is removed, update the state
    removeData(StorageNames.ORDER_SERVICE); // Remove from local storage
  });
};

// Function to listen for new orders for staff
export const listenForNewOrders = (newOrders, setNewOrders) => {
  console.log("Listening for new orders with StaffId equal to ''");
  const newOrdersQuery = query(
    databaseOrder,
    orderByChild("StaffId"),
    equalTo("")
  );

  onValue(newOrdersQuery, (snapshot) => {
    const orders = snapshot.val();
    console.log("New orders snapshot received:", orders);
    if (orders && orders !== newOrders) {
      const newOrdersList = [];
      Object.keys(orders).forEach((orderId) => {
        const order = orders[orderId];
        newOrdersList.push(order);
      });
      setNewOrders(newOrdersList); // Update new orders list
    } else {
      setNewOrders([]); // If no new orders found
    }
  });
};

// Function to update staff location
export const updateLocation = async (
  orderId,
  LatitudeStaff,
  LongitudeStaff
) => {
  const location = {
    LatitudeStaff: LatitudeStaff,
    LongitudeStaff: LongitudeStaff,
  };

  try {
    await update(child(databaseOrder, orderId), location);
    console.log("Location updated successfully:", location);
    return location;
  } catch (error) {
    console.error("Error updating location: ", error);
    return false;
  }
};

// Function to update order status
export const updateStatusOrder = async (orderId, statusOrder) => {
  const status = {
    StatusOrder: statusOrder,
  };

  try {
    await update(child(databaseOrder, orderId), status);
    console.log("Status updated successfully:", status);
    return status;
  } catch (error) {
    console.error("Error updating status: ", error);
    return false;
  }
};

// Function to listen for accepted orders for staff
export const listenForAcceptedOrders = (
  staffId,
  acceptedOrder,
  setAcceptedOrders
) => {
  console.log("Listening for accepted orders for staff:", staffId);
  const acceptedOrdersQuery = query(
    databaseOrder,
    orderByChild("StaffId"),
    equalTo(staffId)
  );

  onValue(acceptedOrdersQuery, (snapshot) => {
    const orders = snapshot.val();
    console.log("Accepted orders snapshot received:", orders);
    if (orders && orders !== acceptedOrder) {
      const acceptedOrdersList = [];
      Object.keys(orders).forEach((orderId) => {
        const order = orders[orderId];
        acceptedOrdersList.push(order);
      });
      setAcceptedOrders(acceptedOrdersList); // Update accepted orders list
    } else {
      setAcceptedOrders([]); // If no accepted orders found
    }
  });
};

// Function to accept an order
export const acceptOrder = async (
  orderId,
  staffId,
  staffName,
  staffPhone,
  LatitudeStaff,
  LongitudeStaff
) => {
  try {
    await update(child(databaseOrder, orderId), {
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

// Function to complete an order
export const completeOrder = async (orderId) => {
  try {
    await remove(child(databaseOrder, orderId));
    console.log("Order completed and removed successfully:", orderId);
    return true;
  } catch (error) {
    console.error("Error completing order: ", error);
    return false;
  }
};

// Function to delete an order if not accepted within 10 minutes
export const deleteOrderIfNotAccepted = (orderId, createAt) => {
  const currentTime = Date.now();
  if (currentTime - createAt > 10 * 60 * 1000) {
    remove(child(databaseOrder, orderId));
    console.log("Order deleted due to timeout:", orderId);
  }
};

// Function to check and delete expired orders
export const checkAndDeleteExpiredOrders = () => {
  console.log("Checking and deleting expired orders");
  onValue(databaseOrder, (snapshot) => {
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
