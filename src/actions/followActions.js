import { createAction } from 'redux-actions';

// State for follow another user process

export const FOLLOW_ANOTHER_USER = 'FOLLOW/FOLLOW_ANOTHER_USER';
export const FOLLOW_ANOTHER_USER_REQUEST = 'FOLLOW/FOLLOW_ANOTHER_USER_REQUEST';
export const FOLLOW_ANOTHER_USER_SUCCESS = 'FOLLOW/FOLLOW_ANOTHER_USER_SUCCESS';
export const FOLLOW_ANOTHER_USER_FAILURE = 'FOLLOW/FOLLOW_ANOTHER_USER_FAILURE';

export const followAnotherUser = createAction(FOLLOW_ANOTHER_USER);
export const followAnotherUserRequest = createAction(FOLLOW_ANOTHER_USER_REQUEST);
export const followAnotherUserSuccess = createAction(FOLLOW_ANOTHER_USER_SUCCESS);
export const followAnotherUserFailure = createAction(FOLLOW_ANOTHER_USER_FAILURE);

// State for get all followers process

export const GET_ALL_FOLLOWERS = 'FOLLOW/GET_ALL_FOLLOWERS';
export const GET_ALL_FOLLOWERS_REQUEST = 'FOLLOW/GET_ALL_FOLLOWERS_REQUEST';
export const GET_ALL_FOLLOWERS_SUCCESS = 'FOLLOW/GET_ALL_FOLLOWERS_SUCCESS';
export const GET_ALL_FOLLOWERS_FAILURE = 'FOLLOW/GET_ALL_FOLLOWERS_FAILURE';

export const getAllFollowers = createAction(GET_ALL_FOLLOWERS);
export const getAllFollowersRequest = createAction(GET_ALL_FOLLOWERS_REQUEST);
export const getAllFollowersSuccess = createAction(GET_ALL_FOLLOWERS_SUCCESS);
export const getAllFollowersFailure = createAction(GET_ALL_FOLLOWERS_FAILURE);

// State for get all user followings process

export const GET_ALL_USER_FOLLOWINGS = 'FOLLOW/GET_ALL_USER_FOLLOWINGS';
export const GET_ALL_USER_FOLLOWINGS_REQUEST = 'FOLLOW/GET_ALL_USER_FOLLOWINGS_REQUEST';
export const GET_ALL_USER_FOLLOWINGS_SUCCESS = 'FOLLOW/GET_ALL_USER_FOLLOWINGS_SUCCESS';
export const GET_ALL_USER_FOLLOWINGS_FAILURE = 'FOLLOW/GET_ALL_USER_FOLLOWINGS_FAILURE';

export const getAllUserFollowings = createAction(GET_ALL_USER_FOLLOWINGS);
export const getAllUserFollowingsRequest = createAction(GET_ALL_USER_FOLLOWINGS_REQUEST);
export const getAllUserFollowingsSuccess = createAction(GET_ALL_USER_FOLLOWINGS_SUCCESS);
export const getAllUserFollowingsFailure = createAction(GET_ALL_USER_FOLLOWINGS_FAILURE);
