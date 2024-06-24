// EmployeeApp.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { acceptOrder } from '../../firebaseService/HandleOrder';
import { db } from '../../firebase/FirebaseConfig';

const EmployeeApp = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = db.child('orders');
    // Lắng nghe thay đổi trên danh sách đơn hàng
    ordersRef.on('value', snapshot => {
      const ordersData = snapshot.val() ? Object.values(snapshot.val()) : [];
      setOrders(ordersData);
    });
    return () => ordersRef.off('value');
  }, []);

  // Hàm nhận đơn hàng
  const handleAcceptOrder = async (orderKey) => {
    try {
      await acceptOrder(orderKey);
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  // Render từng mục đơn hàng
  const renderOrderItem = ({ item }) => (
    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10 }}>
      <Text>Order: {item.order}</Text>
      <Text>Status: {item.status}</Text>
      {item.status === 'placed' && (
        <Button title="Accept Order" onPress={() => handleAcceptOrder(item.key)} />
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Employee App</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.key}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default EmployeeApp;
