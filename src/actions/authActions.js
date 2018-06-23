import { createAction } from 'redux-actions';

// State for SIGNUP process
export const SIGNUP = 'AUTH/SIGNUP';
export const SIGNUP_REQUEST = 'AUTH/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'AUTH/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'AUTH/SIGNUP_FAILURE';

export const signup = createAction(SIGNUP);
export const signupRequest = createAction(SIGNUP_REQUEST);
export const signupSuccess = createAction(SIGNUP_SUCCESS);
export const signupFailure = createAction(SIGNUP_FAILURE);

// Social Signup
// SignUp by Google

export const GOOGLESIGNUP = 'AUTH/GOOGLESIGNUP';
export const GOOGLESIGNUP_REQUEST = 'AUTH/GOOGLESIGNUP_REQUEST';
export const GOOGLESIGNUP_SUCCESS = 'AUTH/GOOGLESIGNUP_SUCCESS';
export const GOOGLESIGNUP_FAILURE = 'AUTH/GOOGLESIGNUP_FAILURE';

export const googlesignup = createAction(GOOGLESIGNUP);
export const googlesignupRequest = createAction(GOOGLESIGNUP_REQUEST);
export const googlesignupSuccess = createAction(GOOGLESIGNUP_SUCCESS);
export const googlesignupFailure = createAction(GOOGLESIGNUP_FAILURE);

// State for Login process
export const LOGIN = 'AUTH/LOGIN';
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'AUTH/LOGIN_FAILURE';

export const login = createAction(LOGIN);
export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);

// Refresh Token
export const REFRESH_TOKEN = 'AUTH/REFRESH_TOKEN';
export const REFRESH_TOKEN_REQUEST = 'AUTH/REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'AUTH/REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'AUTH/REFRESH_TOKEN_FAILURE';

export const refreshToken = createAction(REFRESH_TOKEN);
export const refreshTokenRequest = createAction(REFRESH_TOKEN_REQUEST);
export const refreshTokenSuccess = createAction(REFRESH_TOKEN_SUCCESS);
export const refreshTokenFailure = createAction(REFRESH_TOKEN_FAILURE);

// Forgot Password
/*export const forgotPassword = createAction(FORGOT_PASSWORD);
export const forgotPasswordRequest = createAction(FORGOT_PASSWORD_REQUEST);
export const forgotPasswordFailure = createAction(FORGOT_PASSWORD_FAILURE);
export const forgotPasswordSuccess = createAction(FORGOT_PASSWORD_SUCCESS);
*/
// SetAuthUser
export const SET_AUTH_USER = 'AUTH/SET_AUTH_USER';
export const setAuthUser = createAction(SET_AUTH_USER);

// UpdateAuthUser
export const UPDATE_AUTH_USER = 'AUTH/UPDATE_AUTH_USER';
export const updateAuthUser = createAction(UPDATE_AUTH_USER);

// Logout
export const LOGOUT = 'AUTH/LOGOUT';
export const logout = createAction(LOGOUT);
