import ip from "icepick";
import { AuthActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];
const initialState = {
  signupRequestStatus: null,
  signupError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AuthActions.signup_REQUEST:
      return ip.setIn(state, ["signupRequestStatus"], requestStatus[0]);

    case AuthActions.signup_FAILURE:
      state = ip.setIn(state, ["signupError"], action.payload);
      return ip.setIn(state, ["signupRequestStatus"], requestStatus[1]);

    case AuthActions.signup_SUCCESS:
      return ip.setIn(state, ["signupRequestStatus"], requestStatus[2]);

    default:
      return state;
  }
}
