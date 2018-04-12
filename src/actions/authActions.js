import { createAction } from "redux-actions";

// State for SIGNUP process
export const SIGNUP = "AUTH/SIGNUP";
export const SIGNUP_REQUEST = "AUTH/SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "AUTH/SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "AUTH/SIGNUP_FAILURE";

export const signup = createAction(SIGNUP);
export const signupRequest = createAction(SIGNUP_REQUEST);
export const signupSuccess = createAction(SIGNUP_SUCCESS);
export const signupFailure = createAction(SIGNUP_FAILURE);

// Social Signup 
// SignUp by Google

export const GOOGLESIGNUP = "AUTH/GOOGLESIGNUP";
export const GOOGLESIGNUP_REQUEST = "AUTH/GOOGLESIGNUP_REQUEST";
export const GOOGLESIGNUP_SUCCESS = "AUTH/GOOGLESIGNUP_SUCCESS";
export const GOOGLESIGNUP_FAILURE = "AUTH/GOOGLESIGNUP_FAILURE";

export const googlesignup = createAction(GOOGLESIGNUP);
export const googlesignupRequest = createAction(GOOGLESIGNUP_REQUEST);
export const googlesignupSuccess = createAction(GOOGLESIGNUP_SUCCESS);
export const googlesignupFailure = createAction(GOOGLESIGNUP_FAILURE);

// State for SIGNUP process
export const LOGIN = "AUTH/LOGIN";
export const LOGIN_REQUEST = "AUTH/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "AUTH/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "AUTH/LOGIN_FAILURE";

export const login = createAction(LOGIN);
export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);

export const SET_AUTH_USER = 'AUTH/SET_AUTH_USER';
export const setAuthUser = createAction(SET_AUTH_USER);

export const LOGOUT = 'AUTH/LOGOUT';
export const logout = createAction(LOGOUT);