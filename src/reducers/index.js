import { combineReducers } from "redux";
import { AuthActions } from "../actions";
import signupReducer from "./signupReducer";
import authReducer from "./authReducer";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";

const appReducer = combineReducers({
  signup: signupReducer,
  auth: authReducer,
  login : loginReducer,
  loggedUser : userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AuthActions.LOGOUT) {
    state = { auth: state.auth };
  }

  return appReducer(state, action);
};

export default rootReducer;
