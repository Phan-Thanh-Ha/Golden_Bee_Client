export const FormatTime = (timestamp, type) => {
  // Chuyển đổi timestamp thành đối tượng Date
  const date = new Date(timestamp);

  // Lấy các thành phần của ngày và giờ
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Định dạng các thành phần ngày và giờ thành chuỗi
  const dayStr = day < 10 ? `0${day}` : day;
  const monthStr = month < 10 ? `0${month}` : month;
  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  // Định dạng chuỗi kết quả theo yêu cầu của type
  if (type === 1) {
    return `${dayStr}/${monthStr}/${year} ${hoursStr}:${minutesStr}`;
  } else if (type === 2) {
    return `${hoursStr}:${minutesStr}`;
  } else {
    throw new Error('sai định dạng');
  }
};

// Ví dụ sử dụng
// const timestamp = 1718821492732;
// const type1 = 1;
// const type2 = 2;
import {format} from 'date-fns';

export const parseTimeSql = (time, type) => {
  const date = new Date(time);
  if (type === 1) {
    return format(date, 'dd/MM/yyyy HH:mm');
  } else if (type === 2) {
    return format(date, 'HH:mm');
  } else {
    throw new Error('sai định dạng');
  }
};
