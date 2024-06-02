import Axios from 'axios';
export const api = Axios.create({
  baseURL: API_END_POINT,
  headers: {'Content-Type': 'application/json'},
});
export const setToken = token => {
  api.defaults.headers.common.Authorization = token;
};

// Kết nối API
const API_DOMAIN = 'https://api-crmcak.vps.vn//api'; //DOMAIN API

// Lấy thông tin user login để lấy đường link show ảnh
let API_IMAGE = '';

const fetchUserLogin = async () => {
  API_IMAGE = 'https://cakshow-img.vps.vn/';
};

// Khởi tạo
const initialize = async () => {
  await fetchUserLogin();
};

initialize();

export {API_IMAGE};

fetchUserLogin();

export const APIKey = 'netcoApikey2025';
export const APIKey_Customer = 'netCoApi2022';

export const API_END_POINT = API_DOMAIN;
