function calculateTotalPrice(otherService) {
  if (!otherService || otherService.length === 0) {
    return 0;
  }
  return otherService.reduce((total, detail) => {
    return total + (detail.ServicePriceDetail || 0);
  }, 0);
}

export const priceClearning = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  return price * values?.people * values?.room + priceServiceDetail;
};
export const priceHourseClearning = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  return price * values?.people * values?.room + priceServiceDetail;
};

export const priceOfficeClearning = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  return price * values?.people * values?.room + priceServiceDetail;
};
export const priceClearningMachine = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price + values?.people * serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceClearningAirConditioner = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price + values?.people * serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceRepairElectricity = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price + values?.people * serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceRepairAirConditioner = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price + values?.people * serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceRepairPipe = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price + values?.people * serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceRepairCamera = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price + values?.people * serviceOptionPrice + priceServiceDetail;
  return total;
};

export const priceRepairInterior = (values, price) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  const serviceOptionPrice = values?.serviceOption?.OptionePrice || 0;
  const total =
    price + values?.people * serviceOptionPrice + priceServiceDetail;
  return total;
};
