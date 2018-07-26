import { createAction } from 'redux-actions';

// State for get all tags list process

export const GET_ALL_TAGS_LIST = 'TAGS/GET_ALL_TAGS_LIST';
export const GET_ALL_TAGS_LIST_REQUEST = 'TAGS/GET_ALL_TAGS_LIST_REQUEST';
export const GET_ALL_TAGS_LIST_SUCCESS = 'TAGS/GET_ALL_TAGS_LIST_SUCCESS';
export const GET_ALL_TAGS_LIST_FAILURE = 'TAGS/GET_ALL_TAGS_LIST_FAILURE';

export const getAllTagsList = createAction(GET_ALL_TAGS_LIST);
export const getAllTagsListRequest = createAction(GET_ALL_TAGS_LIST_REQUEST);
export const getAllTagsListSuccess = createAction(GET_ALL_TAGS_LIST_SUCCESS);
export const getAllTagsListFailure = createAction(GET_ALL_TAGS_LIST_FAILURE);

// State for Get create new tag process

export const CREATE_NEW_TAG = 'TAGS/CREATE_NEW_TAG';
export const CREATE_NEW_TAG_REQUEST = 'TAGS/CREATE_NEW_TAG_REQUEST';
export const CREATE_NEW_TAG_SUCCESS = 'TAGS/CREATE_NEW_TAG_SUCCESS';
export const CREATE_NEW_TAG_FAILURE = 'TAGS/CREATE_NEW_TAG_FAILURE';

export const createNewTag = createAction(CREATE_NEW_TAG);
export const createNewTagRequest = createAction(CREATE_NEW_TAG_REQUEST);
export const createNewTagSuccess = createAction(CREATE_NEW_TAG_SUCCESS);
export const createNewTagFailure = createAction(CREATE_NEW_TAG_FAILURE);

// State for Get single tag process

export const GET_SINGLE_TAG = 'TAGS/GET_SINGLE_TAG';
export const GET_SINGLE_TAG_REQUEST = 'TAGS/GET_SINGLE_TAG_REQUEST';
export const GET_SINGLE_TAG_SUCCESS = 'TAGS/GET_SINGLE_TAG_SUCCESS';
export const GET_SINGLE_TAG_FAILURE = 'TAGS/GET_SINGLE_TAG_FAILURE';

export const getSingleTag = createAction(GET_SINGLE_TAG);
export const getSingleTagRequest = createAction(GET_SINGLE_TAG_REQUEST);
export const getSingleTagSuccess = createAction(GET_SINGLE_TAG_SUCCESS);
export const getSingleTagFailure = createAction(GET_SINGLE_TAG_FAILURE);

// State for Update(patch) tag name process

export const UPDATE_TAG_NAME = 'TAGS/UPDATE_TAG_NAME';
export const UPDATE_TAG_NAME_REQUEST = 'TAGS/UPDATE_TAG_NAME_REQUEST';
export const UPDATE_TAG_NAME_SUCCESS = 'TAGS/UPDATE_TAG_NAME_SUCCESS';
export const UPDATE_TAG_NAME_FAILURE = 'TAGS/UPDATE_TAG_NAME_FAILURE';

export const updateTagName = createAction(UPDATE_TAG_NAME);
export const updateTagNameRequest = createAction(UPDATE_TAG_NAME_REQUEST);
export const updateTagNameSuccess = createAction(UPDATE_TAG_NAME_SUCCESS);
export const updateTagNameFailure = createAction(UPDATE_TAG_NAME_FAILURE);

// State for delete tag process

export const DELETE_TAG = 'TAGS/DELETE_TAG';
export const DELETE_TAG_REQUEST = 'TAGS/DELETE_TAG_REQUEST';
export const DELETE_TAG_SUCCESS = 'TAGS/DELETE_TAG_SUCCESS';
export const DELETE_TAG_FAILURE = 'TAGS/DELETE_TAG_FAILURE';

export const deleteTag = createAction(DELETE_TAG);
export const deleteTagRequest = createAction(DELETE_TAG_REQUEST);
export const deleteTagSuccess = createAction(DELETE_TAG_SUCCESS);
export const deleteTagFailure = createAction(DELETE_TAG_FAILURE);

// State for follow the tag process

export const FOLLOW_TAG = 'TAGS/FOLLOW_TAG';
export const FOLLOW_TAG_REQUEST = 'TAGS/FOLLOW_TAG_REQUEST';
export const FOLLOW_TAG_SUCCESS = 'TAGS/FOLLOW_TAG_SUCCESS';
export const FOLLOW_TAG_FAILURE = 'TAGS/FOLLOW_TAG_FAILURE';

export const followTag = createAction(FOLLOW_TAG);
export const followTagRequest = createAction(FOLLOW_TAG_REQUEST);
export const followTagSuccess = createAction(FOLLOW_TAG_SUCCESS);
export const followTagFailure = createAction(FOLLOW_TAG_FAILURE);

// State for all tag followers list process

export const GET_ALL_FOLLOWERS_TAG = 'TAGS/GET_ALL_FOLLOWERS_TAG';
export const GET_ALL_FOLLOWERS_TAG_REQUEST =
  'TAGS/GET_ALL_FOLLOWERS_TAG_REQUEST';
export const GET_ALL_FOLLOWERS_TAG_SUCCESS =
  'TAGS/GET_ALL_FOLLOWERS_TAG_SUCCESS';
export const GET_ALL_FOLLOWERS_TAG_FAILURE =
  'TAGS/GET_ALL_FOLLOWERS_TAG_FAILURE';

export const getAllFollowersTag = createAction(GET_ALL_FOLLOWERS_TAG);
export const getAllFollowersTagRequest = createAction(GET_ALL_FOLLOWERS_TAG_REQUEST);
export const getAllFollowersTagSuccess = createAction(GET_ALL_FOLLOWERS_TAG_SUCCESS);
export const getAllFollowersTagFailure = createAction(GET_ALL_FOLLOWERS_TAG_FAILURE);
