import { put, call, all, fork, takeLatest, select } from 'redux-saga/effects';
import { UserActions, AuthActions } from '../actions';
import { GET, POST, PUT, PATCH } from '../api';
import idx from 'idx';

/* function* getSingleUser(action) {
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
} */

function* profile(action) {
  yield put(UserActions.profileRequest());
  try {
    const userprofileURL = '/users/profile';
    const { response } = yield call(GET, userprofileURL);
    console.log(response, 'pR');
    yield put(UserActions.profileSuccess({
      luser: response.data,
    }));
  } catch (error) {
    console.log(error);
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(UserActions.profileFailure(msgError));
  }
}

function* editProfile(action) {
  yield put(UserActions.editProfileRequest());
  try {
    const updateProfileUrl = '/users/5acb0eeeb449b100206408ad';
    const { response } = yield call(PATCH, updateProfileUrl, action.payload);
    yield put(UserActions.editProfileSuccess({
      updatedUser: response.data,
    }));
    /* yield put(AuthActions.updateAuthUser({
      user:
    })); */
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(UserActions.editProfileFailure(msgError));
  }
}

export default function* authSagas() {
  /* yield all([fork(takeLatest, UserActions.PROFILE, getSingleUser)]);
*/ yield all([fork(takeLatest, UserActions.EDITPROFILE, editProfile)]);
  yield all([fork(takeLatest, UserActions.PROFILE, profile)]);
}
