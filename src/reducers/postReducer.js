import ip from 'icepick';
import { PostActions } from '../actions';

const requestStatus = ['REQUESTING', 'FAILED', 'SUCCESS'];
const initialState = {
  createdPosts : null,
  getAllPosts : null,
  getWaterPosts : null,
  updateWaterToPost : null,
  newCommentToPosts : null,
  allCommentsList : null,
  replyToThePostComment : null,
  getAllReplyOfComment : null,
  userCreatedPostTimeline : null, 
  createPostRequestStatus: null,
  createPostErrorStatus: null,
  getPostsRequestStatus: null,
  getPostsErrorStatus : null,
  getWaterPostsRequestStatus: null,
  getWaterPostsErrorStatus : null,
  updateWaterPostRequestStatus : null,
  updateWaterPostErrorStatus: null,
  addNewCommentToPostRequestStatus : null,
  addNewCommentToPostErrorStatus : null,
  getCommentListRequestStatus : null,
  getCommentListErrorStatus : null,
  rplToPostCommentRequestStatus :null,
  rplToPostCommentErrorStatus : null,
  getAllRplOnCommentRequestStatus : null,
  getAllRplOnCommentErrorStatus : null,
  createPostOnTimelineRequestStatus : null,
  createPostOnTimelineErrorStatus : null
};

