import {delay, put, takeEvery, takeLatest} from 'redux-saga/effects';
// import {api, APIKey, API_END_POINT} from '../../Config';
import mainTypes from '../Action/mainTypes';
import {api, APIKey, API_END_POINT} from '../../Config/Api';
// import messaging from "@react-native-firebase/messaging";

export function* API_spCallServer(action) {
  console.log('🚀 ~ function*API_spCallServer ~ action:', action);
  const params = action && action.params;

  try {
    if (!params) {
      throw new Error('Missing parameters.');
    }

    params.API_key = APIKey;
    yield delay(300);

    // Call API
    const FuncApi = 'API_spCallServer';
    const url = `${API_END_POINT}/ApiMain/API_spCallServer/${FuncApi}`;
    const response = yield api.post(url, params);

    // Check API call success
    if (response && response.status === 200) {
      if (response.data === '') {
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
  yield put({type: mainTypes.LOADING, payload: true});
  const params = action && action.params;
  yield delay(300);
}

export default function* watchMainSagas() {
  yield takeEvery(mainTypes.CallServer, API_spCallServer);
}
