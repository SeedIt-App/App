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
