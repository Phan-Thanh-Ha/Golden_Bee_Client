export const checkCaseStatus = (statusOnline, surplus, numOrder) => {
  if (statusOnline === false) {
    return {
      status: 'Bạn đang tắt trạng thái nhận việc',
    };
  }
  if (surplus < 200000) {
    return {
      status:
        'Bạn cần có nhiều hơn 200.000 VNĐ trong tài khoản để bắt đầu nhận việc',
    };
  }
  if (numOrder > 1) {
    return {
      status:
        'Bạn đang được nhận ' +
        numOrder +
        ' đơn dịch vụ, vui lòng liên hệ quản trị viên để giải quyết',
    };
  }
  // if (state === 10) {
  //   return {
  //     status:
  //       "Tài khoản của bạn chưa được kích hoạt, vui lòng liên hệ quản trị viên đẻ được kích hoạt",
  //   };
  // }
  return {
    status: 'Ong Vàng đang tìm việc làm cho bạn',
  };
};
