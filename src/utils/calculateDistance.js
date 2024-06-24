export const calculateDistance = (
  latitudeA,
  longitudeA,
  latitudeB,
  longitudeB
) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Bán kính trái đất tính theo km
  const dLat = toRad(latitudeB - latitudeA);
  const dLon = toRad(longitudeB - longitudeA);
  const latA = toRad(latitudeA);
  const latB = toRad(latitudeB);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latA) * Math.cos(latB);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

// Hàm để sắp xếp mảng đơn hàng
export const sortOrdersByDistance = (myLatitude, myLongitude, orders) => {
  return orders.sort((a, b) => {
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
};
