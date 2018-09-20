import { put, call, all, fork, takeLatest, select } from 'redux-saga/effects';
import { UserActions, AuthActions } from '../actions';
import { GET, POST, PUT, PATCH } from '../api';
import idx from 'idx';

function* getSingleUser(action) {
  yield put(UserActions.getSingleUserRequest());
  try {
    const singleUserData = [];
    const usersID = action.payload;
    for (uId of usersID) {
      const singleUserURL = `/users/${uId}`;
      const { response } = yield call(GET, singleUserURL);
      singleUserData.push(response.data);
      yield put(UserActions.getSingleUserSuccess({
        singleUserData,
      }));
    }
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(UserActions.getSingleUserFailure(msgError));
  }
}

function* getAllUser(action) {
  yield put(UserActions.getAllUserRequest());
  try {
    const getAllUserURL = '/users?select=*&filter[role]=user&sort=asc';
    const { response } = yield call(GET, getAllUserURL);
    yield put(UserActions.getAllUserSuccess({
      allUsers: response.data,
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(UserActions.getAllUserFailure(msgError));
  }
}

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

const getUser = state => state.auth.user;

function* editProfile(action) {
  yield put(UserActions.editProfileRequest());
  try {
    const user = yield select(getUser);
    const userId = user._id;
    const updateProfileUrl = `/users/${userId}`;
    const { response } = yield call(PATCH, updateProfileUrl, action.payload);
    yield put(UserActions.editProfileSuccess({
      updatedUser: response.data,
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(UserActions.editProfileFailure(msgError));
  }
}

export default function* authSagas() {
  yield all([fork(takeLatest, UserActions.GET_ALL_USER, getAllUser)]);
  yield all([fork(takeLatest, UserActions.GET_SINGLE_USER, getSingleUser)]);
  yield all([fork(takeLatest, UserActions.EDITPROFILE, editProfile)]);
  yield all([fork(takeLatest, UserActions.PROFILE, profile)]);
}
