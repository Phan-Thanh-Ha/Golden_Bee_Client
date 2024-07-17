import mainTypes from "./mainTypes";

export function closeError(params, cb) {
  return {
    type: mainTypes.ERROR,
    params,
  };
}

export function API_spCallServer(params, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({
      type: mainTypes.CallServer,
      params,
      resolve,
      reject,
    });
  });
}

export function confirmInOrder(status) {
  return {
    type: mainTypes.CONFIRM,
    payload: status,
  };
}

export function userLogin(user, dispatch) {
  return dispatch({
    type: mainTypes.USER_PROFILE,
    payload: user,
  });
}

export function userLogout(dispatch) {
  return dispatch({
    type: mainTypes.USER_PROFILE,
    payload: {},
  });
}

export function acceptedOrder(order, dispatch) {
  return dispatch({
    type: mainTypes.ACCEPTED_ORDER,
    payload: order,
  });
}

export function setMyOrdersAccepted(orders, dispatch) {
  return dispatch({
    type: mainTypes.MY_ORDER_ACCEPTED,
    payload: orders,
  });
}

export function doneOderAcepted(dispatch) {
  return dispatch({
    type: mainTypes.ACCEPTED_ORDER,
    payload: {},
  });
}
export function locationUpdate(location, dispatch) {
  // console.log("locationUpdate------------------------------", location);
  return dispatch({
    type: mainTypes.LOCATION_TIME,
    payload: location,
  });
}

export function API_spCallPostImage(params, dispatch) {
  //debugger
  return new Promise((resolve, reject) => {
    dispatch({
      type: mainTypes.PostImage,
      params,
      resolve,
      reject,
    });
  });
}

export function checkPermission(params, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({
      type: mainTypes.CHECK_PERMISSION,
      params,
      resolve,
      reject,
    });
  });
}

export function setInitValueFirebase(status, dispatch) {
  return dispatch({
    type: mainTypes.INIT_VALUE_FIREBASE,
    payload: status,
  });
}

export function DecryptString(params, dispatch) {
  //debugger
  return new Promise((resolve, reject) => {
    dispatch({
      type: mainTypes.DecryptString,
      params,
      resolve,
      reject,
    });
  });
}
