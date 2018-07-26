import { createAction } from 'redux-actions';

// State for Get single User process

export const GET_SINGLE_USER = 'LUSER/GET_SINGLE_USER';
export const GET_SINGLE_USER_REQUEST = 'LUSER/GET_SINGLE_USER_REQUEST';
export const GET_SINGLE_USER_SUCCESS = 'LUSER/GET_SINGLE_USER_SUCCESS';
export const GET_SINGLE_USER_FAILURE = 'LUSER/GET_SINGLE_USER_FAILURE';

export const getSingleUser = createAction(GET_SINGLE_USER);
export const getSingleUserRequest = createAction(GET_SINGLE_USER_REQUEST);
export const getSingleUserSuccess = createAction(GET_SINGLE_USER_SUCCESS);
export const getSingleUserFailure = createAction(GET_SINGLE_USER_FAILURE);

// State for Get all User process

export const GET_ALL_USER = "LUSER/GET_ALL_USER";
export const GET_ALL_USER_REQUEST = "LUSER/GET_ALL_USER_REQUEST";
export const GET_ALL_USER_SUCCESS = "LUSER/GET_ALL_USER_SUCCESS";
export const GET_ALL_USER_FAILURE = "LUSER/GET_ALL_USER_FAILURE";

export const getAllUser = createAction(GET_ALL_USER);
export const getAllUserRequest = createAction(GET_ALL_USER_REQUEST);
export const getAllUserSuccess = createAction(GET_ALL_USER_SUCCESS);
export const getAllUserFailure = createAction(GET_ALL_USER_FAILURE); 

// State for PROFILE process

export const PROFILE = 'LUSER/PROFILE';
export const PROFILE_REQUEST = 'LUSER/PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'LUSER/PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'LUSER/PROFILE_FAILURE';

export const profile = createAction(PROFILE);
export const profileRequest = createAction(PROFILE_REQUEST);
export const profileSuccess = createAction(PROFILE_SUCCESS);
export const profileFailure = createAction(PROFILE_FAILURE);

// State for Edit PROFILE process

export const EDITPROFILE = 'LUSER/EDITPROFILE';
export const EDITPROFILE_REQUEST = 'LUSER/EDITPROFILE_REQUEST';
export const EDITPROFILE_SUCCESS = 'LUSER/EDITPROFILE_SUCCESS';
export const EDITPROFILE_FAILURE = 'LUSER/EDITPROFILE_FAILURE';

export const editProfile = createAction(EDITPROFILE);
export const editProfileRequest = createAction(EDITPROFILE_REQUEST);
export const editProfileSuccess = createAction(EDITPROFILE_SUCCESS);
export const editProfileFailure = createAction(EDITPROFILE_FAILURE);
