export const RoundUpNumber = (num, decimal) => {
  if (num === 0) return 0;
  const factor = Math.pow(10, decimal);
  return Math.ceil(num * factor) / factor;
};
