import { fork, all } from "redux-saga/effects";
import authSagas from "./authSagas";
import userSagas from "./userSagas";
import postSagas from "./postSagas";
import tagsSagas from "./tagsSagas";
import newsFeedSagas from "./newsFeedSagas";
import followSagas from "./followSagas";

export default function* sagas() {
  yield all([fork(authSagas)]);
  yield all([fork(userSagas)]);
  yield all([fork(postSagas)]);
  yield all([fork(tagsSagas)]);
  yield all([fork(newsFeedSagas)]);
  yield all([fork(followSagas)]);

}
