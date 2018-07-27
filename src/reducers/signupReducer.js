import ip from "icepick";
import { AuthActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];
const initialState = {
  signupRequestStatus: null,
  errorData : null,
  signupErrorStatus: null,
  googleSignupRequestStatus : null,
  googleSignupErrorStatus : null,
};

export default function(state = initialState, action) {
// state signup user

  switch (action.type) {
    case AuthActions.SIGNUP_REQUEST:
      return ip.setIn(state, ["signupRequestStatus"], requestStatus[0]);

    case AuthActions.SIGNUP_FAILURE:
      state = ip.setIn(state, ["errorData"], action.payload);
      return ip.setIn(state, ["signupRequestStatus"], requestStatus[1]);

    case AuthActions.SIGNUP_SUCCESS:
      return ip.setIn(state, ["signupRequestStatus"], requestStatus[2]);

    default:
      return state;
  }
}
