const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => degree * (Math.PI / 180);

  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Khoảng cách (km)

  return distance;
};

// Hàm lọc và sắp xếp đơn hàng
export const filterAndSortOrders = (orders, myLatitude, myLongitude) => {
  // Lọc các đơn hàng trong phạm vi 5km
  const filteredOrders = orders.filter((order) => {
    const distance = calculateDistance(
      myLatitude,
      myLongitude,
      order.LatitudeCustomer,
      order.LongitudeCustomer
    );
    console.log(
      `Distance to order ${order.OrderId}: ${distance.toFixed(2)} km`
    );
    return distance <= 500000000;
  });

  // Sắp xếp các đơn hàng theo khoảng cách tăng dần
  filteredOrders.sort((a, b) => {
    const distanceA = calculateDistance(
      myLatitude,
      myLongitude,
      a.LatitudeCustomer,
      a.LongitudeCustomer
    );
    const distanceB = calculateDistance(
      myLatitude,
      myLongitude,
      b.LatitudeCustomer,
      b.LongitudeCustomer
    );
    return distanceA - distanceB;
  });

  return filteredOrders;
};
