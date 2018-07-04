import { createAction } from 'redux-actions';

export const GET_NOTIFICATIONS = 'NOTIFICATIONS/GET_NOTIFICATIONS';
export const GET_NOTIFICATIONS_REQUEST =
  'NOTIFICATIONS/GET_NOTIFICATIONS_REQUEST';
export const GET_NOTIFICATIONS_SUCCESS =
  'NOTIFICATIONS/GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILURE =
  'NOTIFICATIONS/GET_NOTIFICATIONS_FAILURE';

export const getNotifications = createAction(GET_NOTIFICATIONS);
export const getNotificationsRequest = createAction(GET_NOTIFICATIONS_REQUEST);
export const getNotificationsSuccess = createAction(GET_NOTIFICATIONS_SUCCESS);
export const getNotificationsFailure = createAction(GET_NOTIFICATIONS_FAILURE);

/*export const REGISTER_DEVICE_FOR_NOTIFICATIONS =
  'NOTIFICATIONS/REGISTER_DEVICE_FOR_NOTIFICATIONS';
export const REGISTER_DEVICE_FOR_NOTIFICATIONS_REQUEST =
  'NOTIFICATIONS/REGISTER_DEVICE_FOR_NOTIFICATIONS_REQUEST';
export const REGISTER_DEVICE_FOR_NOTIFICATIONS_SUCCESS =
  'NOTIFICATIONS/REGISTER_DEVICE_FOR_NOTIFICATIONS_SUCCESS';
export const REGISTER_DEVICE_FOR_NOTIFICATIONS_FAILURE =
  'NOTIFICATIONS/REGISTER_DEVICE_FOR_NOTIFICATIONS_FAILURE';

export const registerDeviceForNotifications = createAction(REGISTER_DEVICE_FOR_NOTIFICATIONS);
export const registerDeviceForNotificationsRequest = createAction(REGISTER_DEVICE_FOR_NOTIFICATIONS_REQUEST);
export const registerDeviceForNotificationsSuccess = createAction(REGISTER_DEVICE_FOR_NOTIFICATIONS_SUCCESS);
export const registerDeviceForNotificationsFailure = createAction(REGISTER_DEVICE_FOR_NOTIFICATIONS_FAILURE);

export const DEREGISTER_DEVICE_FOR_NOTIFICATIONS =
  'NOTIFICATIONS/DEREGISTER_DEVICE_FOR_NOTIFICATIONS';
export const DEREGISTER_DEVICE_FOR_NOTIFICATIONS_REQUEST =
  'NOTIFICATIONS/DEREGISTER_DEVICE_FOR_NOTIFICATIONS_REQUEST';
export const DEREGISTER_DEVICE_FOR_NOTIFICATIONS_SUCCESS =
  'NOTIFICATIONS/DEREGISTER_DEVICE_FOR_NOTIFICATIONS_SUCCESS';
export const DEREGISTER_DEVICE_FOR_NOTIFICATIONS_FAILURE =
  'NOTIFICATIONS/DEREGISTER_DEVICE_FOR_NOTIFICATIONS_FAILURE';

export const deregisterDeviceForNotifications = createAction(DEREGISTER_DEVICE_FOR_NOTIFICATIONS);
export const deregisterDeviceForNotificationsRequest = createAction(DEREGISTER_DEVICE_FOR_NOTIFICATIONS_REQUEST);
export const deregisterDeviceForNotificationsSuccess = createAction(DEREGISTER_DEVICE_FOR_NOTIFICATIONS_SUCCESS);
export const deregisterDeviceForNotificationsFailure = createAction(DEREGISTER_DEVICE_FOR_NOTIFICATIONS_FAILURE);
*/