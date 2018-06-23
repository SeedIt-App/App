import { createAction } from 'redux-actions';
// State for Get create post

	export const CREATE_POST = "POST/CREATE_POST";
	export const CREATE_POST_REQUEST = "POST/CREATE_POST_REQUEST";
	export const CREATE_POST_SUCCESS = "POST/CREATE_POST_SUCCESS";
	export const CREATE_POST_FAILURE = "POST/CREATE_POST_FAILURE";

	export const createPost = createAction(CREATE_POST);
	export const createPostRequest = createAction(CREATE_POST_REQUEST);
	export const createPostSuccess = createAction(CREATE_POST_SUCCESS);
	export const createPostFailure = createAction(CREATE_POST_FAILURE);

// State for Get posts

	export const GET_POSTS = "POST/GET_POSTS";
	export const GET_POSTS_REQUEST = "POST/GET_POSTS_REQUEST";
	export const GET_POSTS_SUCCESS = "POST/GET_POSTS_SUCCESS";
	export const GET_POSTS_FAILURE = "POST/GET_POSTS_FAILURE";

	export const getPosts = createAction(GET_POSTS);
	export const getPostsRequest = createAction(GET_POSTS_REQUEST);
	export const getPostsSuccess = createAction(GET_POSTS_SUCCESS);
	export const getPostsFailure = createAction(GET_POSTS_FAILURE);

// Get water posts

	export const GET_WATER_POSTS = 'POST/GET_WATER_POSTS';
	export const GET_WATER_POSTS_REQUEST = 'POST/GET_WATER_POSTS_REQUEST';
	export const GET_WATER_POSTS_SUCCESS = 'POST/GET_WATER_POSTS_SUCCESS';
	export const GET_WATER_POSTS_FAILURE = 'POST/GET_WATER_POSTS_FAILURE';

	export const getWaterPosts = createAction(GET_WATER_POSTS);
	export const getWaterPostsRequest = createAction(GET_WATER_POSTS_REQUEST);
	export const getWaterPostsSuccess = createAction(GET_WATER_POSTS_SUCCESS);
	export const getWaterPostsFailure = createAction(GET_WATER_POSTS_FAILURE);

// Update water post

	export const UPDATE_WATER_POST = 'POST/UPDATE_WATER_POST';
	export const UPDATE_WATER_POST_REQUEST = 'POST/UPDATE_WATER_POST_REQUEST';
	export const UPDATE_WATER_POST_SUCCESS = 'POST/UPDATE_WATER_POST_SUCCESS';
	export const UPDATE_WATER_POST_FAILURE = 'POST/UPDATE_WATER_POST_FAILURE';

	export const updateWaterPost = createAction(UPDATE_WATER_POST);
	export const updateWaterPostRequest = createAction(UPDATE_WATER_POST_REQUEST);
	export const updateWaterPostSuccess = createAction(UPDATE_WATER_POST_SUCCESS);
	export const updateWaterPostFailure = createAction(UPDATE_WATER_POST_FAILURE);

// add New Comment To Post

	export const ADD_NEW_COMMENT_TO_POST = 'POST/ADD_NEW_COMMENT_TO_POST';
	export const ADD_NEW_COMMENT_TO_POST_REQUEST = 'POST/ADD_NEW_COMMENT_TO_POST_REQUEST';
	export const ADD_NEW_COMMENT_TO_POST_SUCCESS = 'POST/ADD_NEW_COMMENT_TO_POST_SUCCESS';
	export const ADD_NEW_COMMENT_TO_POST_FAILURE = 'POST/ADD_NEW_COMMENT_TO_POST_FAILURE';

	export const addNewCommentToPost = createAction(ADD_NEW_COMMENT_TO_POST);
	export const addNewCommentToPostRequest = createAction(ADD_NEW_COMMENT_TO_POST_REQUEST);
	export const addNewCommentToPostSuccess = createAction(ADD_NEW_COMMENT_TO_POST_SUCCESS);
	export const addNewCommentToPostFailure = createAction(ADD_NEW_COMMENT_TO_POST_FAILURE);

