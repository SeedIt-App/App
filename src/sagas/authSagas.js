import { put, call, all, fork, takeLatest, select } from "redux-saga/effects";
import { AuthActions } from "../actions";
import { POST, PUT } from "../api";
import idx from "idx";

// sign up user

function* doSignUp(action) {
  yield put(AuthActions.signupRequest());
  try {
    const signUpURL = "/auth/register";
    const { response } = yield call(POST, signUpURL, action.payload);
    yield put(AuthActions.signupSuccess());
  } catch (error) {
    let msgError = null;
    if (error.data) {
      msgError = error.data;
    }
    yield put(AuthActions.signupFailure(msgError));
  }
}

// sign up for oauth user

function* doOauthSignUp(action) {
  yield put(AuthActions.oauthSignupRequest());
  try {
    const oauthSignUpURL = "/auth/oauth";
    const { response } = yield call(POST, oauthSignUpURL, action.payload);
    yield put(
      AuthActions.setAuthUser({
        user: idx(response, _ => _.data.user),
        token: idx(response, _ => _.data.token)
      })
    );
        yield put(AuthActions.oauthSignupSuccess());
  
  } catch (error) {
    let msgError = null;
    if (error.data) {
      msgError = error.data;
    }
    yield put(AuthActions.oauthSignupFailure(msgError));
  }
}

// login user

function* doLogin(action) {
  yield put(AuthActions.loginRequest());
  try {
    const loginURL = "/auth/login";
    const { response } = yield call(POST, loginURL, action.payload);
    yield put(AuthActions.loginSuccess());
    yield put(
      AuthActions.setAuthUser({
        user: idx(response, _ => _.data.user),
        token: idx(response, _ => _.data.token)
      })
    );
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(AuthActions.loginFailure(msgError));
  }
}

const getUser = state => state.auth.user;
console.log(getUser, "getUser");

// refresh token

function* refreshToken(action) {
  yield put(AuthActions.refreshTokenRequest());
  try {
    const refreshURL = "/auth/refresh-token";
    const { response } = yield call(POST, refreshURL, action.payload);
    yield put(AuthActions.refreshTokenSuccess());
    yield put(
      AuthActions.updateAuthUser({
        token: idx(response, _ => _.data)
      })
    );
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(AuthActions.refreshTokenFailure(msgError));
  }
}
// forgot Password

function* forgotPassword(action) {
  yield put(AuthActions.forgotPasswordRequest());
  try {
    const { body } = action.payload;
    const forgotPasswordUrl = "/auth/forgot";
    const { response } = yield call(POST, forgotPasswordUrl, body);
    yield put(AuthActions.forgotPasswordSuccess());

  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(AuthActions.forgotPasswordFailure(msgError));
  }
}

// reset Password

function* resetPassword(action) {
  yield put(AuthActions.resetPasswordRequest());
  try {
    const body = action.payload;
    const resetPasswordUrl = "/auth/reset";
    const { response } = yield call(POST, resetPasswordUrl, body);
    yield put(AuthActions.resetPasswordSuccess());
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(AuthActions.resetPasswordFailure(msgError));
  }
}

export default function* authSagas() {
  yield all([fork(takeLatest, AuthActions.SIGNUP, doSignUp)]);
  yield all([fork(takeLatest, AuthActions.OAUTH_SIGNUP, doOauthSignUp)]);
  yield all([fork(takeLatest, AuthActions.LOGIN, doLogin)]);
  yield all([fork(takeLatest, AuthActions.REFRESH_TOKEN, refreshToken)]);
  yield all([fork(takeLatest, AuthActions.RESET_PASSWORD, resetPassword)]);
  yield all([fork(takeLatest, AuthActions.FORGOT_PASSWORD, forgotPassword)]);
}
