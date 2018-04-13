import { put, call, all, fork, takeLatest, select } from "redux-saga/effects";
import { UserActions } from "../actions";
import { GET, POST, PUT } from "../api";
import idx from "idx";

function* getSingleUser(action) {
  yield put(UserActions.signupRequest());
  try {
    const user = yield select(getUser);

    const userprofileURL = "/users";
    const { response } = yield call(GET, userprofileURL);
    yield put(UserActions.profileSuccess());
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(UserActions.signupFailure(msgError));
  }
}

function* profile(action) {
  yield put(UserActions.profileRequest());
  try {
    const userprofileURL = "/users/profile";
    const { response } = yield call(GET, userprofileURL);
    console.log(response,"pR")
    yield put(UserActions.profileSuccess({
      luser:response.data
    }));
  } catch (error) {
    console.log(error)
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(UserActions.profileFailure(msgError));
  }
}

function* editProfile(action) {
  yield put(UserActions.googlesignupRequest());
  try {
    const googleLoginURL = "/auth/google";
    const { response } = yield call(GET, googleLoginURL);
    yield put(UserActions.googlesignupSuccess());
    yield put(UserActions.setAuthUser({
      user: idx(response, _ => _.data.data)
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(UserActions.googlesignupFailure(msgError));
}}

export default function* authSagas() {
yield all([fork(takeLatest, UserActions.PROFILE, getSingleUser)]);
yield all([fork(takeLatest, UserActions.EDITPROFILE, editProfile)]);
yield all([fork(takeLatest, UserActions.PROFILE, profile)]);
}
