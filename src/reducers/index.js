import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { AuthActions } from "../actions";
import signupReducer from "./signupReducer";
import authReducer from "./authReducer";

const appReducer = combineReducers({
  form: formReducer,
  signup: signupReducer,
  auth: authReducer
});

const rootReducer = (state, action) => {
  if (action.type === AuthActions.LOGOUT) {
    state = { otp: state.otp };
  }

  return appReducer(state, action);
};

export default rootReducer;
