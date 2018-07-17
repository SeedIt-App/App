import ip from "icepick";
import { UserActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];
const initialState = {
  profileRequestStatus: null,
  profileErrorStatus: null,
  editProfileRequestStatus: null,
  editProfileErrorStatus: null,
  luser: null,
  updatedUser: null,
  getAllUserRequestStatus: null,
  getAllUserErrorStatus: null,
  allUsers: null,
  getSingleUserRequestStatus: null,
  getSingleUserErrorStatus: null,
  singleUser: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UserActions.PROFILE_REQUEST:
      return ip.setIn(state, ["profileRequestStatus"], requestStatus[0]);

    case UserActions.PROFILE_FAILURE:
      state = ip.setIn(state, ["profileErrorStatus"], action.payload);
      return ip.setIn(state, ["profileRequestStatus"], requestStatus[1]);

    case UserActions.PROFILE_SUCCESS:
      const { luser } = action.payload;
      state = ip.setIn(state, ["profileRequestStatus"], requestStatus[2]);
      state = ip.setIn(state, ["luser"], luser);
      return state;

    case UserActions.GET_ALL_USER_REQUEST:
      return ip.setIn(state, ["getAllUserRequestStatus"], requestStatus[0]);

    case UserActions.GET_ALL_USER_FAILURE:
      state = ip.setIn(state, ["getAllUserErrorStatus"], action.payload);
      return ip.setIn(state, ["getAllUserRequestStatus"], requestStatus[1]);

    case UserActions.GET_ALL_USER_SUCCESS:
      const { allUsers } = action.payload;
      state = ip.setIn(state, ["getAllUserRequestStatus"], requestStatus[2]);
      state = ip.setIn(state, ["allUsers"], allUsers);
      return state;

    case UserActions.GET_SINGLE_USER_REQUEST:
      return ip.setIn(
        state,
        ["getSingleUserUserRequestStatus"],
        requestStatus[0]
      );

    case UserActions.GET_SINGLE_USER_FAILURE:
      state = ip.setIn(state, ["getSingleUserErrorStatus"], action.payload);
      return ip.setIn(state, ["getSingleUserRequestStatus"], requestStatus[1]);

    case UserActions.GET_SINGLE_USER_SUCCESS:
      const { singleUserData } = action.payload;
      state = ip.setIn(state, ["getSingleUserRequestStatus"], requestStatus[2]);
      state = ip.setIn(state, ["singleUser"], singleUserData);
      return state;

    case UserActions.EDITPROFILE_REQUEST:
      return ip.setIn(state, ["editProfileRequestStatus"], requestStatus[0]);

    case UserActions.EDITPROFILE_FAILURE:
      state = ip.setIn(state, ["editProfileErrorStatus"], action.payload);
      return ip.setIn(state, ["editProfileRequestStatus"], requestStatus[1]);

    case UserActions.EDITPROFILE_SUCCESS:
      const { updatedUser } = action.payload;
      state = ip.setIn(state, ["editProfileRequestStatus"], requestStatus[2]);
      state = ip.setIn(state, ["updatedUser"], updatedUser);
      return state;

    default:
      return state;
  }
}
