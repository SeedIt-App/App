import ip from 'icepick';
import { AuthActions } from '../actions';

const requestStatus = ['REQUESTING', 'FAILED', 'SUCCESS'];
const initialState = {
  loginRequestStatus: null,
  loginErrorStatus: null,
};

// state for login user

export default function (state = initialState, action) {
  switch (action.type) {
    case AuthActions.LOGIN_REQUEST:
      return ip.setIn(state, ['loginRequestStatus'], requestStatus[0]);

    case AuthActions.LOGIN_FAILURE:
      state = ip.setIn(state, ['loginErrorStatus'], action.payload);
      return ip.setIn(state, ['loginRequestStatus'], requestStatus[1]);

    case AuthActions.LOGIN_SUCCESS:
      return ip.setIn(state, ['loginRequestStatus'], requestStatus[2]);

    default:
      return state;
  }
}
