import { combineReducers } from 'redux';
import { AuthActions } from '../actions';
import signupReducer from './signupReducer';
import authReducer from './authReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import followReducer from './followReducer';
import newsFeedReducer from './newsFeedReducer';
import postReducer from './postReducer';
import tagsReducer from './tagsReducer';
import notificationReducer from './notificationReducer';

const appReducer = combineReducers({
  signup: signupReducer,
  auth: authReducer,
  login: loginReducer,
  loggedUser: userReducer,
  follow: followReducer,
  newsFeed: newsFeedReducer,
  post: postReducer,
  notifications: notificationReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AuthActions.LOGOUT) {
    state = { auth: state.auth };
  }

  return appReducer(state, action);
};

export default rootReducer;
