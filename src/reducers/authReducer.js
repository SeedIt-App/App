import ip from "icepick";
import { AuthActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];

const initialState = {
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AuthActions.SET_AUTH_USER: {
      const { user, token } = action.payload;
      state = ip.setIn(state, ["user"], user);
      return state;
    }

    default:
      return state;
  }
}
