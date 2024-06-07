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

export function confirmJob(itemID) {
  return {
    type: mainTypes.CONFIRM,
    payload: itemID,
  };
}

export function doneJob() {
  return {
    type: mainTypes.DONE_JOB,
  };
}
