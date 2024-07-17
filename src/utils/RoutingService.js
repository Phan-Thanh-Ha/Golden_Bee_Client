import { ScreenNames } from "../Constants";
import {
  ic_air_conditioner,
  ic_clean_the_office,
  ic_cleaning,
  ic_house_cleaning,
  ic_installing,
  ic_interior,
  ic_repair_electricity,
  ic_repair_the_air_conditioning,
  ic_repair_the_camera,
  ic_the_machine,
} from "../assets";
const serviceRoutes = {
  7: ScreenNames.FORM_CLEARNING, // giúp việc
  8: ScreenNames.FORM_HOUSE_CLEARING, // dọn nhà
  9: ScreenNames.FORM_OFFICE_CLEARING, // dọn văn phòng
  10: ScreenNames.FORM_MACHINE_CLEANING, // vệ sinh máy giặt
  11: ScreenNames.FORM_AIR_CONDITIONING, // vệ sinh ddiieuf hòa
  13: ScreenNames.FORM_REPAIR_AIR_CONDITIONING, // sửa ddiieuf hòa
  14: ScreenNames.FORM_INSTALLING, // sửa oonsg nuoc
  15: ScreenNames.FORM_REPAIR_CAMERA, // sửa camera
  16: ScreenNames.FORM_INTERIOR, // sửa nội thất
  12: ScreenNames.FORM_REPAIR_ELECTRICITY, // sửa dien
};
const serviceIcon = {
  7: ic_cleaning, // giúp việc
  8: ic_house_cleaning, // dọn nhà
  9: ic_clean_the_office, // dọn văn phòng
  10: ic_the_machine, // vệ sinh máy giặt
  11: ic_air_conditioner, // vệ sinh ddiieuf hòa
  12: ic_repair_electricity, // sửa dien
  13: ic_repair_the_air_conditioning, // sửa ddiieuf hòa
  14: ic_installing, // sửa oonsg nuoc
  15: ic_repair_the_camera, // sửa camera
  16: ic_interior, // sửa nội thất
};

export const getRouterById = (id) => {
  if (serviceRoutes[id]) {
    return serviceRoutes[id];
  } else {
    return ScreenNames.HOME;
  }
};
export const getIconById = (id) => {
  if (serviceIcon[id]) {
    return serviceIcon[id];
  } else {
    return ic_cleaning;
  }
};
