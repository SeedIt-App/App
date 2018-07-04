import { put, call, all, fork, takeLatest, select } from 'redux-saga/effects';
import { FollowActions, AuthActions } from '../actions';
import { GET, POST, PUT, PATCH } from '../api';
import idx from 'idx';

function* followAnotherUser(action) {
  yield put(FollowActions.followAnotherUserRequest());
  try {
    const followUserURL = '/users/follow/${userID}';
    const { response } = yield call(GET, followUserURL);
    console.log(response, 'pR');
    yield put(FollowActions.followAnotherUserSuccess({
      followOUser: response.data,
    }));
  } catch (error) {
    console.log(error);
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(FollowActions.followAnotherUserFailure(msgError));
  }
}

function* getAllFollowers(action) {
  yield put(FollowActions.getAllFollowersRequest());
  try {
    const getFollowersUrl =
      '/users/followers?select=firstName,lastName,email,userName,password&page=1&perPage=5';
    const { response } = yield call(GET, getFollowersUrl);
    yield put(FollowActions.getAllFollowersSuccess({
      followers: response.data, 
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(FollowActions.getAllFollowersFailure(msgError));
  }
}

function* getAllUserFollowings(action) {
  yield put(FollowActions.getAllUserFollowingsRequest());
  try {
    const getFollowingsUrl =
      '/users/followings?select=firstName,lastName,email,userName,password&page=1&perPage=5';
    const { response } = yield call(GET, getFollowingsUrl);
    yield put(FollowActions.getAllUserFollowingsSuccess({
      followingUser: response.data,
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(FollowActions.getAllUserFollowingsFailure(msgError));
  }
}

export default function* authSagas() {
  yield all([
    fork(takeLatest, FollowActions.FOLLOW_ANOTHER_USER, followAnotherUser),
  ]);
  yield all([
    fork(takeLatest, FollowActions.GET_ALL_FOLLOWERS, getAllFollowers),
  ]);
  yield all([
    fork(takeLatest,FollowActions.GET_ALL_USER_FOLLOWINGS ,getAllUserFollowings),
  ]);
}
