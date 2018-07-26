import ip from 'icepick';
import { NotificationActions } from '../actions';

const requestStatus = ['REQUESTING', 'FAILED', 'SUCCESS'];
const initialState = {
  notificationStatus: null,
  notificationError: null,
  notifications: null
};

// state Notification

export default function (state = initialState, action) {
  switch (action.type) {
    case NotificationActions.GET_NOTIFICATIONS_REQUEST:
      return ip.setIn(state, ['notificationStatus'], requestStatus[0]);

    case NotificationActions.GET_NOTIFICATIONS_FAILURE:
      state = ip.setIn(state, ['notificationError'], action.payload);
      return ip.setIn(state, ['notificationStatus'], requestStatus[1]);

    case NotificationActions.GET_NOTIFICATIONS_SUCCESS: {
      const { notifications } = action.payload;
      state = ip.setIn(state, ['notifications'], notifications);
      state = ip.setIn(state, ['notificationStatus'], requestStatus[2]);
      return state;
    }
  
    default:
      return ip.setIn(state, ['notificationError'], null);
  }
}
