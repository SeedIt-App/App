import ip from 'icepick';
import { AuthActions } from '../actions';

const requestStatus = ['REQUESTING', 'FAILED', 'SUCCESS'];
const initialState = {
  isAuthorizedUser: false,
  user: null,
  authToken: null,
  refreshTokenRequestStatus: null,
  refreshTokenErrorStatus: null,
  token: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AuthActions.SET_AUTH_USER: {
      const { user, token } = action.payload;
      state = ip.setIn(state, ['isAuthorizedUser'], true);
      state = ip.setIn(state, ['user'], user);
      state = ip.setIn(state, ['authToken'], token.accessToken);
      state = ip.setIn(state, ['token'], token);
      return state;
    }

    case AuthActions.UPDATE_AUTH_USER: {
      const { token } = action.payload;
      state = ip.setIn(state, ['token'], token);
      return state;
    }

    case AuthActions.REFRESH_TOKEN_REQUEST:
      return ip.setIn(state, ['refreshTokenRequestStatus'], requestStatus[0]);

    case AuthActions.REFRESH_TOKEN_FAILURE:
      state = ip.setIn(state, ['refreshTokenErrorStatus'], action.payload);
      return ip.setIn(state, ['refreshTokenRequestStatus'], requestStatus[1]);

    case AuthActions.REFRESH_TOKEN_SUCCESS:
      return ip.setIn(state, ['refreshTokenRequestStatus'], requestStatus[2]);

    case AuthActions.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
