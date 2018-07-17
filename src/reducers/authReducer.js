import ip from "icepick";
import { AuthActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];
const initialState = {
  isAuthorizedUser: false,
  user: null,
  authToken: null,
  refreshTokenRequestStatus: null,
  refreshTokenErrorStatus: null,
  forgotPasswordRequestStatus: null,
  forgotPasswordErrorStatus: null,
  resetPasswordRequestStatus: null,
  resetPasswordErrorStatus: null,
  token: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AuthActions.SET_AUTH_USER: {
      const { user, token } = action.payload;
      state = ip.setIn(state, ["isAuthorizedUser"], true);
      state = ip.setIn(state, ["user"], user);
      state = ip.setIn(state, ["authToken"], token.accessToken);
      state = ip.setIn(state, ["token"], token);
      return state;
    }

    case AuthActions.UPDATE_AUTH_USER: {
      const { token } = action.payload;
      state = ip.setIn(state, ["token"], token);
      return state;
    }

    //Refresh token
    case AuthActions.REFRESH_TOKEN_REQUEST:
      return ip.setIn(state, ["refreshTokenRequestStatus"], requestStatus[0]);

    case AuthActions.REFRESH_TOKEN_FAILURE:
      state = ip.setIn(state, ["refreshTokenErrorStatus"], action.payload);
      return ip.setIn(state, ["refreshTokenRequestStatus"], requestStatus[1]);

    case AuthActions.REFRESH_TOKEN_SUCCESS:
      return ip.setIn(state, ["refreshTokenRequestStatus"], requestStatus[2]);

    //Forgot Password
    case AuthActions.FORGOT_PASSWORD_REQUEST:
      return ip.setIn(state, ["forgotPasswordRequestStatus"], requestStatus[0]);

    case AuthActions.FORGOT_PASSWORD_FAILURE:
      state = ip.setIn(state, ["forgotPasswordErrorStatus"], action.payload);
      return ip.setIn(state, ["forgotPasswordRequestStatus"], requestStatus[1]);

    case AuthActions.FORGOT_PASSWORD_SUCCESS:
      return ip.setIn(state, ["forgotPasswordRequestStatus"], requestStatus[2]);

    //reset password
    case AuthActions.RESET_PASSWORD_REQUEST:
      return ip.setIn(state, ["resetPasswordRequestStatus"], requestStatus[0]);

    case AuthActions.RESET_PASSWORD_FAILURE:
      state = ip.setIn(state, ["resetPasswordErrorStatus"], action.payload);
      return ip.setIn(state, ["resetPasswordRequestStatus"], requestStatus[1]);

    case AuthActions.RESET_PASSWORD_SUCCESS:
      return ip.setIn(state, ["resetPasswordRequestStatus"], requestStatus[2]);

    case AuthActions.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
