import ip from "icepick";
import { TagsActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];
const initialState = {
  getAllTags: null,
  createdNewTag: null,
  getSingleTag: null,
  updatedTagName: null,
  getAllFollowersList: null,
  followTag: null,
  getAllTagsListRequestStatus: null,
  getAllTagsListErrorStatus: null,
  createNewTagRequestStatus: null,
  createNewTagErrorStatus: null,
  getSingleTagRequestStatus: null,
  getSingleTagErrorStatus: null,
  updateWaterPostRequestStatus: null,
  updateWaterPostErrorStatus: null,
  deleteTagRequestStatus: null,
  deleteTagErrorStatus: null,
  followTagRequestStatus: null,
  followTagErrorStatus: null,
  getAllFollowersTagRequestStatus: null,
  getAllFollowersTagErrorStatus: null
};

export default function(state = initialState, action) {
  switch (action.type) {

// State for get all tags list
    case TagsActions.GET_ALL_TAGS_LIST_REQUEST:
      return ip.setIn(state, ["getAllTagsListRequestStatus"], requestStatus[0]);

    case TagsActions.GET_ALL_TAGS_LIST_FAILURE:
      state = ip.setIn(state, ["getAllTagsListErrorStatus"], action.payload);
      return ip.setIn(state, ["getAllTagsListRequestStatus"], requestStatus[1]);

    case TagsActions.GET_ALL_TAGS_LIST_SUCCESS:
      const { getAllTagsLists } = action.payload;
      state = ip.setIn(state, ["getAllTags"], getAllTagsLists);
      return ip.setIn(state, ["getAllTagsListRequestStatus"], requestStatus[2]);

// State for Get create new tag
    case TagsActions.CREATE_NEW_TAG_REQUEST:
      return ip.setIn(state, ["createNewTagRequestStatus"], requestStatus[0]);

    case TagsActions.CREATE_NEW_TAG_FAILURE:
      state = ip.setIn(state, ["createNewTagErrorStatus"], action.payload);
      return ip.setIn(state, ["createNewTagRequestStatus"], requestStatus[1]);

    case TagsActions.CREATE_NEW_TAG_SUCCESS:
      const { createdNewTag } = action.payload;
      state = ip.setIn(state, ["createdNewTag"], createdNewTag);
      return ip.setIn(state, ["createNewTagRequestStatus"], requestStatus[2]);

// State for Get single tag
    case TagsActions.GET_SINGLE_TAG_REQUEST:
      return ip.setIn(state, ["getSingleTagRequestStatus"], requestStatus[0]);

    case TagsActions.GET_SINGLE_TAG_FAILURE:
      state = ip.setIn(state, ["getSingleTagErrorStatus"], action.payload);
      return ip.setIn(state, ["getSingleTagRequestStatus"], requestStatus[1]);

    case TagsActions.GET_SINGLE_TAG_SUCCESS:
      const { getSingleTag } = action.payload;
      state = ip.setIn(state, ["getSingleTag"], getSingleTag);
      return ip.setIn(state, ["getSingleTagRequestStatus"], requestStatus[2]);

// State for Update(patch) tag name
    case TagsActions.UPDATE_TAG_NAME_REQUEST:
      return ip.setIn(
        state,
        ["updateWaterPostRequestStatus"],
        requestStatus[0]
      );

    case TagsActions.UPDATE_TAG_NAME_FAILURE:
      state = ip.setIn(state, ["updateWaterPostErrorStatus"], action.payload);
      return ip.setIn(
        state,
        ["updateWaterPostRequestStatus"],
        requestStatus[1]
      );

    case TagsActions.UPDATE_TAG_NAME_SUCCESS:
      const { updateTagName } = action.payload;
      state = ip.setIn(state, ["updatedTagName"], updateTagName);
      return ip.setIn(
        state,
        ["updateWaterPostRequestStatus"],
        requestStatus[2]
      );

// State for delete tag
    case TagsActions.DELETE_TAG_REQUEST:
      return ip.setIn(state, ["deleteTagRequestStatus"], requestStatus[0]);

    case TagsActions.DELETE_TAG_FAILURE:
      state = ip.setIn(state, ["deleteTagErrorStatus"], action.payload);
      return ip.setIn(state, ["deleteTagRequestStatus"], requestStatus[1]);

    case TagsActions.DELETE_TAG_SUCCESS:
      return ip.setIn(state, ["deleteTagRequestStatus"], requestStatus[2]);

    // State for follow the tag
    case TagsActions.FOLLOW_TAG_REQUEST:
      return ip.setIn(state, ["followTagRequestStatus"], requestStatus[0]);

    case TagsActions.FOLLOW_TAG_FAILURE:
      state = ip.setIn(state, ["followTagErrorStatus"], action.payload);
      return ip.setIn(state, ["followTagRequestStatus"], requestStatus[1]);

    case TagsActions.FOLLOW_TAG_SUCCESS:
      const { followTag } = action.payload;
      state = ip.setIn(state, ["followTag"], followTag);
      return ip.setIn(state, ["followTagRequestStatus"], requestStatus[2]);

// State for all tag followers list

    case TagsActions.GET_ALL_FOLLOWERS_TAG_REQUEST:
      return ip.setIn(
        state,
        ["getAllFollowersTagRequestStatus"],
        requestStatus[0]
      );

    case TagsActions.GET_ALL_FOLLOWERS_TAG_FAILURE:
      state = ip.setIn(
        state,
        ["getAllFollowersTagErrorStatus"],
        action.payload
      );
      return ip.setIn(
        state,
        ["getAllFollowersTagRequestStatus"],
        requestStatus[1]
      );

    case TagsActions.GET_ALL_FOLLOWERS_TAG_SUCCESS:
      const { getAllFollowersList } = action.payload;
      state = ip.setIn(state, ["getAllFollowersList"], getAllFollowersList);
      return ip.setIn(
        state,
        ["getAllFollowersTagRequestStatus"],
        requestStatus[2]
      );

    default:
      return state;
  }
}