export default function (state = initialState, action) {

// create post
  switch (action.type) {
    case PostActions.CREATE_POST_REQUEST:
      return ip.setIn(state, ['createPostRequestStatus'], requestStatus[0]);

    case PostActions.CREATE_POST_FAILURE:
      state = ip.setIn(state, ['createPostErrorStatus'], action.payload);
      return ip.setIn(state, ['createPostRequestStatus'], requestStatus[1]);

    case PostActions.CREATE_POST_SUCCESS:
     const { createPosts } = action.payload;
      state = ip.setIn(state, ['createdPosts'], createPosts);
      return ip.setIn(state, ['createPostRequestStatus'], requestStatus[2]);

// get all posts
    case PostActions.GET_POSTS_REQUEST:
      return ip.setIn(state, ['getPostsRequestStatus'], requestStatus[0]);

    case PostActions.GET_POSTS_FAILURE:
      state = ip.setIn(state, ['getPostsErrorStatus'], action.payload);
      return ip.setIn(state, ['getPostsRequestStatus'], requestStatus[1]);

    case PostActions.GET_POSTS_SUCCESS:
     const { getAllPosts } = action.payload;
      state = ip.setIn(state, ['getAllPosts'], getAllPosts);
      return ip.setIn(state, ['getPostsRequestStatus'], requestStatus[2]);

// get water posts
    case PostActions.GET_WATER_POSTS_REQUEST:
      return ip.setIn(state, ['getWaterPostsRequestStatus'], requestStatus[0]);

    case PostActions.GET_WATER_POSTS_FAILURE:
      state = ip.setIn(state, ['getWaterPostsErrorStatus'], action.payload);
      return ip.setIn(state, ['getWaterPostsRequestStatus'], requestStatus[1]);

    case PostActions.GET_WATER_POSTS_SUCCESS:
      const { getWaterPosts } = action.payload;
      state = ip.setIn(state, ['getWaterPosts'], getWaterPosts);
      return ip.setIn(state, ['getWaterPostsRequestStatus'], requestStatus[2]);

// update(patch) water post
    case PostActions.UPDATE_WATER_POST_REQUEST:
      return ip.setIn(state, ['updateWaterPostRequestStatus'], requestStatus[0]);

    case PostActions.UPDATE_WATER_POST_FAILURE:
      state = ip.setIn(state, ['updateWaterPostErrorStatus'], action.payload);
      return ip.setIn(state, ['updateWaterPostRequestStatus'], requestStatus[1]);

    case PostActions.UPDATE_WATER_POST_SUCCESS:
      const { updateWaterToPost } = action.payload;
      state = ip.setIn(state, ['updateWaterToPost'], updateWaterToPost);
      return ip.setIn(state, ['updateWaterPostRequestStatus'], requestStatus[2]);

// add new comment to post
    case PostActions.ADD_NEW_COMMENT_TO_POST_REQUEST:
      return ip.setIn(state, ['addNewCommentToPostRequestStatus'], requestStatus[0]);

    case PostActions.ADD_NEW_COMMENT_TO_POST_FAILURE:
      state = ip.setIn(state, ['addNewCommentToPostErrorStatus'], action.payload);
      return ip.setIn(state, ['addNewCommentToPostRequestStatus'], requestStatus[1]);

    case PostActions.ADD_NEW_COMMENT_TO_POST_SUCCESS:
      const { newCommentToPosts } = action.payload;
      state = ip.setIn(state, ['newCommentToPosts'], newCommentToPosts);
      return ip.setIn(state, ['addNewCommentToPostRequestStatus'], requestStatus[2]);

// get comments list
    case PostActions.GET_COMMENT_LIST_REQUEST:
      return ip.setIn(state, ['getCommentListRequestStatus'], requestStatus[0]);

    case PostActions.GET_COMMENT_LIST_FAILURE:
      state = ip.setIn(state, ['getCommentListErrorStatus'], action.payload);
      return ip.setIn(state, ['getCommentListRequestStatus'], requestStatus[1]);

    case PostActions.GET_COMMENT_LIST_SUCCESS:
      const { allCommentsList } = action.payload;
      state = ip.setIn(state, ['allCommentsList'], allCommentsList);
      return ip.setIn(state, ['getCommentListRequestStatus'], requestStatus[2]);

// patch call to reply on the post comment
    case PostActions.REPLY_TO_POST_COMMENT_REQUEST:
      return ip.setIn(state, ['rplToPostCommentRequestStatus'], requestStatus[0]);

    case PostActions.REPLY_TO_POST_COMMENT_FAILURE:
      state = ip.setIn(state, ['rplToPostCommentErrorStatus'], action.payload);
      return ip.setIn(state, ['rplToPostCommentRequestStatus'], requestStatus[1]);

    case PostActions.REPLY_TO_POST_COMMENT_SUCCESS:
      const { replyToThePostComment } = action.payload;
      state = ip.setIn(state, ['replyToThePostComment'], replyToThePostComment);
      return ip.setIn(state, ['rplToPostCommentRequestStatus'], requestStatus[2]);

// get all reply on the comment
    case PostActions.GET_ALL_RPL_ON_COMMENT_REQUEST:
      return ip.setIn(state, ['getAllRplOnCommentRequestStatus'], requestStatus[0]);

    case PostActions.GET_ALL_RPL_ON_COMMENT_FAILURE:
      state = ip.setIn(state, ['getAllRplOnCommentErrorStatus'], action.payload);
      return ip.setIn(state, ['getAllRplOnCommentRequestStatus'], requestStatus[1]);

    case PostActions.GET_ALL_RPL_ON_COMMENT_SUCCESS:
      const { getAllReplyOfComment } = action.payload;
      state = ip.setIn(state, ['getAllReplyOfComment'], getAllReplyOfComment);
      return ip.setIn(state, ['getAllRplOnCommentRequestStatus'], requestStatus[2]);

// User create post on the timiline
    case PostActions.CREATE_POST_ON_TIMELINE_REQUEST:
      return ip.setIn(state, ['createPostOnTimelineRequestStatus'], requestStatus[0]);

    case PostActions.CREATE_POST_ON_TIMELINE_FAILURE:
      state = ip.setIn(state, ['createPostOnTimelineErrorStatus'], action.payload);
      return ip.setIn(state, ['createPostOnTimelineRequestStatus'], requestStatus[1]);

    case PostActions.CREATE_POST_ON_TIMELINE_SUCCESS:
      const { userCreatedPostTimeline } = action.payload;
      state = ip.setIn(state, ['userCreatedPostTimeline'], userCreatedPostTimeline);
      return ip.setIn(state, ['createPostOnTimelineRequestStatus'], requestStatus[2]);

    default:
      return state;
  }
}
