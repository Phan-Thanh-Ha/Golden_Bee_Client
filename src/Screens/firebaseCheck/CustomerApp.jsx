// CustomerApp.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { placeOrder } from '../../firebaseService/HandleOrder';

const CustomerApp = () => {
  const [orderText, setOrderText] = useState('');

  // Hàm đặt đơn hàng
  const handlePlaceOrder = async () => {
    if (!orderText) return;

    try {
      await placeOrder(orderText);
      setOrderText('');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  // Hàm hủy đơn hàng
  const handleCancelOrder = async () => {
    if (!orderText) return;

    try {
      await cancelOrderFromCustomer(orderText);

      setOrderText('');
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Customer App</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        placeholder="Enter order details"
        value={orderText}
        onChangeText={text => setOrderText(text)}
      />
      <Button title="Place Order" onPress={handlePlaceOrder} />
      <Button title="Cancel Order" onPress={handleCancelOrder} />
    </View>
  );
};

export default CustomerApp;
