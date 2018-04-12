import ip from 'icepick';
import { UserActions } from '../actions';

const requestStatus = ['REQUESTING', 'FAILED', 'SUCCESS'];
const initialState = {
  profileRequestStatus: null,
  profileErrorStatus: null,
  luser: null
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
      console.log(luser, "pReduc")
      state = ip.setIn(state, ['profileRequestStatus'], requestStatus[2]);
      state = ip.setIn(state.luser, ['luser'])
      return state;

    default:
      return state;
  }
}