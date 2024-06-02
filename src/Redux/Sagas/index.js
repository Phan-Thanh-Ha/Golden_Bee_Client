import { fork } from "redux-saga/effects";
import watchMainSagas from "./mainSagas";

export default function* rootSaga() {
  yield fork(watchMainSagas);
}
