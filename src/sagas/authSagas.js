import { put, call, all, fork, takeLatest, select } from "redux-saga/effects";
import { AuthActions } from "../actions";
import { POST, PUT } from "../api";
import idx from "idx";

function* doSignUp(action) {
  yield put(AuthActions.signupRequest());
  try {
    const signUpURL = "/auth/register";
    const { response } = yield call(POST, signUpURL, action.payload);
    yield put(AuthActions.signupSuccess());
    /*yield put(AuthActions.setAuthUser({
      user: idx(response, _ => _.data.data),
    }));*/
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(AuthActions.signupFailure(msgError));
  }
}

function* doLogin(action) {
  yield put(AuthActions.loginRequest());
  try {
    const loginURL = "/auth/login";
    const { response } = yield call(POST, loginURL, action.payload);
    yield put(AuthActions.loginSuccess());
    yield put(AuthActions.setAuthUser({
      user: idx(response, _ => _.data.user),
      token: idx(response, _ => _.data.token),
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(AuthActions.loginFailure(msgError));
  }
}

function* doSignupByGoggle(action) {
  yield put(AuthActions.googlesignupRequest());
  try {
    const googleLoginURL = "/auth/google";
    const { response } = yield call(GET, googleLoginURL);
    yield put(AuthActions.googlesignupSuccess());
    yield put(AuthActions.setAuthUser({
      user: idx(response, _ => _.data.data)
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(AuthActions.googlesignupFailure(msgError));
  
}}

export default function* authSagas() {
  yield all([fork(takeLatest, AuthActions.SIGNUP, doSignUp)]);
  yield all([fork(takeLatest, AuthActions.LOGIN, doLogin)]);
  yield all([fork(takeLatest, AuthActions.GOOGLESIGNUP, doSignupByGoggle)]);
}