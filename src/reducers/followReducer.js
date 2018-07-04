import ip from 'icepick';
import { FollowActions } from '../actions';

const requestStatus = ['REQUESTING', 'FAILED', 'SUCCESS'];
const initialState = {
  followOthrUser: null,
  followers: null,
  followings: null,
  followAnotherUserRequestStatus: null,
  followAnotherUserErrorStatus: null,
  getAllFollowersRequestStatus: null,
  getAllFollowersErrorStatus: null,
  getAllUserFollowingsRequestStatus: null,
  getAllUserFollowingsErrorStatus: null,
};

// state follow another user
export default function (state = initialState, action) {
  switch (action.type) {
    case FollowActions.FOLLOW_ANOTHER_USER_REQUEST:
      return ip.setIn(
        state,
        ['followAnotherUserRequestStatus'],
        requestStatus[0],
      );

    case FollowActions.FOLLOW_ANOTHER_USER_FAILURE:
      state = ip.setIn(state, ['followAnotherUserErrorStatus'], action.payload);
      return ip.setIn(
        state,
        ['followAnotherUserRequestStatus'],
        requestStatus[1],
      );

    case FollowActions.FOLLOW_ANOTHER_USER_SUCCESS:
      const { followOUser } = action.payload;
      state = ip.setIn(state, ['followOthrUser'], followOUser);
      return ip.setIn(
        state,
        ['followAnotherUserRequestStatus'],
        requestStatus[2],
      );

    // State for get all followers

    case FollowActions.GET_ALL_FOLLOWERS_REQUEST:
      return ip.setIn(
        state,
        ['getAllFollowersRequestStatus'],
        requestStatus[0],
      );

    case FollowActions.GET_ALL_FOLLOWERS_FAILURE:
      state = ip.setIn(state, ['getAllFollowersErrorStatus'], action.payload);
      return ip.setIn(
        state,
        ['getAllFollowersRequestStatus'],
        requestStatus[1],
      );

    case FollowActions.GET_ALL_FOLLOWERS_SUCCESS:
      const { followers } = action.payload;
      state = ip.setIn(state, ['followers'], followers);
      return ip.setIn(
        state,
        ['getAllFollowersRequestStatus'],
        requestStatus[2],
      );

    // State for get all user followings
    case FollowActions.GET_ALL_USER_FOLLOWINGS_REQUEST:
      return ip.setIn(
        state,
        ['getAllUserFollowingsRequestStatus'],
        requestStatus[0],
      );

    case FollowActions.GET_ALL_USER_FOLLOWINGS_FAILURE:
      state = ip.setIn(
        state,
        ['getAllUserFollowingsErrorStatus'],
        action.payload,
      );
      return ip.setIn(
        state,
        ['getAllUserFollowingsRequestStatus'],
        requestStatus[1],
      );

    case FollowActions.GET_ALL_USER_FOLLOWINGS_SUCCESS:
      const { followingUser } = action.payload;
      state = ip.setIn(state, ['followings'], followingUser);
      return ip.setIn(
        state,
        ['getAllUserFollowingsRequestStatus'],
        requestStatus[2],
      );

    default:
      return state;
  }
}
