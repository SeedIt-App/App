import ip from 'icepick';
import { NewsFeedActions } from '../actions';

const requestStatus = ['REQUESTING', 'FAILED', 'SUCCESS'];
const initialState = {
  userNewsFeed : null,
  guestUserNewsFeed : null,
  userNewsFeedRequestStatus: null,
  userNewsFeedErrorStatus: null,
  guestUserNewsFeedRequestStatus: null,
  guestUserNewsFeedErrorStatus : null,
};

// user news feed
export default function (state = initialState, action) {
  switch (action.type) {
    case NewsFeedActions.USER_NEWS_FEED_REQUEST:
      return ip.setIn(state, ['userNewsFeedRequestStatus'], requestStatus[0]);

    case NewsFeedActions.USER_NEWS_FEED_FAILURE:
      state = ip.setIn(state, ['userNewsFeedErrorStatus'], action.payload);
      return ip.setIn(state, ['userNewsFeedRequestStatus'], requestStatus[1]);

    case NewsFeedActions.USER_NEWS_FEED_SUCCESS:
      const { userNewsFeed } = action.payload;
      state = ip.setIn(state, ['userNewsFeed'], userNewsFeed);
      return ip.setIn(state, ['userNewsFeedRequestStatus'], requestStatus[2]);

    // get GUEST_USER_NEWS_FEED
    case NewsFeedActions.GUEST_USER_NEWS_FEED_REQUEST:
      return ip.setIn(state, ['guestUserNewsFeedRequestStatus'], requestStatus[0]);

    case NewsFeedActions.GUEST_USER_NEWS_FEED_FAILURE:
      state = ip.setIn(state, ['guestUserNewsFeedErrorStatus'], action.payload);
      return ip.setIn(state, ['guestUserNewsFeedRequestStatus'], requestStatus[1]);

    case NewsFeedActions.GUEST_USER_NEWS_FEED_SUCCESS:
     const { guestUserNewsFeed } = action.payload;
      state = ip.setIn(state, ['guestUserNewsFeed'], guestUserNewsFeed);
      return ip.setIn(state, ['guestUserNewsFeedRequestStatus'], requestStatus[2]);

    default:
      return state;
  }
}


