import { put, call, all, fork, takeLatest, select } from "redux-saga/effects";
import { AuthActions } from "../actions";
import { POST, PUT } from "../api";
import idx from "idx";

function* doSignUp(action) {
  yield put(AuthActions.loginRequest());
  try {
    const loginURL = "/customers/auth/signin";
    const { response } = yield call(POST, loginURL, action.payload);
    yield put(AuthActions.signupSuccess());
    yield put(
      AuthActions.setAuthUser({
        user: idx(response, _ => _.data.data)
      })
    );
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(AuthActions.loginFailure(msgError));
  }
}

export default function* authSagas() {
  yield all([fork(takeLatest, AuthActions.SIGNUP, doSignUp)]);
}
