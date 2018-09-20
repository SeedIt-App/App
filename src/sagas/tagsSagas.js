import { put, call, all, fork, takeLatest, select } from "redux-saga/effects";
import { TagsActions, AuthActions } from "../actions";
import { GET, POST, PUT, PATCH } from "../api";
import idx from "idx";

// State for get all tags list
function* getAllTagsList(action) {
  yield put(TagsActions.getAllTagsListRequest());
  try {
    const getAllTagsListURL = "/tags?select=*&sort=asc";
    const { response } = yield call(GET, getAllTagsListURL);
    yield put(
      TagsActions.getAllTagsListSuccess({
        getAllTagsLists: response.data
      })
    );
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(TagsActions.getAllTagsListFailure(msgError));
  }
}

// State for Get create new tag
function* createNewTag(action) {
  yield put(TagsActions.createNewTagRequest());
  try {
    const createNewTagURL = "/tags";
    const { response } = yield call(POST, createNewTagURL, action.payload);
    console.log(response, "pR");
    yield put(
      TagsActions.createNewTagSuccess({
        getAllPosts: response.data
      })
    );
  } catch (error) {
    console.log(error);
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(TagsActions.createNewTagFailure(msgError));
  }
}

// State for Get single tag
function* getSingleTag(action) {
  yield put(TagsActions.getSingleTagRequest());
  try {
    const getSingleTagURL = "/tags/${tagId}";
    const { response } = yield call(GET, getSingleTagURL);
    yield put(
      TagsActions.getSingleTagSuccess({
        getAllTags: response.data
      })
    );
  } catch (error) {
    console.log(error);
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(TagsActions.getSingleTagFailure(msgError));
  }
}

// State for Update(patch) tag name
function* updateTagName(action) {
  yield put(TagsActions.updateTagNameRequest());
  try {
    const updateTagNameUrl = "/tags/${tagId}";
    const { response } = yield call(GET, updateTagNameUrl);
    yield put(
      TagsActions.updateTagNameSuccess({
        updateTagName: response.data
      })
    );
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(TagsActions.updateTagNameFailure(msgError));
  }
}

// add new comment to post
function* deleteTag(action) {
  yield put(TagsActions.deleteTagRequest());
  try {
    const deleteTagUrl = "/tags/${tagId}";
    const { response } = yield call(DELETE, deleteTagUrl);
    yield put(TagsActions.deleteTagSuccess());
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(TagsActions.deleteTagFailure(msgError));
  }
}

// get comments list
function* followTag(action) {
  yield put(TagsActions.followTagRequest());
  try {
    const followTagUrl = "/tags/${tagId}/follow";
    const { response } = yield call(PATCH, followTagUrl);
    yield put(TagsActions.followTagSuccess());
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(TagsActions.followTagFailure(msgError));
  }
}

// State for all tag followers list
function* getAllFollowersTag(action) {
  yield put(TagsActions.getAllFollowersTagRequest());
  try {
    const getAllFollowersTagURL = "/posts/${postId}/comment/${commentId}";
    const { response } = yield call(
      PATCH,
      getAllFollowersTagURL,
      action.payload
    );
    yield put(
      TagsActions.getAllFollowersTagSuccess({
        followTag: response.data
      })
    );
  } catch (error) {
    console.log(error);
    let msgError = error;
    if (error.data) {
      msgError = error.data.message;
    }
    yield put(TagsActions.getAllFollowersTagFailure(msgError));
  }
}

export default function* authSagas() {
  yield all([fork(takeLatest, TagsActions.GET_ALL_TAGS_LIST, getAllTagsList)]);
  yield all([fork(takeLatest, TagsActions.CREATE_NEW_TAG, createNewTag)]);
  yield all([fork(takeLatest, TagsActions.GET_SINGLE_TAG, getSingleTag)]);
  yield all([fork(takeLatest, TagsActions.UPDATE_TAG_NAME, updateTagName)]);
  yield all([fork(takeLatest, TagsActions.DELETE_TAG, deleteTag)]);
  yield all([fork(takeLatest, TagsActions.FOLLOW_TAG, followTag)]);
  yield all([
    fork(takeLatest, TagsActions.GET_ALL_FOLLOWERS_TAG, getAllFollowersTag)
  ]);
}
