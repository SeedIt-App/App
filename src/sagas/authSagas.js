import { put, call, all, fork, takeLatest, select } from 'redux-saga/effects';
import { AuthActions } from '../actions';
import { POST, PUT } from '../api';
import idx from 'idx';

function* doSignUp(action) {
  yield put(AuthActions.signupRequest());
  try {
    const signUpURL = '/auth/register';
    const { response } = yield call(POST, signUpURL, action.payload);
    yield put(AuthActions.signupSuccess());
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
    const loginURL = '/auth/login';
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

const getUser = state => state.auth.user;
console.log(getUser, 'getUser');

function* refreshToken(action) {
  yield put(AuthActions.refreshTokenRequest());
  try {
    const refreshURL = '/auth/refresh-token';
    const { response } = yield call(POST, refreshURL, action.payload);
    yield put(AuthActions.refreshTokenSuccess());
    yield put(AuthActions.updateAuthUser({
      token: idx(response, _ => _.data),
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(AuthActions.refreshTokenFailure(msgError));
  }
}

function* doSignupByGoggle(action) {
  yield put(AuthActions.googlesignupRequest());
  try {
    const googleLoginURL = '/auth/google';
    const { response } = yield call(GET, googleLoginURL);
    yield put(AuthActions.googlesignupSuccess());
    yield put(AuthActions.setAuthUser({
      user: idx(response, _ => _.data.data),
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(AuthActions.googlesignupFailure(msgError));
  }
}

/* function* forgotPassword(action) {
  const { email } = action.payload;
  yield put(AuthActions.forgotPasswordRequest());
  try {
    const forgotPasswordUrl = `/users/password/forgot/${email}`;
    yield call(GET, forgotPasswordUrl);
    yield put(AuthActions.forgotPasswordSuccess());
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(AuthActions.forgotPasswordFailure(msgError));
  }
} */

export default function* authSagas() {
  yield all([fork(takeLatest, AuthActions.SIGNUP, doSignUp)]);
  yield all([fork(takeLatest, AuthActions.LOGIN, doLogin)]);
  yield all([fork(takeLatest, AuthActions.REFRESH_TOKEN, refreshToken)]);
  yield all([fork(takeLatest, AuthActions.GOOGLESIGNUP, doSignupByGoggle)]);
  /*    yield all([fork(takeLatest, AuthActions.FORGOT_PASSWORD, forgotPassword)]);
*/
}
