import { put, call, all, fork, takeLatest, select } from 'redux-saga/effects';
import { NewsFeedActions } from '../actions';
import { GET } from '../api';
import idx from 'idx';

// news feed by logged in user
function* userNewsFeed(action) {
  yield put(NewsFeedActions.userNewsFeedRequest());
  try {
    const useruserNewsFeedURL = '/feeds';
    const { response } = yield call(GET, useruserNewsFeedURL);
    console.log(response, 'pR');
    yield put(NewsFeedActions.userNewsFeedSuccess({
      userNewsFeed: response.data,
    }));
  } catch (error) {
    console.log(error);
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(NewsFeedActions.userNewsFeedFailure(msgError));
  }
}

// news feed for guest user
function* guestUserNewsFeed(action) {
  yield put(NewsFeedActions.guestUserNewsFeedRequest());
  try {
    const updateuserNewsFeedUrl = '/feeds/guest';
    const { response } = yield call(GET, updateuserNewsFeedUrl);
    yield put(NewsFeedActions.guestUserNewsFeedSuccess({
      guestUserNewsFeed: response.data,
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(NewsFeedActions.guestUserNewsFeedFailure(msgError));
  }
}

export default function* authSagas() {
  yield all([fork(takeLatest, NewsFeedActions.USER_NEWS_FEED, userNewsFeed)]);
  yield all([
    fork(takeLatest, NewsFeedActions.GUEST_USER_NEWS_FEED, guestUserNewsFeed),
  ]);
}
