import { fork, all } from "redux-saga/effects";
import authSagas from "./authSagas";
import userSagas from "./userSagas";

export default function* sagas() {
  yield all([fork(authSagas)]);
  yield all([fork(userSagas)]);
}
