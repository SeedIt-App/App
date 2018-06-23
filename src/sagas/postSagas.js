import { put, call, all, fork, takeLatest, select } from 'redux-saga/effects';
import { PostActions, AuthActions } from '../actions';
import { GET, POST, PUT, PATCH } from '../api';
import idx from 'idx';

// create post
function* createPost(action) {
  yield put(PostActions.createPostRequest());
  try {
    const createPostURL = "/posts";
    const { response } = yield call(POST, createPostURL,  action.payload);
    yield put(PostActions.createPostSuccess({
      createPosts : response.data
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(PostActions.createPostFailure(msgError));
  }
} 

// get all posts
function* getPosts(action) {
  yield put(PostActions.getPostsRequest());
  try {
    const getPostsURL = '/posts?select=text,subscribers,comments,tags&filter[role]=user&order=createdAt&sort=desc&page=1&perPage=5';
    const { response } = yield call(GET, getPostsURL);
    console.log(response, 'pR');
    yield put(PostActions.getPostsSuccess({
      getAllPosts: response.data
    }));
  } catch (error) {
    console.log(error);
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(PostActions.getPostsFailure(msgError));
  }
}

// update(patch) water post
function* updateWaterPost(action) {
  yield put(PostActions.updateWaterPostRequest());
  try {
    const updateWaterURL = '/posts/${postId}/water';
    const { response } = yield call(GET, updateWaterURL);
    console.log(response, 'pR');
    yield put(PostActions.updateWaterPostSuccess({
      updateWaterToPost: response.data,
    }));
  } catch (error) {
    console.log(error);
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(PostActions.updateWaterPostFailure(msgError));
  }
}

// get water posts
function* getWaterPosts(action) {
  yield put(PostActions.getWaterPostsRequest());
  try {
    const getWaterPostsUrl = '/posts/${postId}/water';
    const { response } = yield call(GET, getWaterPostsUrl);
    yield put(PostActions.getWaterPostsSuccess({
      getWaterPosts : response.data,
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(PostActions.getWaterPostsFailure(msgError));
  }
}

// add new comment to post
function* addNewCommentToPost(action) {
  yield put(PostActions.addNewCommentToPostRequest());
  try {
    const postId = action.payload;
    const newCommentToPostsUrl = '/posts/${postId}/comment';
    const { response } = yield call(PATCH, newCommentToPostsUrl, action.payload);
    yield put(PostActions.addNewCommentToPostSuccess({
      newCommentToPosts: response.data,
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(PostActions.addNewCommentToPostFailure(msgError));
  }
}
// get comments list
function* getCommentsList(action) {
  yield put(PostActions.getCommentsListRequest());
  try {
    const getFollowingsUrl = '/users/followings?select=firstName,lastName,email,userName,password&filter[userName]=${username}&page=1&perPage=5';
    const { response } = yield call(GET, getFollowingsUrl);
    yield put(PostActions.getCommentsListSuccess({
      allCommentsList : response.data,
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(PostActions.getCommentsListFailure(msgError));
  }
}

// patch call to reply on the post comment
function* replyToPostComment(action) {
  yield put(PostActions.replyToPostCommentRequest());
  try {
    const replytopostURL = '/posts/${postId}/comment/${commentId}';
    const { response } = yield call(PATCH, replytopostURL, action.payload);
    yield put(PostActions.replyToPostCommentSuccess({
      replyToThePostComment : response.data,
    }));
  } catch (error) {
    console.log(error);
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(PostActions.replyToPostCommentFailure(msgError));
  }
}

// get all reply on the comment
function* getAllRplOnComment(action) {
  yield put(PostActions.getAllRplOnCommentRequest());
  try {
    const getAllRplOnCommentUrl = '/posts/${postId}/comment/${commentId}';
    const { response } = yield call(GET, getAllRplOnCommentUrl);
    yield put(PostActions.getAllRplOnCommentSuccess({
      getAllReplyOfComment: response.data,
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(PostActions.getAllRplOnCommentFailure(msgError));
  }
}

// User create post on the timiline
function* createPostOnTimeline(action) {
  yield put(PostActions.createPostOnTimelineRequest());
  try {
    const getFollowingsUrl = '/posts/timeline?select=text,waters,comments,levels,tags,subscribers,shares,spams,postedBy,createdAt';
    const { response } = yield call(GET, getFollowingsUrl);
    yield put(PostActions.createPostOnTimelineSuccess({
      userCreatedPostTimeline: response.data,
    }));
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(PostActions.createPostOnTimelineFailure(msgError));
  }
}

export default function* authSagas() {
  yield all([fork(takeLatest, PostActions.CREATE_POST, createPost)]);
  yield all([fork(takeLatest, PostActions.GET_POSTS, getPosts)]);
  yield all([fork(takeLatest, PostActions.UPDATE_WATER_POST, updateWaterPost)]);
  yield all([fork(takeLatest, PostActions.GET_WATER_POSTS, getWaterPosts)]);
  yield all([fork(takeLatest, PostActions.ADD_NEW_COMMENT_TO_POST, addNewCommentToPost)]);
  yield all([fork(takeLatest, PostActions.GET_COMMENT_LIST, getCommentsList)]);
  yield all([fork(takeLatest, PostActions.REPLY_TO_POST_COMMENT, replyToPostComment)]);
  yield all([fork(takeLatest, PostActions.GET_ALL_RPL_ON_COMMENT, getAllRplOnComment)]);
  yield all([fork(takeLatest, PostActions.CREATE_POST_ON_TIMELINE, createPostOnTimeline)]);
}
