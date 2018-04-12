import ip from "icepick";
import { AuthActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];

const initialState = {
  isAuthorizedUser: false,
  user: null,
  authToken: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case AuthActions.SET_AUTH_USER: {
      const { user, token } = action.payload;
      state = ip.setIn(state, ['isAuthorizedUser'], true);
      state = ip.setIn(state, ['user'], user);
      state = ip.setIn(state, ['authToken'], token.accessToken);
      return state;
    }
    
    case AuthActions.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
