import { createAction } from "redux-actions";

// State for PROFILE process

export const PROFILE = "LUSER/PROFILE";
export const PROFILE_REQUEST = "LUSER/PROFILE_REQUEST";
export const PROFILE_SUCCESS = "LUSER/PROFILE_SUCCESS";
export const PROFILE_FAILURE = "LUSER/PROFILE_FAILURE";

export const profile = createAction(PROFILE);
export const profileRequest = createAction(PROFILE_REQUEST);
export const profileSuccess = createAction(PROFILE_SUCCESS);
export const profileFailure = createAction(PROFILE_FAILURE);

// State for Edit PROFILE process

/*export const EDITPROFILE = "AUTH/EDITPROFILE";
export const EDITPROFILE_REQUEST = "AUTH/EDITPROFILE_REQUEST";
export const EDITPROFILE_SUCCESS = "AUTH/EDITPROFILE_REQUEST";
export const EDITPROFILE_FAILURE = "AUTH/EDITPROFILE_FAILURE";

export const editProfile = createAction(EDITPROFILE);
export const editProfileRequest = createAction(EDITPROFILE_REQUEST);
export const editProfileSuccess = createAction(EDITPROFILE_REQUEST);
export const editProfileFailure = createAction(EDITPROFILE_FAILURE);*/

