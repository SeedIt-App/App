import ip from 'icepick';
import { UserActions } from '../actions';

const requestStatus = ['REQUESTING', 'FAILED', 'SUCCESS'];
const initialState = {
  profileRequestStatus: null,
  profileErrorStatus: null,
  editProfileRequestStatus : null,
  editProfileErrorStatus : null,
  luser: null,
  updatedUser : null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UserActions.PROFILE_REQUEST:
      return ip.setIn(state, ['profileRequestStatus'], requestStatus[0]);

    case UserActions.PROFILE_FAILURE:
      state = ip.setIn(state, ['profileErrorStatus'], action.payload);
      return ip.setIn(state, ['profileRequestStatus'], requestStatus[1]);

    case UserActions.PROFILE_SUCCESS:
      const { luser } = action.payload;
      state = ip.setIn(state, ['profileRequestStatus'], requestStatus[2]);
      state = ip.setIn(state, ['luser'], luser)
      return state;

    /*case UserActions.GETSINGLEUSER_REQUEST:
      return ip.setIn(state, ['profileRequestStatus'], requestStatus[0]);

    case UserActions.GETSINGLEUSER_FAILURE:
      state = ip.setIn(state, ['profileErrorStatus'], action.payload);
      return ip.setIn(state, ['profileRequestStatus'], requestStatus[1]);

    case UserActions.GETSINGLEUSER_SUCCESS:
      const { luser } = action.payload;
      state = ip.setIn(state, ['profileRequestStatus'], requestStatus[2]);
      state = ip.setIn(state, ['luser'], luser)
      return state;*/

    case UserActions.EDITPROFILE_REQUEST:
      return ip.setIn(state, ['editProfileRequestStatus'], requestStatus[0]);

    case UserActions.EDITPROFILE_FAILURE:
      state = ip.setIn(state, ['editProfileErrorStatus'], action.payload);
      return ip.setIn(state, ['editProfileRequestStatus'], requestStatus[1]);

    case UserActions.EDITPROFILE_SUCCESS:
      const { updatedUser } = action.payload;
      state = ip.setIn(state, ['editProfileRequestStatus'], requestStatus[2]);
      state = ip.setIn(state, ['updatedUser'], updatedUser)
      return state;  

    default:
      return state;
  }
}