// get comments list

	export const GET_COMMENT_LIST = 'POST/GET_COMMENT_LIST';
	export const GET_COMMENT_LIST_REQUEST = 'POST/GET_COMMENT_LIST_REQUEST';
	export const GET_COMMENT_LIST_SUCCESS = 'POST/GET_COMMENT_LIST_SUCCESS';
	export const GET_COMMENT_LIST_FAILURE = 'POST/GET_COMMENT_LIST_FAILURE';

	export const getCommentsList = createAction(GET_COMMENT_LIST);
	export const getCommentsListRequest = createAction(GET_COMMENT_LIST_REQUEST);
	export const getCommentsListSuccess = createAction(GET_COMMENT_LIST_SUCCESS);
	export const getCommentsListFailure = createAction(GET_COMMENT_LIST_FAILURE);

// patch call to reply on the post comment

	export const REPLY_TO_POST_COMMENT = 'POST/REPLY_TO_POST_COMMENT';
	export const REPLY_TO_POST_COMMENT_REQUEST = 'POST/REPLY_TO_POST_COMMENT_REQUEST';
	export const REPLY_TO_POST_COMMENT_SUCCESS = 'POST/REPLY_TO_POST_COMMENT_SUCCESS';
	export const REPLY_TO_POST_COMMENT_FAILURE = 'POST/REPLY_TO_POST_COMMENT_FAILURE';

	export const replyToPostComment = createAction(REPLY_TO_POST_COMMENT);
	export const replyToPostCommentRequest = createAction(REPLY_TO_POST_COMMENT_REQUEST);
	export const replyToPostCommentSuccess = createAction(REPLY_TO_POST_COMMENT_SUCCESS);
	export const replyToPostCommentFailure = createAction(REPLY_TO_POST_COMMENT_FAILURE);

// get all reply on the comment

	export const GET_ALL_RPL_ON_COMMENT = 'POST/GET_ALL_RPL_ON_COMMENT';
	export const GET_ALL_RPL_ON_COMMENT_REQUEST = 'POST/GET_ALL_RPL_ON_COMMENT_REQUEST';
	export const GET_ALL_RPL_ON_COMMENT_SUCCESS = 'POST/GET_ALL_RPL_ON_COMMENT_SUCCESS';
	export const GET_ALL_RPL_ON_COMMENT_FAILURE = 'POST/GET_ALL_RPL_ON_COMMENT_FAILURE';

	export const getAllRplOnComment = createAction(GET_ALL_RPL_ON_COMMENT);
	export const getAllRplOnCommentRequest = createAction(GET_ALL_RPL_ON_COMMENT_REQUEST);
	export const getAllRplOnCommentSuccess = createAction(GET_ALL_RPL_ON_COMMENT_SUCCESS);
	export const getAllRplOnCommentFailure = createAction(GET_ALL_RPL_ON_COMMENT_FAILURE);

// User create post on the timiline

	export const CREATE_POST_ON_TIMELINE = 'POST/CREATE_POST_ON_TIMELINE';
	export const CREATE_POST_ON_TIMELINE_REQUEST = 'POST/CREATE_POST_ON_TIMELINE_REQUEST';
	export const CREATE_POST_ON_TIMELINE_SUCCESS = 'POST/CREATE_POST_ON_TIMELINE_SUCCESS';
	export const CREATE_POST_ON_TIMELINE_FAILURE = 'POST/CREATE_POST_ON_TIMELINE_FAILURE';

	export const createPostOnTimeline = createAction(CREATE_POST_ON_TIMELINE);
	export const createPostOnTimelineRequest = createAction(CREATE_POST_ON_TIMELINE_REQUEST);
	export const createPostOnTimelineSuccess = createAction(CREATE_POST_ON_TIMELINE_SUCCESS);
	export const createPostOnTimelineFailure = createAction(CREATE_POST_ON_TIMELINE_FAILURE);

