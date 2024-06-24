export const checkCaseStatus = (statusOnline, surplus) => {
  if (statusOnline === false) {
    return {
      status: "Bạn đang tắt trạng thái nhận việc",
    };
  }
  if (surplus < 200000) {
    return {
      status:
        "Bạn cần có nhiều hơn 200.000 vnđ trong tài khoản để bắt đầu nhận việc",
    };
  }
  return {
    status: "Ong Vàng đang tìm việc làm cho bạn",
  };
};
