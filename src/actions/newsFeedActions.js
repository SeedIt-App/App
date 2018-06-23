import { createAction } from 'redux-actions';

// State for user news feed

export const USER_NEWS_FEED = "NEWSFEED/USER_NEWS_FEED";
export const USER_NEWS_FEED_REQUEST = "NEWSFEED/USER_NEWS_FEED_REQUEST";
export const USER_NEWS_FEED_SUCCESS = "NEWSFEED/USER_NEWS_FEED_SUCCESS";
export const USER_NEWS_FEED_FAILURE = "NEWSFEED/USER_NEWS_FEED_FAILURE";

export const userNewsFeed = createAction(USER_NEWS_FEED);
export const userNewsFeedRequest = createAction(USER_NEWS_FEED_REQUEST);
export const userNewsFeedSuccess = createAction(USER_NEWS_FEED_SUCCESS);
export const userNewsFeedFailure = createAction(USER_NEWS_FEED_FAILURE);

// State for guest user newsfeed

export const GUEST_USER_NEWS_FEED = "NEWSFEED/GUEST_USER_NEWS_FEED";
export const GUEST_USER_NEWS_FEED_REQUEST = "NEWSFEED/GUEST_USER_NEWS_FEED_REQUEST";
export const GUEST_USER_NEWS_FEED_SUCCESS = "NEWSFEED/GUEST_USER_NEWS_FEED_SUCCESS";
export const GUEST_USER_NEWS_FEED_FAILURE = "NEWSFEED/GUEST_USER_NEWS_FEED_FAILURE";

export const guestUserNewsFeed = createAction(GUEST_USER_NEWS_FEED);
export const guestUserNewsFeedRequest = createAction(GUEST_USER_NEWS_FEED_REQUEST);
export const guestUserNewsFeedSuccess = createAction(GUEST_USER_NEWS_FEED_SUCCESS);
export const guestUserNewsFeedFailure = createAction(GUEST_USER_NEWS_FEED_FAILURE);

