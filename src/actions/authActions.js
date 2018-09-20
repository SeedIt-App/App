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

// State for  OAUTH_SIGNUPuth SIGNUP process
export const OAUTH_SIGNUP = 'AUTH/OAUTH_SIGNUP';
export const OAUTH_SIGNUP_REQUEST = 'AUTH/OAUTH_SIGNUP_REQUEST';
export const OAUTH_SIGNUP_SUCCESS = 'AUTH/OAUTH_SIGNUP_SUCCESS';
export const OAUTH_SIGNUP_FAILURE = 'AUTH/OAUTH_SIGNUP_FAILURE';

export const oauthSignup = createAction(OAUTH_SIGNUP);
export const oauthSignupRequest = createAction(OAUTH_SIGNUP_REQUEST);
export const oauthSignupSuccess = createAction(OAUTH_SIGNUP_SUCCESS);
export const oauthSignupFailure = createAction(OAUTH_SIGNUP_FAILURE);

// State for Login process
export const LOGIN = 'AUTH/LOGIN';
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'AUTH/LOGIN_FAILURE';

export const login = createAction(LOGIN);
export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);

// State for Refresh Token process
export const REFRESH_TOKEN = 'AUTH/REFRESH_TOKEN';
export const REFRESH_TOKEN_REQUEST = 'AUTH/REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'AUTH/REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'AUTH/REFRESH_TOKEN_FAILURE';

export const refreshToken = createAction(REFRESH_TOKEN);
export const refreshTokenRequest = createAction(REFRESH_TOKEN_REQUEST);
export const refreshTokenSuccess = createAction(REFRESH_TOKEN_SUCCESS);
export const refreshTokenFailure = createAction(REFRESH_TOKEN_FAILURE);

// State for Forgot Password process
export const FORGOT_PASSWORD = 'AUTH/FORGOT_PASSWORD';
export const FORGOT_PASSWORD_REQUEST = 'AUTH/FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_FAILURE = 'AUTH/FORGOT_PASSWORD_FAILURE';
export const FORGOT_PASSWORD_SUCCESS = 'AUTH/FORGOT_PASSWORD_SUCCESS';

export const forgotPassword = createAction(FORGOT_PASSWORD);
export const forgotPasswordRequest = createAction(FORGOT_PASSWORD_REQUEST);
export const forgotPasswordFailure = createAction(FORGOT_PASSWORD_FAILURE);
export const forgotPasswordSuccess = createAction(FORGOT_PASSWORD_SUCCESS);

// State for reset Forgot Password process
export const RESET_PASSWORD = 'AUTH/RESET_PASSWORD';
export const RESET_PASSWORD_REQUEST = 'AUTH/RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_FAILURE = 'AUTH/RESET_PASSWORD_FAILURE';
export const RESET_PASSWORD_SUCCESS = 'AUTH/RESET_PASSWORD_SUCCESS';

export const resetPassword = createAction(RESET_PASSWORD);
export const resetPasswordRequest = createAction(RESET_PASSWORD_REQUEST);
export const resetPasswordFailure = createAction(RESET_PASSWORD_FAILURE);
export const resetPasswordSuccess = createAction(RESET_PASSWORD_SUCCESS);

// State for set Auth User process
export const SET_AUTH_USER = 'AUTH/SET_AUTH_USER';
export const setAuthUser = createAction(SET_AUTH_USER);

// State for update Auth User process
export const UPDATE_AUTH_USER = 'AUTH/UPDATE_AUTH_USER';
export const updateAuthUser = createAction(UPDATE_AUTH_USER);

// State for logout user
export const LOGOUT = 'AUTH/LOGOUT';
export const logout = createAction(LOGOUT);
