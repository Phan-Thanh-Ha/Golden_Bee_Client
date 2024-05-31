import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  api,
  APIKey,
  API_END_POINT,
  API_CUSTOMER,
  APIKey_Customer,
} from "../../Config";
import { StorageNames } from "../../Constants";
import { getData, setData } from "../../Utils/localStore";
import mainTypes from "../Action/mainTypes";
// import messaging from "@react-native-firebase/messaging";

export function* cameraScan(action) {
  yield put({ type: mainTypes.LOADING, payload: true });
  const params = action && action.params;
  yield delay(300);
}

export default function* watchMainSagas() {}
