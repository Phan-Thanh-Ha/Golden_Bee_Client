import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
// import {api, APIKey, API_END_POINT} from '../../Config';
import mainTypes from "../Action/mainTypes";
import { api, APIKey, API_END_POINT, IMAGES_DOMAIN } from "../../Config/Api";
import messaging from "@react-native-firebase/messaging";
export function* API_spCallServer(action) {
  const params = action && action.params;

  try {
    if (!params) {
      throw new Error("Missing parameters.");
    }

    params.API_key = APIKey;
    yield delay(300);

    // Call API
    const FuncApi = "API_spCallServer";
    const url = `${API_END_POINT}/ApiMain/API_spCallServer/${FuncApi}`;
    const response = yield api.post(url, params);

    // Check API call success
    if (response && response.status === 200) {
      if (response.data === "") {
        action.resolve([]);
      } else {
        action.resolve(JSON.parse(response.data));
      }
    } else {
      action.reject(response);
    }
  } catch (error) {
    action.reject(error);
    yield delay(600);
    action.resolve(false);
  }
}

export function* cameraScan(action) {
  yield put({ type: mainTypes.LOADING, payload: true });
  const params = action && action.params;
  yield delay(300);
}
export function* checkPermission(action) {
  try {
    const authStatus = yield messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      const token = yield messaging().getToken();
      if (token) {
        // yield setData(StorageNames.DEVICES_TOKEN, JSON.stringify(token));
        action.resolve(token);
      }
    }
  } catch (e) {
    yield delay(300);
    action.reject(e);
  }
}

export function* API_spCallPostImage(action) {
  try {
    //params received
    const params = action && action.params;

    let FuncApi = "API_spCallPostImage_New";
    let respone = yield api.post(
      "https://api-crmcak.vps.vn/api/ApiMain/API_spCallPostImage_TimeKeeping",
      params
    );
    // check call api success
    if (respone && respone.status === 201) {
      respone.data == {}
        ? action.resolve([])
        : action.resolve(JSON.parse(respone.data.Message));
    } else {
      // api call fail
      action.reject(respone);
    }
  } catch (e) {
    ///something wrong
    action.reject(e);
  }
}
export function* DecryptString(action) {
  try {
    //params received
    const params = action && action.params;
    params.API_key = APIKey;
    let FuncApi = "DecryptString";
    /// catch api die
    yield delay(300);

    // call api
    let respone = yield api.post(API_END_POINT + "/ApiMain/" + FuncApi, params);
    // check call api success
    if (respone && respone.status === 200) {
      respone.data === "" ? action.resolve("") : action.resolve(respone.data);
    } else {
      // api call fail
      action.reject(respone);
    }
  } catch (e) {
    ///something wrong
    action.reject(e);
  }
}

export default function* watchMainSagas() {
  yield takeEvery(mainTypes.CallServer, API_spCallServer);
  yield takeEvery(mainTypes.PostImage, API_spCallPostImage);
  yield takeLatest(mainTypes.CHECK_PERMISSION, checkPermission);
  yield takeEvery(mainTypes.DecryptString, DecryptString);
}
