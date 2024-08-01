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
  } else if (type === 3) {
    return format(date, "dd/MM/yyyy HH:mm");
  } else {
    throw new Error('sai định dạng');
  }
};

export function dateTimeFormat(dateTimeString, type) {
  // Tách chuỗi thời gian thành ngày và giờ
  const [datePart, timePart] = dateTimeString.split(" ");

  // Tách phần ngày thành năm, tháng, ngày
  const [year, month, day] = datePart.split("-");

  let formattedDateTime;

  // Xác định định dạng đầu ra dựa trên giá trị của type
  switch (type) {
    case 1:
      // Định dạng ngày/tháng/năm giờ:phút:giây
      formattedDateTime = `${day}/${month}/${year} ${timePart}`;
      break;
    case 2:
      // Định dạng ngày/tháng/năm giờ:phút
      formattedDateTime = `${day}/${month}/${year} ${timePart.slice(0, 5)}`;
      break;
    case 3:
      // Định dạng ngày/tháng/năm
      formattedDateTime = `${day}/${month}/${year}`;
      break;
    default:
      // Định dạng mặc định nếu type không hợp lệ
      formattedDateTime = `${day}/${month}/${year} ${timePart}`;
      break;
  }

  return formattedDateTime;
}
